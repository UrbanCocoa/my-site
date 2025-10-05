export default function Instagram({ logo }) {
  return (
    <div className="bg-sand rounded-lg shadow-md p-6 flex flex-col items-center">
      <h3 className="text-2xl font-bold mb-4 text-brick">My Instagram!</h3>
      <a href="https://www.instagram.com/koowhips" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
        <img
          src={logo}
          alt="Instagram Logo"
          className="w-24 h-24 md:w-32 md:h-32 object-contain hover:scale-110 transition-transform"
        />
      </a>
    </div>
  );
}
