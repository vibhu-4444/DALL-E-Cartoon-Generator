function AmbientBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -left-20 top-24 h-72 w-72 rounded-full bg-sky-400/20 blur-[120px] animate-pulseSoft dark:bg-sky-500/20" />
      <div className="absolute right-[-6rem] top-[18rem] h-80 w-80 rounded-full bg-emerald-400/20 blur-[130px] animate-drift dark:bg-emerald-400/16" />
      <div className="absolute left-1/3 top-[44rem] h-64 w-64 rounded-full bg-amber-300/20 blur-[110px] animate-float dark:bg-orange-400/14" />
      <div className="absolute inset-x-0 top-0 h-[38rem] bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.12),_transparent_56%)] dark:bg-[radial-gradient(circle_at_top,_rgba(125,211,252,0.08),_transparent_54%)]" />
    </div>
  );
}

export default AmbientBackground;

