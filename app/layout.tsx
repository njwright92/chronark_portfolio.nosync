import "../global.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Nate's Portfolio",
    template: "%s | Nathan Wright's Dev Portfolio",
  },
  description:
    "Junior Software Developer, Crafting Code with Passion and Precision",
  openGraph: {
    title: "Nathan Wright's Dev Portfolio",
    description:
      "Explore my journey as a Junior Software Developer and my passion for web development.",
    url: "https://chronark.com",
    siteName: "chronark.com",
    locale: "en-US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: "Chronark",
    card: "summary_large_image",
  },
  icons: {
    shortcut: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`bg-zinc-900 ${
          process.env.NODE_ENV === "development" ? "debug-screens" : undefined
        }`}
      >
        {children}
      </body>
    </html>
  );
}
