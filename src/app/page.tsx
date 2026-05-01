import { Nav } from "@/components/nav/Nav";
import { Hero } from "@/components/hero/Hero";
import { Work } from "@/components/work/Work";
import { Expertise } from "@/components/expertise/Expertise";
import { About } from "@/components/about/About";
import { Contact } from "@/components/contact/Contact";
import { Footer } from "@/components/footer/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main" className="relative">
        <Hero />
        <Work />
        <Expertise />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
