import type { Metadata } from "next";
import { Instrument_Serif, Work_Sans } from "next/font/google";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import "../styles.css";

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
  title: "Tax Experts Hub — U.S. Tax Journalism in Plain English",
  description: "Plain-English U.S. tax coverage for individuals, freelancers, investors, and anyone holding an IRS notice they don't understand.",
  authors: [{ name: "Tax Experts Hub" }],
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
