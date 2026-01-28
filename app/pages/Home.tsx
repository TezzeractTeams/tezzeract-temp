import Header from "../components/Header";
import LandingHero from "../components/LandingHero";
import LogoStrip from "../components/LogoStrip";
import MeetingBoxSection from "../components/MeetingBoxSection";
import TeamsSection from "../components/TeamsSection";
import TextSection from "../components/TextSection";
import BentoGrid from "../components/BentoGrid";
import Footer from "../components/Footer";

export default function Home() {
  
  return (
    <>
   <Header />
      <LandingHero />
      <LogoStrip  />
      <TextSection />
      <MeetingBoxSection />
      <TeamsSection />
      <BentoGrid />
      <div className="h-[1000px]"></div>
      <Footer />
    </>
  );
}
