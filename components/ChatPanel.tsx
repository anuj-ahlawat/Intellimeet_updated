'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import { MessageCircle, Send, X, SmilePlus } from 'lucide-react';
import { 
  useStreamVideoClient, 
  Call,
  CallType,
  StreamVideoClient,
} from '@stream-io/video-react-sdk';
import { toast } from 'sonner';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface User {
  id: string;
  name?: string;
  image?: string;
}

interface Reaction {
  emoji: string;
  userId: string;
  userName?: string;
}

interface Message {
  id: string;
  text: string;
  timestamp: string | Date;
  user: User;
  reactions?: Record<string, Reaction[]>; // emoji -> array of users who reacted
}

interface ChatPanelProps {
  isOpen: boolean;
  onClose: () => void;
  call?: Call; // Pass the call directly
}

// Simple logging helper
const log = (message: string, data?: any) => {
  if (data) {
    console.log(`[CHAT] ${message}:`, data);
  } else {
    console.log(`[CHAT] ${message}`);
  }
};

const CHAT_EVENT_TYPE = 'chat-message';
const REACTION_EVENT_TYPE = 'chat-reaction';

const EMOJI_OPTIONS = ['👍', '❤️', '😂', '😮', '😢', '🎉'];

interface MessageGroup {
  id: string;
  user: User;
  messages: Message[];
}

