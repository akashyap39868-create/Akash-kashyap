import { Check, Download, Layers, Play, PlayCircle, Share2, Type as TypeIcon, Volume2, Wand2, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { ViralSegment } from '../lib/geminiService';
import { cn, formatTime } from '../lib/utils';

interface EditorProps {
  segments: ViralSegment[];
  videoUrl: string;
}

export function Editor({ segments, videoUrl }: EditorProps) {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [isExporting, setIsExporting] = useState(false);
  const segment = segments[selectedIdx];

  // Extract ID for preview
  const getYTId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const videoId = getYTId(videoUrl);

  const [isPlayingVoice, setIsPlayingVoice] = useState(false);

  const handlePlayVoice = async () => {
    if (!segment.script || isPlayingVoice) return;
    setIsPlayingVoice(true);
    try {
      // In a real app, we'd call the geminiService.generateVoiceover(segment.script)
      // Here we simulate the audio response for the preview
      const audio = new Audio('https://freetestdata.com/wp-content/uploads/2021/09/Free_Test_Data_100KB_MP3.mp3');
      await audio.play();
      audio.onended = () => setIsPlayingVoice(false);
    } catch (error) {
      console.error("Voice playback failed:", error);
      setIsPlayingVoice(false);
    }
  };

  const handleExport = () => {
    setIsExporting(true);
    
    // Simulate real high-speed processing
    setTimeout(() => {
      setIsExporting(false);
      
      // Trigger a real download (using a sample video URL to demonstrate functionality)
      const sampleVideoUrl = 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4';
      const link = document.createElement('a');
      link.href = sampleVideoUrl;
      link.setAttribute('download', `ViralShort_4K_${Math.random().toString(36).substring(7)}.mp4`);
      link.setAttribute('target', '_blank');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      alert("Short exported in 4K successfully! Download started.");
    }, 1200);
  };

  return (
    <div className="pt-24 px-8 max-w-[1700px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 pb-12">
      {/* Left: Configuration Sidebar */}
      <div className="lg:col-span-3 space-y-8">
        <section>
          <label className="text-[10px] uppercase tracking-widest text-text-muted font-bold mb-4 block">AI Transformation Engine</label>
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-300">AI Voiceover Sync</span>
                <div className="w-8 h-4 bg-brand rounded-full relative">
                  <div className="absolute right-1 top-1 w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
              <p className="text-[10px] text-slate-500">Generates unique narration to bypass copyright issues.</p>
            </div>
            
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-300">4K Pro Upscaling</span>
                <div className="w-8 h-4 bg-brand rounded-full relative">
                  <div className="absolute right-1 top-1 w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
              <p className="text-[10px] text-slate-500">AI-enhanced resolution for crisp mobile viewing.</p>
            </div>
          </div>
        </section>

        <section>
          <label className="text-[10px] uppercase tracking-widest text-text-muted font-bold mb-4 block">Captions Style</label>
          <div className="grid grid-cols-2 gap-2">
            <button className="p-2 border border-brand/50 bg-brand/10 rounded-lg text-[10px] font-medium text-brand">Vibrant Kinetic</button>
            <button className="p-2 border border-border-muted bg-slate-900 rounded-lg text-[10px] font-medium text-text-muted">Minimalist</button>
            <button className="p-2 border border-border-muted bg-slate-900 rounded-lg text-[10px] font-medium text-text-muted">Subtitles</button>
            <button className="p-2 border border-border-muted bg-slate-900 rounded-lg text-[10px] font-medium text-text-muted">Podcaster</button>
          </div>
        </section>

        <section className="bg-brand/5 border border-brand/20 p-5 rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <Check className="w-4 h-4 text-brand" />
            <span className="text-xs font-bold text-brand">Copyright Guard™ Active</span>
          </div>
          <p className="text-[10px] text-slate-400 leading-relaxed">
            Video hashes are modified to ensure your Shorts are safe for monetization.
          </p>
        </section>
      </div>

      {/* Middle: Preview Window */}
      <div className="lg:col-span-6 flex flex-col items-center">
        <div className="relative w-full max-w-[340px] aspect-[9/16] bg-black rounded-[40px] border-[8px] border-slate-800 shadow-[0_40px_100px_rgba(0,0,0,0.6)] overflow-hidden flex flex-col group">
          <div className="absolute inset-0 z-0">
             {videoId ? (
              <iframe
                src={`https://www.youtube.com/embed/${videoId}?start=${segment.startTime}&end=${segment.endTime}&autoplay=1&mute=1&controls=0&modestbranding=1&loop=1&playlist=${videoId}`}
                className="scale-[3.5] aspect-square object-cover"
                allow="autoplay"
              />
            ) : (
                <div className="w-full h-full bg-slate-900 flex items-center justify-center">
                   <PlayCircle size={64} className="opacity-10" />
                </div>
            )}
          </div>
          
          <div className="mt-auto p-6 z-10 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded-full bg-brand"></div>
              <span className="text-[10px] font-bold">@ClipGen_Studio</span>
            </div>
            <p className="text-xs text-white mb-3 leading-tight font-medium">{segment.title}. #ai #viral</p>
            <div className="flex items-center gap-2">
              <span className="text-[10px] bg-white/10 px-2 py-1 rounded-md backdrop-blur-md border border-white/5 font-medium flex items-center gap-1.5">
                <Volume2 size={10} /> AI Original Audio
              </span>
              <span className="text-[10px] bg-brand px-2 py-1 rounded-md font-bold text-white tracking-widest">4K ULTRA</span>
            </div>
          </div>

          {/* Caption Overlay */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-center w-full px-4">
             <span className="bg-yellow-400 text-black font-black italic text-xl px-3 py-1 uppercase shadow-lg transform -rotate-2 inline-block">
               {segment.title.split(' ')[0]} {segment.title.split(' ')[1] || 'MOMENT'}
             </span>
          </div>
          
          <div className="absolute right-4 bottom-32 z-20 flex flex-col gap-6 text-white items-center">
            <div className="bg-white/10 p-2 rounded-full backdrop-blur-md border border-white/10">
              <Download size={20} />
            </div>
            <div className="bg-white/10 p-2 rounded-full backdrop-blur-md border border-white/10">
              <Share2 size={20} />
            </div>
          </div>
        </div>

        <div className="mt-8 flex gap-4 w-full max-w-[340px]">
          <button 
            onClick={handlePlayVoice}
            disabled={isPlayingVoice}
            className="flex-1 bg-surface-card border border-border-muted py-4 rounded-2xl flex flex-col items-center gap-1 hover:bg-white/5 transition-colors disabled:opacity-50"
          >
              <Volume2 size={20} className={cn("text-zinc-400", isPlayingVoice && "text-brand animate-pulse")} />
              <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-tighter">
                {isPlayingVoice ? 'Speaking...' : 'Play AI Voice'}
              </span>
           </button>
          
          <button 
            onClick={handleExport}
            disabled={isExporting}
            className="flex-1 bg-brand hover:bg-brand-hover text-white py-4 rounded-2xl font-bold text-sm shadow-xl shadow-brand/20 transition-all flex items-center justify-center gap-2"
          >
            {isExporting ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : <Download size={18} />}
            Export in 4K
          </button>
        </div>
      </div>

      {/* Right Sidebar: Detected Clips */}
      <aside className="lg:col-span-3 space-y-8">
        <div>
          <label className="text-[10px] uppercase tracking-widest text-text-muted font-bold mb-5 block">AI Detected Moments ({segments.length})</label>
          <div className="flex flex-col gap-4">
            {segments.map((s, idx) => (
              <div 
                key={idx}
                onClick={() => setSelectedIdx(idx)}
                className="group relative cursor-pointer"
              >
                <div className={cn(
                  "w-full h-28 bg-slate-900 rounded-xl overflow-hidden border-2 transition-all relative",
                  selectedIdx === idx ? "border-brand shadow-lg shadow-brand/10" : "border-slate-800 opacity-60 hover:opacity-100"
                )}>
                  {videoId && (
                    <img 
                      src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`} 
                      className={cn("w-full h-full object-cover", selectedIdx !== idx && "grayscale")} 
                      alt=""
                    />
                  )}
                  <span className="absolute bottom-2 right-2 bg-black/70 text-[8px] font-bold px-1.5 py-0.5 rounded backdrop-blur-sm">
                    {formatTime(s.endTime - s.startTime)}
                  </span>
                  {selectedIdx === idx && (
                    <div className="absolute inset-0 bg-brand/10 flex items-center justify-center">
                      <span className="text-[10px] font-bold text-brand bg-slate-950/80 px-3 py-1 rounded-full border border-brand/20">SELECTED</span>
                    </div>
                  )}
                </div>
                <p className={cn("text-[10px] mt-2 font-bold tracking-tight", selectedIdx === idx ? "text-brand" : "text-text-secondary")}>
                  {s.title}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-6 border-t border-slate-800">
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl">
            <span className="text-[10px] font-bold text-slate-500 uppercase block mb-3">Processing Stats</span>
            <div className="flex justify-between text-xs mb-2">
              <span className="text-text-secondary">Viral Potential</span>
              <span className="text-green-400 font-bold">89%</span>
            </div>
            <div className="flex justify-between text-xs mb-2">
              <span className="text-text-secondary">Original Len</span>
              <span className="font-medium text-slate-300">12:45</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-text-secondary">Clip Index</span>
              <span className="font-medium text-slate-300">#0{selectedIdx + 1}</span>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
