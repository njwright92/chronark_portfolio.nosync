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
    icon: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>👨‍💻</text></svg>",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-zinc-900">{children}</body>
    </html>
  );
}
