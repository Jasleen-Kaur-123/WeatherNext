import "./global.css";
import Navbar from "../components/navbarComponents";
import Footer from "../components/footerComponents";

export const metadata = {
  title: "Weather App",
  description: "Weather forecast app built with Next.js + Tailwind CSS",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="min-h-[80vh] p-4">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
