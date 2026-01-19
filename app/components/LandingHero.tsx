import BackgroundShape from "./BackgroundShape";
import TextSection from "./TextSection";
import BentoGrid from "./BentoGrid";

export default function LandingHero() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Background Shape Section */}
      <div className="w-full h-screen relative flex-shrink-0">
        <BackgroundShape 
          className="w-full h-full"
          borderRadius={24}
        />
      </div>

      {/* Text Section (Below the shape) */}
      <div className="w-full bg-gray-50 relative z-10">
        <TextSection />
      </div>

      {/* Bento Grid Section */}
      <div className="w-full bg-gray-50 relative z-10">
        <BentoGrid />
      </div>
    </div>
  );
}
