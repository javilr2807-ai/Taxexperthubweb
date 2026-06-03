import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Legal Notice — Tax Experts Hub",
  description: "Legal Notice for Tax Experts Hub. Publisher information, contact details, and legal disclaimers for our tax journalism website.",
  alternates: { canonical: "https://taxexpertshub.com/legal-notice" },
  openGraph: {
    title: "Legal Notice — Tax Experts Hub",
    description: "Legal Notice for Tax Experts Hub. Important information about the educational nature of our content.",
    url: "https://taxexpertshub.com/legal-notice",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function LegalNoticePage() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16 md:py-24">
      <h1 className="font-display text-4xl md:text-5xl text-navy">Legal Notice</h1>

      <div className="mt-10 prose prose-lg max-w-none text-muted-foreground [&_h2]:text-navy [&_h2]:font-display [&_h2]:text-2xl [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-navy [&_h3]:font-display [&_h3]:text-xl [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:leading-relaxed [&_p]:mb-4 [&_strong]:text-navy [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_li]:mb-2">
        <h2>Publisher Information</h2>
        <p>
          <strong>Tax Experts Hub</strong> is an independent online publication providing editorial tax journalism for U.S. taxpayers.
        </p>
        <p>
          <strong>Website:</strong> <a href="https://taxexpertshub.com" className="text-accent hover:underline">https://taxexpertshub.com</a><br />
          <strong>Contact Email:</strong> contact@taxexpertshub.com
        </p>

        <h2>Editorial Independence</h2>
        <p>
          Tax Experts Hub operates as an independent editorial publication. We do not accept sponsored content, affiliate commissions, or payments for coverage. All editorial decisions are made independently and in the interest of our readers.
        </p>

        <h2>No Professional Advice</h2>
        <p>
          The content published on Tax Experts Hub is for informational and educational purposes only. It does not constitute legal, tax, accounting, or professional advice. Reading this website does not create a professional-client relationship of any kind.
        </p>
        <p>
          Tax laws and regulations vary by jurisdiction and are subject to change. Always consult a qualified tax professional (CPA, Enrolled Agent, or tax attorney) regarding your specific financial situation.
        </p>

        <h2>Limitation of Liability</h2>
        <p>
          To the fullest extent permitted by applicable law, Tax Experts Hub disclaims all warranties, express or implied, regarding the accuracy, reliability, or completeness of any content on this website. We shall not be liable for any losses, damages, or expenses arising from the use of or reliance on the content provided herein.
        </p>

        <h2>No Warranties</h2>
        <p>
          The Site and its content are provided on an &quot;as is&quot; and &quot;as available&quot; basis without any warranties of any kind, either express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, or non-infringement.
        </p>

        <h2>Copyright</h2>
        <p>
          All content on Tax Experts Hub, including text, graphics, and design, is protected by copyright law. Reproduction, distribution, or unauthorized use of any content without prior written permission is prohibited.
        </p>

        <h2>Governing Law</h2>
        <p>
          This Legal Notice shall be governed by and construed in accordance with the laws of the United States of America.
        </p>

        <h2>Contact</h2>
        <p>
          For legal inquiries, please contact us at:<br />
          <strong>Email:</strong> legal@taxexpertshub.com
        </p>
      </div>
    </article>
  );
}
