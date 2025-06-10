import Navbar from "@/components/Navbar";
import "./globals.css";
import { Montserrat } from "next/font/google";
import { Toaster } from "react-hot-toast";

const carme = Montserrat({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={carme.className}>
      <body>
        <div className="w-full min-h-screen relative">
          <Navbar />
          {children}
          <Toaster />
        </div>
      </body>
    </html>
  );
}
