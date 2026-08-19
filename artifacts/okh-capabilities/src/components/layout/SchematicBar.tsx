export function SchematicBar() {
  return (
    <div className="relative z-10 h-7 border-t border-border bg-[#0a0c12]/50 flex items-center px-6 overflow-hidden w-full mt-auto">
      <div className="flex-1 flex items-center">
        {Array.from({ length: 120 }).map((_, i) => (
          <div
            key={i}
            className="flex-1 border-l border-border/70"
            style={{ height: i % 5 === 0 ? '8px' : '4px' }}
          />
        ))}
      </div>
      <div className="absolute right-6 font-mono text-[0.55rem] text-okh-orange tracking-[0.15em] uppercase opacity-60 bg-[#0a0c12] px-2">
        overkillhill.com
      </div>
    </div>
  );
}
