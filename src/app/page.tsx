import Hero from '@/app/components/HeroSection';
import About from '@/app/components/AboutMe';
import Project from '@/app/components/ProjectSection';
import Skill from '@/app/components/SkillSection';
import ContactForm from '@/app/components/ContactForm';
import Footer from '@/app/components/Footer';


export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Skill />
      <Project />
      <ContactForm />
      
    </>
  );
}
