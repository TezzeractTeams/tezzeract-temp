import Header from "../components/Header";
import PricingPageSection from "../components/PricingPageSection";
import { FAQ } from "../components/FAQ";
import Footer from "../components/Footer";

export default function PricingPage() {
  return (
    <div className="w-[100vw] overflow-x-hidden">
      <Header />
      <PricingPageSection />
      <FAQ />
      <Footer />
    </div>
  );
}
