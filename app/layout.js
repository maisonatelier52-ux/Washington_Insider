// import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";
// import Header from "../components/Header";
// import Footer from "../components/Footer";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// export const metadata = {
//   title: "Washington Insider",
//   description:
//     "Washington Insider is a news site that covers the latest news in the world of technology, business, and finance. We provide in-depth analysis and insights on the latest trends and developments in the industry.",
//     icons: {
//     icon: "/favicon.ico",
//   }
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body
//         className={`
//           ${geistSans.variable} ${geistMono.variable} antialiased
//           flex min-h-screen flex-col bg-white
//         `}
//       >
//         <Header />

//         <main className="flex-grow">{children}</main>

//         <Footer />
//       </body>
//     </html>
//   );
// }


import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  preload: true,
});

export const metadata = {
  title: {
    default: "Washington Insider",
    template: "%s | Washington Insider",
  },
  description:
    "Washington Insider is a news site that covers the latest news in the world of technology, business, and finance. We provide in-depth analysis and insights on the latest trends and developments in the industry.",
  
  icons: {
    icon: "/washington-insider-icon.ico",           // Main favicon
    shortcut: "/washington-insider-icon.ico",
    apple: "/washington-insider-icon.ico",          // Optional: for iOS home screen
  },

  openGraph: {
    title: "Washington Insider",
    description:
      "Latest news and in-depth analysis on technology, business, and finance.",
    url: "https://www.washingtoninsider.org/",   // ← Change to your real domain
    siteName: "Washington Insider",
    images: [
      {
        url: "/og-image.png",               // Recommended: Add an OG image
        width: 1200,
        height: 630,
        alt: "Washington Insider",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Washington Insider",
    description:
      "Latest news and in-depth analysis on technology, business, and finance.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`
          ${geistSans.variable} 
          ${geistMono.variable} 
          antialiased
          flex min-h-screen flex-col bg-white
        `}
      >
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}