export default function Footer() {
  return (
    <footer className="bg-night p-4 sm:p-6 text-center text-sand text-sm sm:text-base">
      <p className="break-words">
        © {new Date().getFullYear()} KooWhips. All rights reserved.
      </p>
    </footer>
  );
}
