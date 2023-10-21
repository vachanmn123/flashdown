import { getServerSession } from "next-auth";
import "./globals.css";
import { Inter } from "next/font/google";
import authOptions from "@/lib/auth/authOptions";
import NavBar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "FlashDown",
  description: "Flash cards, colourful-er",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen`}>
        <NavBar session={session} />
        {children}
      </body>
    </html>
  );
}
