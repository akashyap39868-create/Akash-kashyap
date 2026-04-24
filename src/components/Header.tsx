import { Zap } from 'lucide-react';
import { motion } from 'motion/react';

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border-muted bg-surface-dark/50 backdrop-blur-md px-8 py-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="bg-brand w-8 h-8 flex items-center justify-center rounded-lg shadow-lg shadow-brand/20">
          <Zap className="text-white fill-white" size={18} />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight">ViralShorts <span className="text-brand">AI</span></h1>
        </div>
      </div>
      
      <div className="flex gap-6 items-center">
        <div className="hidden md:flex gap-6 text-sm font-medium">
          <a href="#" className="text-text-secondary hover:text-white transition-colors">Projects</a>
          <a href="#" className="text-text-secondary hover:text-white transition-colors">Templates</a>
        </div>
        <div className="h-4 w-px bg-border-muted hidden md:block"></div>
        <button className="bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-full text-xs font-medium border border-slate-700 transition-all">
          Upgrade to 4K Pro
        </button>
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand to-purple-500 border border-slate-700"></div>
      </div>
    </header>
  );
}
