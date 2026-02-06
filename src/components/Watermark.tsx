export default function Watermark() {
  return (
    <div className="fixed inset-0 pointer-events-auto z-50 flex items-center justify-center bg-black/5 backdrop-blur-sm">
      <div className="transform -rotate-45 text-center">
        <div className="text-9xl font-black text-red-500 opacity-20 select-none whitespace-nowrap"
          style={{
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
            letterSpacing: '0.1em',
            fontFamily: 'Arial, sans-serif',
          }}>
          PIXELOG
        </div>
        <div className="text-5xl font-bold text-red-600 opacity-25 select-none mt-4 whitespace-nowrap"
          style={{
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
            letterSpacing: '0.05em',
            fontFamily: 'Arial, sans-serif',
          }}>
          PENDING HANDOVER
        </div>
      </div>
    </div>
  );
}
