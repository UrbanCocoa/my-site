export default function Hero() {
  return (
    <header className="flex flex-col items-center justify-center text-center p-6 sm:p-10 min-h-screen bg-sand">
      <div className="bg-sand/80 p-6 sm:p-10 rounded-lg max-w-3xl w-full">
        <h2 className="text-3xl sm:text-5xl font-extrabold text-brick">
          Welcome to KooWhips
        </h2>
        <p className="mt-4 text-base sm:text-lg text-slateblue max-w-xl mx-auto">
          Build modern, responsive websites with React + Tailwind CSS — styled to match my custom palette and font.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row sm:justify-center gap-4 sm:gap-4">
          <button className="px-6 py-3 bg-mint hover:bg-slateblue text-night rounded-lg font-semibold shadow-md transition">
            Get Started
          </button>
          <button className="px-6 py-3 bg-brick hover:bg-night text-sand rounded-lg font-semibold shadow-md transition">
            Learn More
          </button>
        </div>
      </div>
    </header>
  );
}
