export default function Hero() {
  return (
    <header className="flex flex-col items-center justify-center text-center p-10 min-h-screen bg-sand">
      <div className="bg-sand/80 p-10 rounded-lg">
        <h2 className="text-5xl font-extrabold text-brick">Welcome to KooWhips</h2>
        <p className="mt-4 text-lg text-slateblue max-w-xl">
          Build modern, responsive websites with React + Tailwind CSS — styled to match my custom palette and font.
        </p>
        <div className="mt-6 space-x-4">
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
