import { HeroSection } from "@/app/components/Home/HeroSection"
import { PlatformInfoSection } from "./components/Home/PlatformInfoSection";
import { AboutSection } from "./components/Home/AboutUsSection";
import { AwardsSection } from "./components/Home/AwardsSection";
import { FaqSection } from "./components/Home/FAQSection";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";

export default function Home() {
  return (
  
    <div className="min-h-screen">
       <Navbar/>
      <HeroSection />
      <PlatformInfoSection />
      <AboutSection />
      <AwardsSection />
      <FaqSection />
      <Footer/>

    </div>
  
  );
}
