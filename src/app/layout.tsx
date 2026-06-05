import type { Metadata } from "next";
import { Instrument_Serif, Work_Sans } from "next/font/google";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import "../styles.css";
import Script from "next/script";

const instrumentSerif = Instrument_Serif({
  weight: ["400"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-display-next",
  display: "swap",
});

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-sans-next",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://taxexpertshub.com"),
  title: "Tax Experts Hub | U.S. Tax Guides for Individuals & Small Businesses",
  description: "Practical U.S. tax guides for individuals, freelancers, self-employed workers, and small businesses. Learn about IRS forms, tax deductions, credits, audits, and filing rules in plain English.",
  keywords: ["U.S. tax guides", "tax deductions", "IRS forms", "freelancer taxes", "small business tax", "self-employed tax", "personal income tax", "tax relief", "IRS audit help", "crypto tax guide", "tax explanations"],
  authors: [{ name: "Tax Experts Hub" }],
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  verification: {
    google: "JzQLVSOfUHxe-1oHvGbsW9xvTFoT594mCNcNoeuaq6Y",
  },
  openGraph: {
    siteName: "Tax Experts Hub",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script 
          async 
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6585145551277304" 
          crossOrigin="anonymous" 
        ></script>
      </head>
      <body className={`${instrumentSerif.variable} ${workSans.variable} antialiased`}>
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
