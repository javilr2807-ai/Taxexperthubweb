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
  title: "Tax Experts Hub | U.S. Tax Guides for Individuals & Small Businesses",
  description: "Practical U.S. tax guides for individuals, freelancers, self-employed workers, and small businesses. Learn about IRS forms, tax deductions, credits, audits, and filing rules in plain English.",
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
