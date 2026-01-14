// [Instructions for Anti Gravity: Replace the WixVideoReel component and the video section with this code]

// 1. The Simplified Video Component
const MarqueeVideo = ({ videoUrl, posterUrl }: { videoUrl: string; posterUrl?: string }) => (
  <div className="relative h-[350px] md:h-[450px] aspect-[9/16] rounded-2xl overflow-hidden shadow-lg border border-gray-100 bg-gray-100 flex-shrink-0">
    <video
      src={videoUrl}
      poster={posterUrl}
      autoPlay
      loop
      muted
      playsInline // Vital for mobile autoplay
      disablePictureInPicture
      className="w-full h-full object-cover pointer-events-none" // pointer-events-none ensures no interaction
    />
  </div>
);

// 2. The Updated Section Implementation
// (Inside your HomePage return)

<section className="py-16 bg-white overflow-hidden relative">
  {/* Header Text */}
  <div className="text-center mb-10 px-4">
     <h2 className="font-heading text-3xl md:text-5xl text-primary mb-2">
       See It In Action
     </h2>
  </div>

  {/* Marquee Container */}
  <div className="relative w-full">
    
    {/* Fade Gradients (Optional: Adds polish) */}
    <div className="absolute top-0 left-0 h-full w-12 md:w-32 bg-gradient-to-r from-white to-transparent z-10" />
    <div className="absolute top-0 right-0 h-full w-12 md:w-32 bg-gradient-to-l from-white to-transparent z-10" />

    {/* Moving Track */}
    <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
      {/* We map the array TWICE to create the seamless loop effect */}
      {[...videoReels, ...videoReels].map((video, index) => (
        <div key={`${video.id}-${index}`} className="mx-3 md:mx-4">
          <MarqueeVideo 
            videoUrl={video.videoUrl} 
            posterUrl={video.thumbnailUrl} 
          />
        </div>
      ))}
    </div>
  </div>

  {/* Add this to your global CSS or Tailwind config if not present */}
  <style>{`
    @keyframes marquee {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
    .animate-marquee {
      animation: marquee 40s linear infinite;
    }
  `}</style>
</section>