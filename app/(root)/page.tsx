'use client';
import { GraduationCap, Banknote, Ambulance, Landmark, Factory, Tag } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useUser, SignInButton, SignOutButton } from '@clerk/nextjs';
import {
  Calendar,
  Video,
  Users,
  ArrowRight,
  Sparkles,
  Lock,
  Earth,
  Brain,
  FileText,
  MessageSquareText,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.8 },
};

const stagger = { 
  animate: { 
    transition: { 
      staggerChildren: 0.12 
    } 
  } 
};

const features = [
  {
    icon: <Calendar className="h-10 w-10" />,
    title: "Smart Scheduling",
    description: "Plan meetings with AI-powered calendar integration that finds the perfect time for everyone."
  },
  {
    icon: <Video className="h-10 w-10" />,
    title: "Crystal Clear Video",
    description: "Experience seamless high-definition video calls with noise cancellation."
  },
  {
    icon: <Brain className="h-10 w-10" />,
    title: "AI Meeting Assistant",
    description: "Get real-time suggestions, automated notes, and action items during your meetings."
  },
  {
    icon: <MessageSquareText className="h-10 w-10" />,
    title: "AI Caption Generator",
    description: "Automatically generate accurate captions in multiple languages for all your meetings."
  },
  {
    icon: <FileText className="h-10 w-10" />,
    title: "AI Meeting Summarizer",
    description: "Transform hours of meetings into concise summaries with key points and action items."
  },
  {
    icon: <Lock className="h-10 w-10" />,
    title: "Enterprise Security",
    description: "End-to-end encryption and compliance with global security standards."
  },
];

const industries = [
  {
    name: 'Education',
    icon: <GraduationCap className="w-6 h-6" />,
  },
  {
    name: 'Financial Services',
    icon: <Banknote className="w-6 h-6" />,
  },
  { name: 'Government', icon: <Landmark className="w-6 h-6" /> },
  { name: 'Healthcare', icon: <Ambulance className="w-6 h-6" /> },
  {
    name: 'Manufacturing',
    icon: <Factory className="w-6 h-6" />,
  },
  { name: 'Retail', icon: <Tag className="w-6 h-6" /> },
];

