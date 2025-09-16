"use client";
import Link from "next/link";
import { WiDaySunny } from "react-icons/wi";
import { motion } from "framer-motion";

export default function Navbar() {
  const links = [
    { name: "Home", href: "/" },
    { name: "History", href: "/history" },
    { name: "Weather Details", href: "/weather" },
    { name: "About", href: "/about" },
  ];

  return (
    <nav className="bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400 shadow-lg px-6 py-4 flex justify-between items-center">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex items-center space-x-3"
      >
        <WiDaySunny size={32} className="text-black" />
        <h1 className="text-black font-extrabold text-2xl tracking-wide">
          WeatherApp
        </h1>
      </motion.div>

      <div className="flex space-x-8 font-semibold">
        {links.map((link) => (
          <motion.div
            key={link.name}
            whileHover={{ scale: 1.1 }}
            className="text-black cursor-pointer transition-colors duration-300"
          >
            <Link href={link.href}>{link.name}</Link>
          </motion.div>
        ))}
      </div>
    </nav>
  );
}
