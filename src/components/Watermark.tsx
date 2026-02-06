export default function Watermark() {
  return (
    <div className="fixed inset-0 pointer-events-auto z-[9999] flex items-center justify-center bg-black/20">
      {/* Repeating watermark pattern */}
      <div className="absolute inset-0 flex flex-col justify-around items-center overflow-hidden">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex gap-32 w-full justify-center">
            {Array.from({ length: 4 }).map((_, j) => (
              <div key={j} className="transform -rotate-45 text-center flex-shrink-0">
                <div 
                  className="text-7xl font-black text-red-600 opacity-40 select-none whitespace-nowrap"
                  style={{
                    letterSpacing: '0.15em',
                    fontFamily: 'Arial Black, sans-serif',
                    fontWeight: 900,
                  }}>
                  PIXELOG
                </div>
                <div 
                  className="text-3xl font-black text-red-700 opacity-45 select-none mt-2 whitespace-nowrap"
                  style={{
                    letterSpacing: '0.1em',
                    fontFamily: 'Arial Black, sans-serif',
                    fontWeight: 900,
                  }}>
                  PENDING HANDOVER
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      
      {/* Center prominent watermark */}
      <div className="relative z-10 text-center">
        <div 
          className="text-9xl font-black text-red-600 opacity-50 select-none whitespace-nowrap"
          style={{
            letterSpacing: '0.2em',
            fontFamily: 'Arial Black, sans-serif',
            fontWeight: 900,
          }}>
          PIXELOG
        </div>
        <div 
          className="text-5xl font-black text-red-700 opacity-55 select-none mt-4 whitespace-nowrap"
          style={{
            letterSpacing: '0.15em',
            fontFamily: 'Arial Black, sans-serif',
            fontWeight: 900,
          }}>
          PENDING HANDOVER
        </div>
      </div>
    </div>
  );
}
