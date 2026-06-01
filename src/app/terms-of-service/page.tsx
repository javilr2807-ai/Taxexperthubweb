import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — Tax Experts Hub",
  description: "Terms of Service for Tax Experts Hub. Read the rules and guidelines for using our tax journalism website.",
  alternates: { canonical: "https://taxexpertshub.com/terms-of-service" },
  openGraph: {
    title: "Terms of Service — Tax Experts Hub",
    description: "Terms of Service for Tax Experts Hub. Read the rules and guidelines for using our website.",
    url: "https://taxexpertshub.com/terms-of-service",
  },
};

export default function TermsOfServicePage() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16 md:py-24">
      <h1 className="font-display text-4xl md:text-5xl text-navy">Terms of Service</h1>
      <p className="mt-2 text-sm text-muted-foreground">Last updated: June 1, 2026</p>

      <div className="mt-10 prose prose-lg max-w-none text-muted-foreground [&_h2]:text-navy [&_h2]:font-display [&_h2]:text-2xl [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-navy [&_h3]:font-display [&_h3]:text-xl [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:leading-relaxed [&_p]:mb-4 [&_strong]:text-navy [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_li]:mb-2">
        <h2>Acceptance of Terms</h2>
        <p>
          By accessing or using Tax Experts Hub (&quot;the Site&quot;), you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you must not use the Site.
        </p>

        <h2>Editorial Content</h2>
        <p>
          All articles, guides, and other content published on Tax Experts Hub are for informational and educational purposes only. Nothing on this Site constitutes legal, tax, accounting, or professional advice.
        </p>
        <p>
          Tax laws and regulations are complex and subject to change. You should consult a qualified tax professional, CPA, or tax attorney regarding your specific situation. We make no representations or warranties about the accuracy, completeness, or timeliness of the content.
        </p>

        <h2>Intellectual Property</h2>
        <p>
          All content on the Site, including text, graphics, logos, images, and the arrangement thereof, is the property of Tax Experts Hub unless otherwise noted, and is protected by United States and international copyright laws.
        </p>
        <p>
          You may not reproduce, distribute, modify, transmit, or commercially exploit any content from the Site without our prior written permission.
        </p>

        <h2>User Conduct</h2>
        <p>You agree not to:</p>
        <ul>
          <li>Use the Site for any unlawful purpose or in violation of any applicable laws</li>
          <li>Attempt to gain unauthorized access to any part of the Site or its systems</li>
          <li>Interfere with the proper functioning of the Site</li>
          <li>Scrape, crawl, or otherwise collect data from the Site without authorization</li>
          <li>Post or transmit any malicious code, viruses, or harmful content</li>
        </ul>

        <h2>Third-Party Links</h2>
        <p>
          The Site may contain links to third-party websites or services that are not owned or controlled by us. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites.
        </p>

        <h2>Affiliate Disclosure</h2>
        <p>
          Tax Experts Hub does not use affiliate links. We do not accept compensation for product recommendations or endorsements. Our editorial content is independent and free from commercial influence.
        </p>

        <h2>Limitation of Liability</h2>
        <p>
          In no event shall Tax Experts Hub, its owners, operators, or contributors be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of the Site. This includes, without limitation, any tax penalties, financial losses, or legal fees incurred as a result of relying on our content.
        </p>

        <h2>Changes to Terms</h2>
        <p>
          We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting. Your continued use of the Site after any changes constitutes acceptance of the new terms.
        </p>

        <h2>Governing Law</h2>
        <p>
          These Terms of Service shall be governed by and construed in accordance with the laws of the United States of America, without regard to its conflict of law provisions.
        </p>

        <h2>Contact</h2>
        <p>
          If you have any questions about these Terms of Service, please contact us at:<br />
          <strong>Email:</strong> legal@taxexpertshub.com
        </p>
      </div>
    </article>
  );
}
