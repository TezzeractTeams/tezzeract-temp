import Header from "../components/Header";
import Footer from "../components/Footer";
import PortfolioCard from "../components/ui/PortfolioCard";
import { getPortfolios, type Portfolio } from "@/app/lib/portfolio";
import Image from "next/image";

export default async function PortfolioPage() {
    // Use a try-catch block to handle potential data fetching errors gracefully
    let portfoliosData: Portfolio[] = [];
    try {
        portfoliosData = await getPortfolios();
    } catch (error) {
        console.error("Failed to fetch portfolios:", error);
        // Continue with empty array or fallback
    }

    const portfolios = portfoliosData.map(p => ({
        id: p.id,
        slug: p.slug,
        tag: p.tag || 'Case Study',
        caseStudyTitle: p.title,
        image: p.cover?.url || '/portfolioimage1.jpg'
    }));

    return (
        <div className="w-full overflow-x-hidden bg-white">
            <Header />

            {/* Hero Section - Matching About Us Aesthetic */}
            <div className="relative flex items-center justify-center text-center h-[60vh] pb-20 overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat blur-md scale-4000"
                    style={{
                        backgroundImage: "url('/assets/aboutbg.png')",
                    }}
                    aria-hidden
                />
                <h1 className="relative z-10 text-4xl md:text-5xl lg:text-6xl xl:text-8xl font-light leading-tight mb-4 tracking-tighter">
                    <span className="text-[#00A9EE] font-light">Our</span>{" "}
                    <span className="text-gray-700">Work</span>
                </h1>
            </div>

            {/* Content Section - Matching About Us layout structure */}
            <div className="relative bg-white -mt-20 w-full rounded-t-[40px] z-10 overflow-hidden px-4 md:px-8 pt-20 pb-20">
                <div className="w-full mx-auto">
                    {portfolios.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-[1600px] mx-auto">
                            {portfolios.map((item) => (
                                <div key={item.id} className="w-full">
                                    <PortfolioCard
                                        tag={item.tag}
                                        caseStudyTitle={item.caseStudyTitle}
                                        image={item.image}
                                        slug={item.slug}
                                    />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <p className="text-gray-500 text-lg">No portfolio items found.</p>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}
