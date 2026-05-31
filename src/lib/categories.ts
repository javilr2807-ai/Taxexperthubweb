import catPersonal from "@/assets/cat-personal.jpg";
import catFreelancer from "@/assets/cat-freelancer.jpg";
import catCrypto from "@/assets/cat-crypto.jpg";
import catRelief from "@/assets/cat-relief.jpg";

import type { StaticImageData } from "next/image";

export type Category = {
  slug: string;
  number: string;
  title: string;
  shortTitle: string;
  tagline: string;
  description: string;
  audience: string;
  image: string | StaticImageData;
  imageAlt: string;
  topics: { title: string; blurb: string }[];
  forms: string[];
  questions: string[];
};

export const categories: Category[] = [
  {
    slug: "personal-income-tax",
    number: "01",
    shortTitle: "Personal Income Tax",
    title: "Personal Income Tax",
    tagline: "Filing Form 1040, with confidence.",
    description:
      "Built for the average American taxpayer and families. Plain-English answers on annual filing, credits for children and dependents, standard vs. itemized deductions, and the tax impact of life events — marriage, divorce, inheritance, even a lottery win.",
    audience: "Individuals, married couples, parents, retirees.",
    image: catPersonal,
    imageAlt: "American family kitchen table with tax paperwork at golden hour.",
    topics: [
      { title: "Form 1040 walkthrough", blurb: "Line-by-line, in plain English." },
      { title: "Child Tax Credit & dependents", blurb: "Who qualifies and how much you get back." },
      { title: "Standard vs. itemized", blurb: "Run the numbers before you choose." },
      { title: "Life-event tax impact", blurb: "Marriage, divorce, inheritance, windfalls." },
      { title: "W-2 withholding", blurb: "Stop overpaying the IRS every January." },
      { title: "State + federal interplay", blurb: "What changes when you cross state lines." },
    ],
    forms: ["Form 1040", "Schedule A", "W-2", "W-4", "Form 8862"],
    questions: [
      "Should I file jointly or separately after getting married?",
      "How much is the Child Tax Credit this year?",
      "Do I need to itemize if I own a home?",
      "Is my inheritance taxable?",
    ],
  },
  {
    slug: "freelancer-small-business",
    number: "02",
    shortTitle: "Freelancer & Small Business",
    title: "Freelancer & Small Business Taxes",
    tagline: "The tax desk for the gig economy and Main Street.",
    description:
      "For Uber and Lyft drivers, creators, Shopify and Amazon sellers, independent freelancers, and LLC owners. Learn to deduct the home office, vehicle mileage, and software stack; file Schedule C and Form 1099-NEC; and stay current on quarterly estimated taxes.",
    audience: "Self-employed, 1099 contractors, LLC owners, e-commerce sellers.",
    image: catFreelancer,
    imageAlt: "Freelancer's home office desk with laptop and brass lamp at dusk.",
    topics: [
      { title: "Home office deduction", blurb: "Simplified vs. actual-expense method." },
      { title: "Vehicle & mileage", blurb: "Standard rate or every receipt — which wins." },
      { title: "Schedule C, demystified", blurb: "Every line, every common mistake." },
      { title: "1099-NEC & 1099-K", blurb: "What platforms report and what they don't." },
      { title: "Quarterly estimated taxes", blurb: "Avoid the underpayment penalty." },
      { title: "S-Corp vs. LLC", blurb: "When the switch actually saves money." },
    ],
    forms: ["Schedule C", "Schedule SE", "Form 1099-NEC", "Form 1099-K", "Form 8829"],
    questions: [
      "How do I deduct my home office without triggering an audit?",
      "When should an LLC elect S-Corp status?",
      "What expenses can a content creator write off?",
      "How do I pay quarterly taxes if income is unpredictable?",
    ],
  },
  {
    slug: "crypto-investment",
    number: "03",
    shortTitle: "Crypto & Investments",
    title: "Crypto & Investment Taxes",
    tagline: "The IRS plays your portfolio. Know the rules.",
    description:
      "Written for retail investors trading equities and crypto. Understand short-term vs. long-term capital gains, harvest losses to cut your bill, navigate the wash-sale rule, and decode the tax treatment of dividends, staking rewards, NFTs, and retirement accounts.",
    audience: "Retail traders, crypto holders, dividend investors, 401(k) and IRA savers.",
    image: catCrypto,
    imageAlt: "Abstract brass candlestick chart on a deep navy background.",
    topics: [
      { title: "Capital gains: short vs. long", blurb: "A one-day difference can save thousands." },
      { title: "Tax-loss harvesting", blurb: "Turn red portfolios into a tax refund." },
      { title: "The wash-sale rule", blurb: "And how it does (and doesn't) hit crypto." },
      { title: "Staking, mining, NFTs", blurb: "Ordinary income vs. capital gains." },
      { title: "401(k), Roth IRA, HSA", blurb: "The three accounts that quietly compound." },
      { title: "Form 8949 + Schedule D", blurb: "Reporting every trade without losing your mind." },
    ],
    forms: ["Form 8949", "Schedule D", "Form 1099-B", "Form 1099-DIV", "Form 5498"],
    questions: [
      "Do I owe taxes on crypto I haven't sold?",
      "How does tax-loss harvesting actually work?",
      "Is a Roth conversion worth it this year?",
      "Are NFT sales treated as collectibles?",
    ],
  },
  {
    slug: "tax-relief-audits",
    number: "04",
    shortTitle: "Tax Relief & Audits",
    title: "Tax Relief & Audits",
    tagline: "When the IRS writes you. Don't panic. Open the letter.",
    description:
      "The triage desk for taxpayers in trouble. What to do when a CP2000 or Letter 12C lands in the mailbox, how to set up an Online Payment Agreement, when penalty abatement is on the table, and how wage garnishments and liens actually work.",
    audience: "Anyone who owes the IRS, missed a filing, or received a notice.",
    image: catRelief,
    imageAlt: "Unopened official government envelope under a single warm beam of light.",
    topics: [
      { title: "IRS notice decoder", blurb: "CP2000, CP501, Letter 12C, LT11 — what each means." },
      { title: "Payment plans", blurb: "Short-term, long-term, and partial-pay agreements." },
      { title: "Penalty abatement", blurb: "First-time relief and reasonable cause." },
      { title: "Offer in Compromise", blurb: "When the IRS will accept less than you owe." },
      { title: "Wage garnishment & liens", blurb: "Stopping collections before payday." },
      { title: "Audit response playbook", blurb: "Mail audit, office audit, field audit." },
    ],
    forms: ["Form 9465", "Form 656", "Form 843", "Form 433-A", "CP2000 Notice"],
    questions: [
      "What does a CP2000 notice actually want from me?",
      "Can I really settle my tax debt for pennies on the dollar?",
      "How fast can the IRS garnish my paycheck?",
      "What's the difference between a lien and a levy?",
    ],
  },
];

export const getCategory = (slug: string) =>
  categories.find((c) => c.slug === slug);
