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

export default function Home() {
  
  return (
    <>
   <Header />
      <LandingHero />
      <LogoStrip  />
      <TextSection />
      <MeetingBoxSection  />
      <TeamsSection />
     
      
    

      <div 
        className="flex flex-col gap-4 rounded-[36px] py-24 relative "
        style={{
          background: 'radial-gradient(64.55% 66.78% at 0% 0%, #00A9EE 0%, #00378A 24.5%, #121212 74.04%)',
          
        }}
      >
        <BentoGrid />
        <PortfolioSection />
       
      </div>

      <BlogSection />
        <Footer />
    </>
  );
}
