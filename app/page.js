import dynamic from "next/dynamic";
import { personalData } from "@/utils/data/personal-data";
import AboutSection from "./components/homepage/about";
import ContactSection from "./components/homepage/contact";
import Education from "./components/homepage/education";
import Experience from "./components/homepage/experience";
import Projects from "./components/homepage/projects";
import Skills from "./components/homepage/skills";

// Dynamically import components that might use document/window (disable SSR)
const HeroSection = dynamic(() => import("./components/homepage/hero-section"), { ssr: false });
const Blog = dynamic(() => import("./components/homepage/blog"), { ssr: false });

async function getData() {
  try {
    const res = await fetch(
      https://dev.to/api/articles?username=${personalData.devUsername},
      { cache: "no-store" }
    );

    if (!res.ok) throw new Error("Failed to fetch");

    const data = await res.json();
    const filtered = data
      .filter((item) => item?.cover_image)
      .sort(() => Math.random() - 0.5);

    return filtered;
  } catch (err) {
    console.error("Error fetching blog data:", err);
    return []; // fallback empty array
  }
}

export default async function Home() {
  const blogs = await getData();

  return (
    <div suppressHydrationWarning>
      <HeroSection />
      <AboutSection />
      <Experience />
      <Skills />
      <Projects />
      <Education />
      <Blog blogs={blogs} />
      <ContactSection />
    </div>
  );
}