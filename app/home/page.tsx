import dynamic from "next/dynamic";
import Header from "../components/Header";
import LandingHero from "../components/LandingHero";
import LogoStrip from "../components/LogoStrip";
import MeetingBoxSection from "../components/MeetingBoxSection";
import TeamsSection from "../components/TeamsSection";
import TextSection from "../components/TextSection";
import PinnedSection from "../components/PinnedSection";
// import Preloader from "../components/Preloader"; // Temporarily disabled for page speed testing
import { getPortfolios } from "@/app/lib/portfolio";
import { getPosts } from "@/app/lib/strapi";

// Dynamic imports for below-the-fold components
const BentoGrid = dynamic(() => import("../components/BentoGrid"), {
  loading: () => <div className="w-full h-[800px] bg-gradient-to-br from-[#00A9EE] to-[#00378A]" />,
});

const PortfolioSection = dynamic(() => import("../components/PortfolioSection"), {
  loading: () => <div className="w-full h-[600px] bg-black" />,
});

const BlogSection = dynamic(() => import("../components/BlogSection"));

const Footer = dynamic(() => import("../components/Footer"));


export default async function Home() {
  // Parallelize API calls
  const [portfoliosData, postsData] = await Promise.all([
    getPortfolios(),
    getPosts(),
  ]);

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
      {/* <Preloader /> */} {/* Temporarily disabled for page speed testing */}
      <Header />

      <LandingHero />
      <LogoStrip />
      <TextSection />
      <MeetingBoxSection />
      <TeamsSection />



      <PinnedSection pinDuration="800vh">
        <div
          className="flex w-full flex-col gap-4 rounded-t-[30px] relative "
          style={{
            background: 'radial-gradient(64.55% 66.78% at 0% 0%, #00A9EE 0%, #00378A 24.5%, #121212 74.04%)',

          }}
        >
          <BentoGrid />
        </div>
      </PinnedSection>

      <div
        className="flex w-full flex-col gap-4 sm:rounded-b-[30px] relative "
        style={{
          background: 'black',

        }}
      >
        <PortfolioSection initialData={portfolios} />
      </div>

      <BlogSection initialPosts={postsData} />
    
      <Footer />
    </div>
  );
}
