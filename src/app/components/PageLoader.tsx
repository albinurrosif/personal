'use client';

export default function PageLoader({ sectionName = 'content' }) {
  return (
    <section className="min-h-[400px] flex items-center justify-center bg-background">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
        <p className="text-sm text-gray-400">Loading {sectionName}...</p>
      </div>
    </section>
  );
}