const ChatPanel = ({ isOpen, onClose, call }: ChatPanelProps) => {
  const client = useStreamVideoClient();
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageText, setMessageText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [activeReactionMessageId, setActiveReactionMessageId] = useState<string | null>(null);
  const messagesRef = useRef<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Extract user information from client
  const currentUserId = client ? (client as any).user?.id || 'unknown' : 'unknown';
  const currentUserName = client ? (client as any).user?.name || currentUserId : 'User';
  const currentUserImage = client ? (client as any).user?.image : undefined;
  
  // Keep messages ref updated
  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);
  
  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Subscribe to chat events
  useEffect(() => {
    if (!call) {
      log('No active call available');
      return;
    }

    log(`Setting up chat for call: ${call.id}`);
    
    // Handle incoming chat events
    const handleCustomEvent = (event: any) => {
      log('Received event', event);
      
      // Check if this is a chat message
      if (event.type === 'custom' && event.custom?.type === CHAT_EVENT_TYPE) {
        try {
          const data = event.custom.data;
          
          // Validate message data
          if (!data || !data.text) {
            log('Invalid message data', data);
            return;
          }
          
          // Create a message ID if one isn't provided
          const messageId = data.id || `${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
          
          // Avoid duplicate messages
          if (messagesRef.current.some(m => m.id === messageId)) {
            log('Skipping duplicate message', messageId);
            return;
          }
          
          // Log sender information for debugging
          log('Message sender info', {
            senderId: data.senderId,
            senderName: data.senderName,
            currentUserId: currentUserId,
            isCurrentUser: data.senderId === currentUserId
          });
          
          const newMessage: Message = {
            id: messageId,
            text: data.text,
            timestamp: data.timestamp || new Date().toISOString(),
            user: {
              id: data.senderId || 'unknown',
              name: data.senderName || 'Unknown User',
              image: data.senderImage,
            },
            reactions: data.reactions || {},
          };
          
          log('Adding message to chat', newMessage);
          
          // Update state with new message
          setMessages(prev => [...prev, newMessage]);
        } catch (error) {
          log('Error processing message', error);
        }
      }
      // Check if this is a reaction event
      else if (event.type === 'custom' && event.custom?.type === REACTION_EVENT_TYPE) {
        try {
          const data = event.custom.data;
          
          // Validate reaction data
          if (!data || !data.messageId || !data.emoji) {
            log('Invalid reaction data', data);
            return;
          }
          
          log('Processing reaction', data);
          
          // Update the message with the new reaction
          setMessages(prevMessages => {
            return prevMessages.map(msg => {
              if (msg.id === data.messageId) {
                // Initialize reactions object if it doesn't exist
                const reactions = msg.reactions || {};
                
                // Initialize emoji array if it doesn't exist
                const emojiReactions = reactions[data.emoji] || [];
                
                // Check if user already reacted with this emoji
                const existingReactionIndex = emojiReactions.findIndex(
                  reaction => reaction.userId === data.userId
                );
                
                let updatedEmojiReactions = [...emojiReactions];
                
                if (data.remove && existingReactionIndex !== -1) {
                  // Remove the reaction
                  updatedEmojiReactions.splice(existingReactionIndex, 1);
                } else if (!data.remove && existingReactionIndex === -1) {
                  // Add the reaction
                  updatedEmojiReactions.push({
                    emoji: data.emoji,
                    userId: data.userId,
                    userName: data.userName,
                  });
                }
                
                // Only keep the emoji in reactions if there are any reactions
                const updatedReactions = { ...reactions };
                
                if (updatedEmojiReactions.length > 0) {
                  updatedReactions[data.emoji] = updatedEmojiReactions;
                } else {
                  delete updatedReactions[data.emoji];
                }
                
                return {
                  ...msg,
                  reactions: updatedReactions,
                };
              }
              return msg;
            });
          });
        } catch (error) {
          log('Error processing reaction', error);
        }
      }
    };

    // Register event handler
    log('Registering event handler');
    call.on('custom', handleCustomEvent);
    
    // Testing: Send a ping message
    setTimeout(() => {
      try {
        log('Sending test ping');
        call.sendCustomEvent({
          type: CHAT_EVENT_TYPE,
          data: {
            
            id: `system-${Date.now()}`,
            senderId: 'system',
            senderName: 'System',
            timestamp: new Date().toISOString(),
          }
        });
      } catch (error) {
        log('Error sending test message', error);
      }
    }, 2000);

    return () => {
      log('Cleaning up chat handler');
      call.off('custom', handleCustomEvent);
    };
  }, [call]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!messageText.trim() || !call || !client) {
      return;
    }
    
    if (isSending) {
      return;
    }
    
    setIsSending(true);
    const trimmedText = messageText.trim();
    
    try {
      // Create a unique message ID
      const messageId = `${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
      const timestamp = new Date().toISOString();
      
      log('Sending message', { text: trimmedText });
      
      // Send through the call
      await call.sendCustomEvent({
        type: CHAT_EVENT_TYPE,
        data: {
          text: trimmedText,
          id: messageId,
          senderId: currentUserId,
          senderName: currentUserName || 'You',
          senderImage: currentUserImage,
          timestamp,
        }
      });
      
      // IMPORTANT: We don't need to add the message locally anymore
      // because the event handler will already add it when the sender
      // receives their own message back from the Stream service
      
      setMessageText('');
      log('Message sent successfully');
    } catch (error) {
      log('Failed to send message', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(e as unknown as React.FormEvent);
    }
  };

  const addReaction = async (messageId: string, emoji: string) => {
    if (!call || !client) {
      toast.error('Cannot add reaction: no active call');
      return;
    }
    
    try {
      // Find the message
      const message = messages.find(m => m.id === messageId);
      if (!message) {
        log('Message not found for reaction', messageId);
        return;
      }
      
      // Check if user already reacted with this emoji
      const hasReacted = message.reactions?.[emoji]?.some(
        reaction => reaction.userId === currentUserId
      );
      
      // Send reaction event
      await call.sendCustomEvent({
        type: REACTION_EVENT_TYPE,
        data: {
          messageId,
          emoji,
          userId: currentUserId,
          userName: currentUserName,
          remove: hasReacted, // Toggle the reaction if already added
          timestamp: new Date().toISOString(),
        }
      });
      
      log('Reaction sent', { messageId, emoji, remove: hasReacted });
      
      // Close emoji picker
      setActiveReactionMessageId(null);
    } catch (error) {
      log('Failed to send reaction', error);
      toast.error('Failed to add reaction');
    }
  };

  // Group messages
  const messageGroups = useMemo(() => {
    if (!messages.length) return [];

    return messages.reduce<MessageGroup[]>((groups, message, index) => {
      const prevMessage = messages[index - 1];
      
      // If this is the first message or the sender changed or too much time passed, create a new group
      if (
        !prevMessage || 
        prevMessage.user.id !== message.user.id ||
        !prevMessage.timestamp || 
        !message.timestamp ||
        Math.abs(new Date(message.timestamp).getTime() - new Date(prevMessage.timestamp).getTime()) > 5 * 60 * 1000 // 5 minutes
      ) {
        groups.push({
          id: message.id,
          user: message.user,
          messages: [message],
        });
      } else {
        // Add to the last group
        groups[groups.length - 1].messages.push(message);
      }
      
      return groups;
    }, []);
  }, [messages]);

  return (
    <div
      className={cn(
        'fixed right-0 top-0 z-10 h-[calc(100vh-86px)] w-80 md:w-96 bg-gradient-to-b from-gray-900 to-gray-950 shadow-xl border-l border-gray-800/50 transition-all duration-300 ease-in-out backdrop-blur-lg',
        isOpen ? 'translate-x-0' : 'translate-x-full'
      )}
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between border-b border-gray-800/50 p-4 bg-gradient-to-r from-gray-900 to-gray-900/90">
          <div className="flex items-center gap-2">
            <MessageCircle size={18} className="text-blue-400" />
            <h3 className="text-lg font-medium text-white">Meeting Chat</h3>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full text-gray-400 hover:text-white hover:bg-gray-800/80 transition-colors"
            onClick={onClose}
          >
            <X size={18} />
          </Button>
        </div>

        <ScrollArea className="flex-1 px-4 py-3">
          <div className="space-y-4">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-40 mt-12 text-center gap-3">
                <div className="bg-gray-800/60 p-3 rounded-full">
                  <MessageCircle size={32} className="text-gray-500" />
                </div>
                <p className="text-gray-400 font-medium">No messages yet</p>
                <p className="max-w-[250px] text-sm text-gray-500">
                  Start the conversation with other participants in this meeting
                </p>
                {call && (
                  <div className="mt-3 px-3 py-2 bg-gray-800/40 rounded-md border border-gray-700/50 text-xs text-gray-400">
                    <p className="flex items-center justify-center gap-1">
                      <span className="inline-block w-2 h-2 rounded-full bg-green-500"></span>
                      <span>{call?.state.participants.length || 0} participants in call</span>
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-6">
                {messageGroups.map((group) => (
                  <div key={group.id} className="mb-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mr-3">
                        {group.user.image ? (
                          <Image 
                            className="h-10 w-10 rounded-full" 
                            src={group.user.image} 
                            alt={group.user.name || 'User'} 
                            width={40} 
                            height={40} 
                          />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                            <span className="text-gray-500 text-sm font-medium">
                              {(group.user.name || 'User').substring(0, 2).toUpperCase()}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center">
                          <span className="font-medium text-gray-900">
                            {group.user.id === currentUserId ? 'You' : (group.user.name || 'Unknown User')}
                          </span>
                          <span className="ml-2 text-xs text-gray-500">
                            {new Date(group.messages[0].timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-2 pl-12 space-y-2">
                      {group.messages.map((message) => (
                        <div key={message.id} className="group relative">
                          <div
                            className={cn(
                              "px-4 py-2 rounded-lg break-words",
                              "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                            )}
                          >
                            <div className="text-sm break-words">
                              {message.text}
                            </div>
                          </div>
                          
                          {/* Reaction button */}
                          <button
                            onClick={() => setActiveReactionMessageId(activeReactionMessageId === message.id ? null : message.id)}
                            className={cn(
                              "absolute right-0 top-0 p-1.5 rounded-bl-md rounded-tr-md opacity-0 group-hover:opacity-100 transition-opacity",
                              message.user.id === currentUserId ? "bg-blue-700/80" : "bg-gray-700/80",
                            )}
                            title="Add reaction"
                          >
                            <SmilePlus size={14} className="text-white/90" />
                          </button>
                          
                          {/* Emoji picker */}
                          {activeReactionMessageId === message.id && (
                            <div 
                              className={cn(
                                "absolute top-0 right-0 translate-y-[-100%] p-1.5 bg-gray-800 rounded-md shadow-xl border border-gray-700 flex gap-1.5 z-10"
                              )}
                            >
                              {EMOJI_OPTIONS.map(emoji => (
                                <button
                                  key={emoji}
                                  onClick={() => addReaction(message.id, emoji)}
                                  className="hover:bg-gray-700 p-1.5 rounded-md transition-colors"
                                >
                                  {emoji}
                                </button>
                              ))}
                            </div>
                          )}
                          
                          {/* Display reactions */}
                          {message.reactions && Object.keys(message.reactions).length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-1">
                              {Object.entries(message.reactions).map(([emoji, users]) => (
                                <button
                                  key={emoji}
                                  onClick={() => addReaction(message.id, emoji)}
                                  className={cn(
                                    "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs transition-colors",
                                    users.some(u => u.userId === currentUserId) 
                                      ? "bg-blue-600/30 text-blue-300 hover:bg-blue-600/40" 
                                      : "bg-gray-800/70 border border-gray-700/50 text-gray-300 hover:bg-gray-700/80"
                                  )}
                                  title={users.map(u => u.userName || u.userId).join(', ')}
                                >
                                  <span>{emoji}</span>
                                  <span className="font-medium">{users.length}</span>
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        <form
          onSubmit={sendMessage}
          className="border-t border-gray-800/50 p-3 bg-gray-900/80 backdrop-blur-sm"
        >
          <div className="flex items-center gap-2">
            <Input
              type="text"
              placeholder="Type a message..."
              className="flex-1 rounded-full border-gray-700/50 bg-gray-800/70 text-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-all"
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isSending}
            />
            <Button
              type="submit"
              size="icon"
              className={cn(
                "h-10 w-10 rounded-full text-white transition-all duration-200",
                messageText.trim() && !isSending
                  ? "bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-blue-600/20"
                  : "bg-gray-700 text-gray-400 cursor-not-allowed"
              )}
              disabled={!messageText.trim() || isSending}
            >
              <Send size={18} className={isSending ? "animate-pulse" : ""} />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatPanel; 