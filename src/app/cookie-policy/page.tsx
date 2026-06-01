import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy — Tax Experts Hub",
  description: "Cookie Policy for Tax Experts Hub. Learn about the cookies we use, including Google AdSense cookies, and how to manage your preferences.",
  alternates: { canonical: "https://taxexpertshub.com/cookie-policy" },
  openGraph: {
    title: "Cookie Policy — Tax Experts Hub",
    description: "Learn about the cookies used on Tax Experts Hub, including Google AdSense cookies, and how to manage your preferences.",
    url: "https://taxexpertshub.com/cookie-policy",
  },
};

export default function CookiePolicyPage() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16 md:py-24">
      <h1 className="font-display text-4xl md:text-5xl text-navy">Cookie Policy</h1>
      <p className="mt-2 text-sm text-muted-foreground">Last updated: June 1, 2026</p>

      <div className="mt-10 prose prose-lg max-w-none text-muted-foreground [&_h2]:text-navy [&_h2]:font-display [&_h2]:text-2xl [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-navy [&_h3]:font-display [&_h3]:text-xl [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:leading-relaxed [&_p]:mb-4 [&_strong]:text-navy [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_li]:mb-2">
        <h2>What Are Cookies</h2>
        <p>
          Cookies are small text files that are stored on your device (computer, tablet, or mobile) when you visit a website. They help the website recognize your device and remember information about your visit, such as your preferences and settings.
        </p>

        <h2>How We Use Cookies</h2>
        <p>Tax Experts Hub uses cookies for the following purposes:</p>
        <ul>
          <li><strong>Essential Cookies:</strong> These are necessary for the proper functioning of the Site, such as maintaining your session and security.</li>
          <li><strong>Analytics Cookies:</strong> We use analytics services to understand how visitors interact with the Site, which pages are most frequently visited, and how users navigate the Site.</li>
          <li><strong>Advertising Cookies:</strong> We use Google AdSense to serve advertisements. AdSense uses cookies to deliver personalized ads based on your browsing history and interests.</li>
        </ul>

        <h2>Google AdSense Cookies</h2>
        <p>
          Google AdSense uses DoubleClick cookies to enable interest-based advertising. These cookies collect information about your visits to this Site and other websites to provide relevant advertisements. You can learn more about how Google uses cookies at <a href="https://policies.google.com/technologies/cookies" className="text-accent hover:underline" target="_blank" rel="noopener noreferrer">https://policies.google.com/technologies/cookies</a>.
        </p>
        <p>
          To opt out of personalized advertising, visit <a href="https://adssettings.google.com" className="text-accent hover:underline" target="_blank" rel="noopener noreferrer">Google Ads Settings</a>. You can also opt out of third-party cookies used for interest-based advertising through the <a href="https://optout.networkadvertising.org" className="text-accent hover:underline" target="_blank" rel="noopener noreferrer">Network Advertising Initiative</a> opt-out page.
        </p>

        <h2>Analytics Cookies</h2>
        <p>
          We may use analytics providers such as Google Analytics to collect information about how you use the Site. These analytics cookies collect information in aggregate form, including the number of visitors, pages visited, and traffic sources. Google Analytics&apos;s privacy policy is available at <a href="https://policies.google.com/privacy" className="text-accent hover:underline" target="_blank" rel="noopener noreferrer">https://policies.google.com/privacy</a>.
        </p>

        <h2>Managing Cookies</h2>
        <p>You can control and manage cookies in several ways:</p>
        <ul>
          <li><strong>Browser Settings:</strong> Most web browsers allow you to block or delete cookies through your browser settings. Consult your browser&apos;s help documentation for instructions.</li>
          <li><strong>Opt-Out Tools:</strong> Use the Google Ads Settings page to opt out of personalized advertising.</li>
          <li><strong>Third-Party Opt-Out:</strong> Visit the Network Advertising Initiative opt-out page at <a href="https://optout.networkadvertising.org" className="text-accent hover:underline" target="_blank" rel="noopener noreferrer">optout.networkadvertising.org</a>.</li>
        </ul>
        <p>
          Please note that blocking essential cookies may affect the functionality of the Site.
        </p>

        <h2>Changes to This Policy</h2>
        <p>
          We may update this Cookie Policy from time to time. Any changes will be posted on this page with an updated date at the top.
        </p>

        <h2>Contact</h2>
        <p>
          If you have questions about our use of cookies, please contact us at:<br />
          <strong>Email:</strong> privacy@taxexpertshub.com
        </p>
      </div>
    </article>
  );
}
