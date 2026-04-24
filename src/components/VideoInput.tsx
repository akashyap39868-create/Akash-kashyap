import { Link2, Sparkles, Youtube } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

interface VideoInputProps {
  onAnalyze: (url: string) => void;
  isLoading: boolean;
}

export function VideoInput({ onAnalyze, isLoading }: VideoInputProps) {
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onAnalyze(url);
    }
  };

  return (
    <div className="max-w-4xl mx-auto pt-40 px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand/10 border border-brand/20 rounded-full text-brand text-[10px] font-bold uppercase tracking-widest mb-8">
          <Sparkles size={12} />
          <span>AI Transformation Engine</span>
        </div>
        
        <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
          Convert long videos into <br />
          <span className="text-brand">viral short masterpieces.</span>
        </h2>
        
        <p className="text-text-secondary text-lg mb-12 max-w-xl mx-auto leading-relaxed">
          Paste a YouTube link and let ClipGen PRO extract the best moments, 
          add transformative scripts, and upscale to 4K resolution.
        </p>

        <form onSubmit={handleSubmit} className="relative group max-w-2xl mx-auto">
          <div className="absolute -inset-1 bg-gradient-to-r from-brand/20 to-purple-500/20 rounded-2xl blur-xl opacity-0 group-focus-within:opacity-100 transition duration-500"></div>
          <div className="relative flex items-center bg-slate-950 border border-border-muted p-2 rounded-2xl shadow-2xl">
            <div className="pl-4 text-text-muted">
              <Youtube size={20} />
            </div>
            <input
              type="text"
              placeholder="Paste YouTube Video URL here..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none px-4 py-4 text-sm placeholder:text-slate-600 font-medium"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !url.trim()}
              className="bg-brand hover:bg-brand-hover text-white px-8 py-3 rounded-xl font-bold transition-all disabled:opacity-50 flex items-center gap-2 shadow-lg shadow-brand/20"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  PROCESSING...
                </>
              ) : (
                'Process'
              )}
            </button>
          </div>
        </form>

        <div className="mt-12 flex items-center justify-center gap-6 text-[10px] text-text-muted uppercase tracking-widest font-bold">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
            <span>YouTube Long-form</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
            <span>Podcast Episodes</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
            <span>Interviews</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
