import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — Tax Experts Hub",
  description: "Privacy Policy for Tax Experts Hub. Learn how we collect, use, and protect your personal information when you visit our website.",
  alternates: { canonical: "https://taxexpertshub.com/privacy-policy" },
  openGraph: {
    title: "Privacy Policy — Tax Experts Hub",
    description: "Privacy Policy for Tax Experts Hub. Learn how we collect, use, and protect your personal information.",
    url: "https://taxexpertshub.com/privacy-policy",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function PrivacyPolicyPage() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16 md:py-24">
      <h1 className="font-display text-4xl md:text-5xl text-navy">Privacy Policy</h1>
      <p className="mt-2 text-sm text-muted-foreground">Last updated: June 1, 2026</p>

      <div className="mt-10 prose prose-lg max-w-none text-muted-foreground [&_h2]:text-navy [&_h2]:font-display [&_h2]:text-2xl [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-navy [&_h3]:font-display [&_h3]:text-xl [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:leading-relaxed [&_p]:mb-4 [&_strong]:text-navy [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_li]:mb-2">
        <h2>Introduction</h2>
        <p>
          Tax Experts Hub (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) respects your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website at taxexpertshub.com (the &quot;Site&quot;).
        </p>
        <p>
          Please read this policy carefully. By accessing or using the Site, you agree to the collection and use of information in accordance with this policy.
        </p>

        <h2>Information We Collect</h2>

        <h3>Personal Information</h3>
        <p>
          We do not require you to create an account or provide personal information to access the Site. If you contact us via email, we may collect your name, email address, and any information you voluntarily provide in your message.
        </p>

        <h3>Automatically Collected Information</h3>
        <p>
          When you visit the Site, we may automatically collect certain information, including:
        </p>
        <ul>
          <li>Your IP address, browser type, and operating system</li>
          <li>Pages you visit, time spent on those pages, and referring URL</li>
          <li>Device information such as screen resolution and language preferences</li>
        </ul>
        <p>
          This information is collected using cookies, log files, and similar technologies as described in our <a href="/cookie-policy" className="text-accent hover:underline">Cookie Policy</a>.
        </p>

        <h2>How We Use Your Information</h2>
        <p>We may use the information we collect for the following purposes:</p>
        <ul>
          <li>To operate, maintain, and improve the Site</li>
          <li>To analyze usage trends and understand our audience</li>
          <li>To display relevant advertisements via Google AdSense</li>
          <li>To respond to your inquiries if you contact us</li>
          <li>To comply with applicable legal obligations</li>
        </ul>

        <h2>Google AdSense</h2>
        <p>
          We use Google AdSense to serve advertisements on the Site. Google AdSense uses cookies and web beacons to serve ads based on your prior visits to this website or other websites. You may opt out of personalized advertising by visiting <a href="https://adssettings.google.com" className="text-accent hover:underline" target="_blank" rel="noopener noreferrer">Google Ads Settings</a>.
        </p>
        <p>
          Google&apos;s use of advertising cookies enables it and its partners to serve ads based on your visit to our Site and other sites on the Internet. You can learn more about Google&apos;s privacy practices at <a href="https://policies.google.com/privacy" className="text-accent hover:underline" target="_blank" rel="noopener noreferrer">https://policies.google.com/privacy</a>.
        </p>

        <h2>Third-Party Services</h2>
        <p>
          We may use third-party service providers (such as analytics providers and hosting services) that collect, monitor, and analyze data to help us operate the Site. These third parties have their own privacy policies governing the use of your information.
        </p>

        <h2>Data Retention</h2>
        <p>
          We retain automatically collected information for analytics purposes for up to 26 months. If you contact us via email, we will retain your communications only as long as necessary to respond to your inquiry and for record-keeping purposes.
        </p>

        <h2>Your Rights</h2>
        <p>
          Depending on your location, you may have rights regarding your personal information, including:
        </p>
        <ul>
          <li>The right to access the personal data we hold about you</li>
          <li>The right to request deletion of your personal data</li>
          <li>The right to opt out of cookies and personalized advertising</li>
          <li>The right to withdraw consent where processing is based on consent</li>
        </ul>
        <p>
          To exercise any of these rights, please contact us at the email address below.
        </p>

        <h2>Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page with an updated date at the top.
        </p>

        <h2>Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us at:<br />
          <strong>Email:</strong> privacy@taxexpertshub.com
        </p>
      </div>
    </article>
  );
}
