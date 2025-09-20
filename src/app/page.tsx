export default function Home() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center bg-background text-foreground ">
      <h1 className="text-4xl sm:text-6xl font-bold mb-4">
        Hi, I&apos;m <span className="text-blue-700">Bee</span>
      </h1>
      <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-xl mb-6">A passionate Frontend Developer learning React, Next.js, and TailwindCSS.</p>
      <div className="flex gap-4">
        <a href="#projects" className="px-6 py-3 bg-blue-500 text-white font-medium rounded hover:bg-blue-600 transition-colors">
          view Projects
        </a>
        <a href="#contact" className="px-6 py-3 rounded border border-foreground font-medium hover:bg-background hover:text-foreground transition-colors">
          Contact Me
        </a>
      </div>
    </section>
  );
}