const LandingPage = () => {
  const { isSignedIn } = useUser();

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white overflow-hidden">
      
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-black"></div>
        <div className="absolute inset-0 opacity-30">
          <div className="absolute h-[200px] w-[200px] rounded-full bg-blue-500/20 blur-[100px] top-1/4 left-1/4 animate-pulse" style={{ animationDuration: '7s' }}></div>
          <div className="absolute h-[300px] w-[300px] rounded-full bg-indigo-500/20 blur-[100px] top-3/4 right-1/4 animate-pulse" style={{ animationDuration: '8s' }}></div>
          <div className="absolute h-[250px] w-[250px] rounded-full bg-purple-500/20 blur-[100px] bottom-1/4 left-2/3 animate-pulse" style={{ animationDuration: '10s' }}></div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(59,130,246,0.15)_0,_transparent_70%)]"></div>
      </div>

     
      <div className="relative z-10">
        
        <header className="flex justify-between items-center px-8 py-6 backdrop-blur-md bg-black/20 border-b border-white/5 sticky top-0 z-50">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-3"
          >
            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-white to-gray-200 rounded-full flex items-center justify-center p-1 shadow-lg">
              <Image 
                src="/icons/intellimeet-logo.png" 
                alt="IntelliMeet Logo" 
                width={38} 
                height={38} 
                className="object-contain rounded-full"
              />
            </div>
            <h1 className="text-2xl font-medium tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">IntelliMeet</h1>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-x-4"
          >
            {isSignedIn ? (
              <>
                
                <SignOutButton>
                  <Button
                    variant="outline"
                    className="border-white/20 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-all rounded-full px-6 py-2 text-sm font-medium"
                  >
                    Sign Out
                  </Button>
                </SignOutButton>
              </>
            ) : (
              <SignInButton>
                <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white transition-all rounded-full px-6 py-2 text-sm font-medium shadow-lg shadow-blue-600/20">
                  Sign In
                </Button>
              </SignInButton>
            )}
          </motion.div>
        </header>

       
        <section className="flex flex-col items-center justify-center text-center py-32 px-6 relative">
          
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 0.3, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="absolute top-1/4 left-1/4 w-6 h-6 bg-blue-500 rounded-full blur-sm"
              style={{ animationDuration: '15s' }}
            />
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 0.2, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="absolute top-1/3 right-1/4 w-4 h-4 bg-purple-500 rounded-full blur-sm"
              style={{ animationDuration: '20s' }}
            />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 0.2, y: 0 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="absolute bottom-1/4 right-1/3 w-3 h-3 bg-indigo-500 rounded-full blur-sm"
              style={{ animationDuration: '18s' }}
            />
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 z-0 overflow-hidden"
          >
            <div className="absolute -inset-10 bg-[conic-gradient(from_0deg_at_50%_50%,rgba(59,130,246,0.2)_0deg,rgba(79,70,229,0.2)_90deg,rgba(236,72,153,0.2)_180deg,rgba(59,130,246,0.2)_360deg)] blur-[80px] opacity-60"></div>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl md:text-7xl font-bold mb-6 tracking-tight relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-white"
          >
            Meetings, <span className="text-blue-400">Reimagined</span> <br/>with AI
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-xl md:text-2xl text-gray-300 max-w-2xl relative z-10"
          >
            Schedule smarter, connect better, and collaborate like never before with our AI-powered meeting platform.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-col sm:flex-row gap-4 relative z-10"
          >
            <Link href={isSignedIn ? '/landing' : '/sign-in'}>
              <Button className="bg-blue-600 hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 rounded-full px-8 py-6 text-base font-medium">
                {isSignedIn ? 'Open Dashboard' : 'Get Started for Free'}
              </Button>
            </Link>
            <Link href="#features">
              <Button variant="outline" className="border-white/20 bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all rounded-full px-8 py-6 text-base font-medium">
                See Features
              </Button>
            </Link>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="mt-20 relative"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur opacity-30"></div>
            <div className="relative overflow-hidden rounded-3xl border border-white/10 shadow-xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-12 flex items-center justify-center">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-70"></div>
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-70"></div>
              <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent opacity-70"></div>
              <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-purple-500 to-transparent opacity-70"></div>
              <div className="text-center">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className="text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-3">IntelliMeet Dashboard</h3>
                  <p className="text-gray-300 text-lg max-w-2xl">Powerful AI-enhanced meeting tools at your fingertips</p>
                </motion.div>
                <div className="mt-8 grid grid-cols-3 gap-5">
                  {[1, 2, 3].map((item) => (
                    <motion.div 
                      key={item}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: item * 0.1 }}
                      className="h-16 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center"
                    >
                      <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        
        <section id="features" className="py-24 px-6 relative overflow-hidden">
          <div className="max-w-7xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <h3 className="text-sm font-semibold text-blue-400 tracking-widest uppercase mb-3">Features</h3>
              <h2 className="text-4xl font-bold mb-6">Why Choose IntelliMeet?</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">Our AI-powered platform transforms the way you schedule, conduct, and follow up on meetings.</p>
            </motion.div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-8 rounded-2xl bg-gradient-to-br from-white/10 via-white/5 to-white/10 backdrop-blur-sm border border-white/10 hover:border-blue-500/50 transition-all group hover:shadow-lg hover:shadow-blue-500/5 hover:-translate-y-1"
                >
                  <div className="p-4 rounded-xl bg-blue-500/10 text-blue-400 mb-5 w-fit group-hover:bg-blue-500/20 transition-all">
                    {feature.icon}
                  </div>
                  <h4 className="text-xl font-semibold mb-3">{feature.title}</h4>
                  <p className="text-gray-400">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
          
         
          <div className="absolute top-1/4 -right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px]"></div>
        </section>

        
        <section className="py-24 px-6 relative overflow-hidden">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-20"></div>
              <div className="relative border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                <div className="aspect-video w-full bg-gradient-to-br from-gray-900 via-gray-850 to-gray-900 rounded-2xl">
                  <div className="px-6 py-4 bg-gray-800/70 backdrop-blur-sm border-b border-gray-700 flex items-center">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="mx-auto text-gray-300 text-sm font-medium">Meeting Transcript & Summary</div>
                  </div>
                  <div className="p-6 text-left">
                    <div className="flex justify-between items-center mb-4">
                      <div className="text-xl font-medium bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-white">Project Kickoff Meeting</div>
                      <div className="text-sm text-gray-400 bg-gray-800/50 px-3 py-1 rounded-full">Today, 10:30 AM</div>
                    </div>
                    <div className="mb-6 pb-6 border-b border-gray-700/50">
                      <div className="text-blue-400 font-medium mb-2 flex items-center">
                        <div className="w-4 h-4 rounded-full bg-blue-500/30 mr-2"></div>
                        AI Summary
                      </div>
                      <div className="text-gray-300 pl-6">The team discussed Q3 goals and agreed on prioritizing the mobile app redesign. Marketing will prepare promotional materials by Aug 15, and development will deliver a prototype by Sept 1.</div>
                    </div>
                    <div>
                      <div className="text-blue-400 font-medium mb-2 flex items-center">
                        <div className="w-4 h-4 rounded-full bg-purple-500/30 mr-2"></div>
                        Key Action Items
                      </div>
                      <ul className="space-y-3 text-gray-300 pl-6">
                        <li className="flex items-start gap-2">
                          <div className="min-w-4 h-4 rounded-full bg-blue-500/30 mt-1 animate-pulse"></div>
                          <div>Sarah to create project timeline by Friday</div>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="min-w-4 h-4 rounded-full bg-green-500/30 mt-1 animate-pulse"></div>
                          <div>Michael to prepare budget proposal</div>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="min-w-4 h-4 rounded-full bg-purple-500/30 mt-1 animate-pulse"></div>
                          <div>Weekly progress meetings scheduled for Mondays</div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-sm font-semibold text-blue-400 tracking-widest uppercase mb-3">AI Powered</h3>
              <h2 className="text-4xl font-bold mb-6">Never Miss a Detail Again</h2>
              <div className="space-y-6 text-gray-300">
                <p>Our advanced AI technology transforms how you experience meetings with powerful captioning and summarization features.</p>
                
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center text-blue-400">
                      <MessageSquareText className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-medium text-white">Real-time AI Captioning</h4>
                      <p className="text-gray-400">Accurate live captions in 30+ languages for inclusive and accessible meetings.</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center text-blue-400">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-medium text-white">Smart Meeting Summaries</h4>
                      <p className="text-gray-400">Get concise AI-generated summaries with key points, decisions, and action items.</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center text-blue-400">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-medium text-white">Searchable Transcripts</h4>
                      <p className="text-gray-400">Find any information from past meetings with powerful search capabilities.</p>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button className="bg-blue-600 hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 rounded-full px-6 py-3 text-base font-medium">
                    Learn More About AI Features
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        
        <section className="px-8 py-24 relative overflow-hidden" id="industries">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-sm font-semibold text-blue-400 tracking-widest uppercase mb-3 inline-block px-4 py-1 rounded-full bg-blue-500/10">For Everyone</h3>
              <h2 className="text-4xl font-bold mb-6 leading-snug bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-white">
                Powering organizations <br/>across industries
              </h2>
              <p className="text-lg text-gray-300 mb-8 max-w-xl">
                IntelliMeet helps consolidate communications, connect people, and
                collaborate better in the boardroom, classroom, operating room,
                and beyond.
              </p>
              <button className="group relative bg-white hover:bg-gray-100 text-black transition-all duration-200 shadow-lg rounded-full px-8 py-3 font-medium overflow-hidden">
                <span className="relative z-10 group-hover:text-blue-600 transition-colors">Explore Industry Solutions</span>
                <div className="absolute bottom-0 left-0 right-0 h-0 bg-gradient-to-r from-blue-100 to-white group-hover:h-full transition-all duration-300 ease-out"></div>
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="grid sm:grid-cols-2 gap-6"
            >
              {industries.map((industry, index) => (
                <motion.div
                  key={industry.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-center gap-4 p-5 rounded-xl bg-gradient-to-br from-white/10 via-white/5 to-white/10 border border-white/10 hover:border-blue-500/50 transition-all hover:shadow-lg hover:shadow-blue-500/5 hover:-translate-y-1"
                >
                  <div className="text-blue-400 bg-blue-500/10 p-2 rounded-lg">{industry.icon}</div>
                  <span className="font-medium text-white">
                    {industry.name}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
          
          
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-900/20 rounded-full blur-[120px] opacity-30"></div>
        </section>

       
        <section className="py-24 px-6 relative overflow-hidden" id="contact">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto relative z-10"
          >
            <div className="rounded-3xl p-1 bg-gradient-to-r from-blue-600 via-purple-500 to-blue-600 shadow-lg shadow-purple-900/20">
              <div className="bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900 rounded-[23px] p-10 sm:p-14">
                <div className="text-center mb-12">
                  <div className="flex justify-center">
                    <div className="inline-block px-4 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-semibold tracking-widest uppercase mb-3">Get in Touch</div>
                  </div>
                  <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-white">We'd love to hear from you</h2>
                </div>
                
                <form
                  action="https://getform.io/f/bxowxpka"
                  method="POST"
                  className="space-y-6"
                >
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="group">
                      <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2 group-hover:text-blue-400 transition-colors">Your Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="w-full p-3 rounded-lg bg-gray-800/50 backdrop-blur-sm text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:border-blue-500/50"
                      />
                    </div>
                    
                    <div className="group">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2 group-hover:text-blue-400 transition-colors">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="w-full p-3 rounded-lg bg-gray-800/50 backdrop-blur-sm text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:border-blue-500/50"
                      />
                    </div>
                    
                    <div className="group">
                      <label htmlFor="company" className="block text-sm font-medium text-gray-400 mb-2 group-hover:text-blue-400 transition-colors">Company</label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        className="w-full p-3 rounded-lg bg-gray-800/50 backdrop-blur-sm text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:border-blue-500/50"
                      />
                    </div>
                    
                    <div className="group">
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-400 mb-2 group-hover:text-blue-400 transition-colors">Subject</label>
                      <select
                        id="subject"
                        name="subject"
                        className="w-full p-3 rounded-lg bg-gray-800/50 backdrop-blur-sm text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:border-blue-500/50"
                      >
                        <option value="general">General Inquiry</option>
                        <option value="support">Technical Support</option>
                        <option value="demo">Request a Demo</option>
                        <option value="pricing">Pricing Information</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="group">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2 group-hover:text-blue-400 transition-colors">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      className="w-full p-3 rounded-lg bg-gray-800/50 backdrop-blur-sm text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:border-blue-500/50"
                    />
                  </div>
                  
                  <div className="text-center pt-6">
                    <button
                      type="submit"
                      className="relative bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-3 px-10 rounded-lg shadow-lg shadow-blue-900/30 transition-all overflow-hidden group"
                    >
                      <span className="relative z-10">Send Message</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-700 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </motion.div>
        </section>

        
        <footer className="py-20 px-6 border-t border-gray-800/50">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center mb-16">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex items-center space-x-3 mb-8 md:mb-0"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-white to-gray-200 rounded-full flex items-center justify-center p-1 shadow-lg">
                  <Image 
                    src="/icons/intellimeet-logo.png" 
                    alt="IntelliMeet Logo" 
                    width={38} 
                    height={38} 
                    className="object-contain rounded-full"
                  />
                </div>
                <h2 className="text-2xl font-medium bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">IntelliMeet</h2>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="flex flex-wrap justify-center gap-10"
              >
                <Link href="#features" className="text-gray-400 hover:text-white transition-colors relative group">
                  Features
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></span>
                </Link>
                <Link href="#industries" className="text-gray-400 hover:text-white transition-colors relative group">
                  Industries
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></span>
                </Link>
                <Link href="#contact" className="text-gray-400 hover:text-white transition-colors relative group">
                  Contact
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></span>
                </Link>
                <Link href="/pricing" className="text-gray-400 hover:text-white transition-colors relative group">
                  Pricing
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></span>
                </Link>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors relative group">
                  About Us
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></span>
                </Link>
              </motion.div>
            </div>
            
            <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-800/50">
              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-sm text-gray-500 mb-6 md:mb-0"
              >
                © {new Date().getFullYear()} IntelliMeet. All rights reserved.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex space-x-8"
              >
                <Link
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-pink-500 transition-colors"
                >
                  <span className="w-6 h-6 flex items-center justify-center  text-gray-400 hover:text-blue-600 transition-colors">
                    <FaInstagram size={16} />
                  </span>
                </Link>
                <Link
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  <span className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-blue-600 transition-colors">
                    <FaTwitter size={16} />
                  </span>
                </Link>
                <Link
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-600 transition-colors"
                >
                  <span className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-blue-600 transition-colors">
                    <FaLinkedin size={16} />
                  </span>
                </Link>
              </motion.div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;

