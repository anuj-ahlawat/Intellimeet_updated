'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Mic, MicOff } from 'lucide-react';

interface LiveCaptionsProps {
  className?: string;
  isVisible: boolean;
  onToggle: () => void;
}

// Add type definitions for Web Speech API
declare global {
  interface Window {
    webkitSpeechRecognition: new () => {
      continuous: boolean;
      interimResults: boolean;
      lang: string;
      start: () => void;
      stop: () => void;
      onresult: (event: any) => void;
      onerror: (event: any) => void;
      onend: (event: any) => void;
    };
  }
}

const LiveCaptions = ({ className, isVisible, onToggle }: LiveCaptionsProps) => {
  const [captions, setCaptions] = useState<string>('');
  const [isListening, setIsListening] = useState<boolean>(false);
  const [recognition, setRecognition] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Initialize speech recognition when component mounts
    if (typeof window !== 'undefined') {
      if ('webkitSpeechRecognition' in window) {
        const SpeechRecognition = window.webkitSpeechRecognition;
        const recognitionInstance = new SpeechRecognition();
        
        recognitionInstance.continuous = true;
        recognitionInstance.interimResults = true;
        recognitionInstance.lang = 'en-US';

        recognitionInstance.onresult = (event: any) => {
          const transcript = Array.from(event.results)
            .map((result: any) => result[0].transcript)
            .join(' ');
          setCaptions(transcript);
        };

        recognitionInstance.onerror = (event: any) => {
          console.error('Speech recognition error:', event.error);
          setError(`Error: ${event.error}`);
          setIsListening(false);
        };

        recognitionInstance.onend = () => {
          // Auto-restart if it was supposed to be listening but stopped
          if (isListening) {
            try {
              recognitionInstance.start();
            } catch (e) {
              console.error("Couldn't restart recognition:", e);
            }
          }
        };

        setRecognition(recognitionInstance);
      } else {
        setError("Your browser doesn't support speech recognition");
      }
    }

    // Cleanup on unmount
    return () => {
      if (recognition) {
        try {
          recognition.stop();
        } catch (e) {
          // Ignore errors on cleanup
        }
      }
    };
  }, []);

  // Start/stop listening based on isVisible prop
  useEffect(() => {
    if (recognition) {
      if (isVisible && !isListening) {
        // Try to auto-start when the component becomes visible
        toggleListening();
      } else if (!isVisible && isListening) {
        // Stop when hidden
        toggleListening();
      }
    }
  }, [isVisible]);

  const toggleListening = () => {
    if (!recognition) return;
    
    try {
      if (isListening) {
        recognition.stop();
      } else {
        recognition.start();
      }
      setIsListening(!isListening);
      setError(null);
    } catch (e) {
      console.error("Error toggling speech recognition:", e);
      setError("Failed to toggle speech recognition");
      setIsListening(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div className={cn('fixed bottom-24 left-1/2 -translate-x-1/2 bg-black/40 backdrop-blur-sm p-4 rounded-xl max-w-md w-full md:w-1/2 shadow-lg border border-white/10', className)}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Mic size={18} className={cn('text-white', isListening ? 'text-green-400' : 'text-gray-400')} />
          <h3 className="text-white font-medium">Live Captions</h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleListening}
            className={cn(
              'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
              isListening 
                ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30' 
                : 'bg-gray-500/20 text-gray-400 hover:bg-gray-500/30'
            )}
          >
            {isListening ? 'Stop' : 'Start'}
          </button>
          <button
            onClick={onToggle}
            className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
          >
            <MicOff size={18} className="text-white" />
          </button>
        </div>
      </div>
      
      {error && (
        <div className="text-red-400 text-xs mb-2">
          {error}
        </div>
      )}
      
      <div className="text-white text-sm max-h-32 overflow-y-auto leading-relaxed text-center font-medium">
        {captions || (isListening ? 'Listening... speak now' : 'Captions will appear here when you start speaking...')}
      </div>
    </div>
  );
};

export default LiveCaptions; 