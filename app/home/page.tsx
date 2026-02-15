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
import PinnedSection from "../components/PinnedSection";
import { getPortfolios } from "@/app/lib/portfolio";

export default async function Home() {
  const portfoliosData = await getPortfolios();

  // Map domain Portfolio objects to the UI PortfolioItem format
  const portfolios = portfoliosData.map(p => ({
    id: p.id,
    slug: p.slug,
    tag: p.tag || 'Case Study',
    caseStudyTitle: p.title,
    image: p.cover?.url || '/portfolioimage1.jpg'
  }));

  return (
    <div className="w-full overflow-x-hidden">
      <Header />
      <LandingHero />
      <LogoStrip />
      <TextSection />
      <MeetingBoxSection />
      <TeamsSection />



      <PinnedSection pinDuration="1000vh">
        <div
          className="flex w-full flex-col gap-4 rounded-[30px] md:rounded-[30px] lg:rounded-[30px] relative "
          style={{
            background: 'radial-gradient(64.55% 66.78% at 0% 0%, #00A9EE 0%, #00378A 24.5%, #121212 74.04%)',

          }}
        >
          <BentoGrid />
        </div>
      </PinnedSection>

      <div
        className="flex w-full flex-col gap-4 rounded-[30px] md:rounded-[30px] lg:rounded-[30px] relative "
        style={{
          background: 'radial-gradient(64.55% 66.78% at 0% 0%, #00A9EE 0%, #00378A 24.5%, #121212 74.04%)',

        }}
      >
        <PortfolioSection initialData={portfolios} />
      </div>

      <BlogSection />
    
      <Footer />
    </div>
  );
}
