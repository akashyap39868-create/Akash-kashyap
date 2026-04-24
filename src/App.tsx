import { useState } from 'react';
import { Header } from './components/Header';
import { VideoInput } from './components/VideoInput';
import { Editor } from './components/Editor';
import { analyzeVideo, ViralSegment } from './lib/geminiService';
import { motion, AnimatePresence } from 'motion/react';

type AppState = 'input' | 'editor';

export default function App() {
  const [state, setState] = useState<AppState>('input');
  const [isLoading, setIsLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');
  const [segments, setSegments] = useState<ViralSegment[]>([]);

  const handleAnalyze = async (url: string) => {
    setIsLoading(true);
    setVideoUrl(url);
    
    try {
      // Simulate real processing time for effect since the prompt asks for it
      const results = await analyzeVideo(url);
      setSegments(results);
      setState('editor');
    } catch (error) {
      console.error("Analysis failed:", error);
      alert("Failed to analyze video. Please try again with a valid YouTube URL.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface-dark selection:bg-brand selection:text-black">
      <Header />
      
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 pixel-grid" />
        <div className="absolute top-1/4 -left-1/4 w-[800px] h-[800px] bg-brand/5 rounded-full blur-[160px] opacity-20" />
        <div className="absolute bottom-1/4 -right-1/4 w-[800px] h-[800px] bg-brand/5 rounded-full blur-[160px] opacity-20" />
      </div>

      <main className="relative z-10 w-full">
        <AnimatePresence mode="wait">
          {state === 'input' ? (
            <motion.div
              key="input"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
            >
              <VideoInput onAnalyze={handleAnalyze} isLoading={isLoading} />
            </motion.div>
          ) : (
            <motion.div
              key="editor"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <Editor segments={segments} videoUrl={videoUrl} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer Meta */}
      <footer className="fixed bottom-6 right-6 z-50 pointer-events-none">
        <div className="flex items-center gap-4 text-[9px] font-mono text-zinc-700 tracking-[0.2em] uppercase">
          <span>AI VERSION 4.2.0</span>
          <div className="w-1 h-1 bg-zinc-800 rounded-full" />
          <span>EST. LATENCY NULL</span>
        </div>
      </footer>
    </div>
  );
}
