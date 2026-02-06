import Header from "../components/Header";
import LandingHero from "../components/LandingHero";
import LogoStrip from "../components/LogoStrip";
import MeetingBoxSection from "../components/MeetingBoxSection";
import TeamsSection from "../components/TeamsSection";
import TextSection from "../components/TextSection";
import BentoGrid from "../components/BentoGrid";
import Footer from "../components/Footer";
import PortfolioSection from "../components/PortfolioSection";
import BlogSection from "../components/BlogSection";
import PricingSection from "../components/PricingSection";
import SnapScrollProvider from "../components/SnapScrollProvider";

export default function Home() {
  
  return (
    <div className="w-full overflow-x-hidden">
      <SnapScrollProvider />
      <Header />
      <LandingHero />
      <LogoStrip  />
      <TextSection />
      <MeetingBoxSection  />
      <div id="snap-teams">
        <TeamsSection />
      </div>
     

      <div 
        className="flex w-full flex-col gap-4 rounded-[30px] md:rounded-[30px] lg:rounded-[30px] relative "
        style={{
          background: 'radial-gradient(64.55% 66.78% at 0% 0%, #00A9EE 0%, #00378A 24.5%, #121212 74.04%)',
          
        }}
      >
        <div id="snap-bento">
          <BentoGrid />
        </div>
        <div id="snap-portfolio">
          <PortfolioSection />
        </div>
       
      </div>

      <BlogSection />
      <PricingSection />
        <Footer />
    </div>
  );
}
