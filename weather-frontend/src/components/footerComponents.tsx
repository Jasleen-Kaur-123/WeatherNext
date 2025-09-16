export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6 text-center mt-10">
      <p className="text-sm">
        &copy; {new Date().getFullYear()} WeatherApp. Built by{" "}
        <span className="font-semibold text-white">Jasleen Kaur</span>.
      </p>
    </footer>
  );
}
