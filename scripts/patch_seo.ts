import * as fs from 'fs';

const updates = [
  {
    oldTitle: "What Happens If You Can't Pay Your Taxes?",
    newTitle: "What Happens If You Can't Pay Your Taxes? (2026 Guide)",
    newSlug: "what-happens-cant-pay-taxes-options",
    newExcerpt: "Can't pay your taxes in full? Discover your options, including IRS payment plans, Offer in Compromise, and hardship statuses. Learn how to resolve tax debt and avoid harsh penalties today."
  },
  {
    oldTitle: "How Long Can the IRS Collect a Tax Debt?",
    newTitle: "How Long Can the IRS Collect a Tax Debt? Statute of Limitations",
    newSlug: "irs-collection-statute-of-limitations",
    newExcerpt: "Is there an expiration date on back taxes? Learn the IRS statute of limitations on tax debt collection, exceptions that extend the deadline, and how to know if your debt has legally expired."
  },
  {
    oldTitle: "Can IRS Penalties Be Removed?",
    newTitle: "Can IRS Penalties Be Removed? How to Request Penalty Abatement",
    newSlug: "irs-penalty-abatement-removal",
    newExcerpt: "Learn how to qualify for IRS penalty abatement. Discover the exact steps to get late filing and payment penalties reduced or completely removed, saving you thousands on your tax bill."
  },
  {
    oldTitle: "What Happens If You Ignore an IRS Letter?",
    newTitle: "What Happens If You Ignore an IRS Letter? Penalties & Next Steps",
    newSlug: "ignore-irs-letter-notice-consequences",
    newExcerpt: "Never ignore an IRS notice. Find out the severe consequences of ignoring IRS letters, including wage garnishments, bank levies, and escalated collections, and learn how to respond properly."
  },
  {
    oldTitle: "What Is a Tax Lien?",
    newTitle: "What Is a Federal Tax Lien? How It Affects You & How to Remove It",
    newSlug: "what-is-federal-tax-lien-removal",
    newExcerpt: "What is an IRS tax lien? Understand how a federal tax lien impacts your credit, property, and finances, and discover the proven steps to get a tax lien released or withdrawn quickly."
  },
  {
    oldTitle: "How Does an IRS Payment Plan Work?",
    newTitle: "How Does an IRS Payment Plan Work? Guide to Installment Agreements",
    newSlug: "how-irs-payment-plan-installment-agreement-works",
    newExcerpt: "Can't afford your tax bill? Learn exactly how an IRS payment plan (installment agreement) works, the setup fees, interest rates, and how to apply online to pay off your tax debt over time."
  },
  {
    oldTitle: "Can You Negotiate With the IRS?",
    newTitle: "Can You Negotiate Tax Debt With the IRS? (Offer in Compromise)",
    newSlug: "negotiate-tax-debt-irs-offer-in-compromise",
    newExcerpt: "Can you settle your IRS debt for pennies on the dollar? Discover how the Offer in Compromise program allows taxpayers to negotiate with the IRS and legally reduce their total tax liability."
  },
  {
    oldTitle: "What Happens If You Owe the IRS Money?",
    newTitle: "Owe the IRS Money? Your Relief Options & Potential Consequences",
    newSlug: "what-to-do-if-you-owe-irs-taxes",
    newExcerpt: "Find out exactly what happens if you owe the IRS money. Explore your tax relief options to stop mounting penalties, avoid IRS collections, and regain control of your financial situation."
  },
  {
    oldTitle: "Can the IRS Freeze Your Bank Account?",
    newTitle: "Can the IRS Freeze Your Bank Account? Tax Levies Explained",
    newSlug: "can-irs-freeze-bank-account-levy",
    newExcerpt: "The IRS has the power to freeze your bank account for unpaid taxes. Learn how an IRS bank levy works, the warning signs, and crucial steps to release your funds and protect your money."
  },
  {
    oldTitle: "What Happens During an IRS Audit?",
    newTitle: "What Happens During an IRS Audit? A Step-by-Step Survival Guide",
    newSlug: "what-happens-during-irs-audit-process",
    newExcerpt: "Facing an IRS audit? Our step-by-step guide explains what to expect, the different types of tax audits, what documents you need, and how to navigate the audit process without panic."
  },
  {
    oldTitle: "What Investment Income Is Tax-Free?",
    newTitle: "What Investment Income Is Tax-Free? Top Tax-Exempt Strategies",
    newSlug: "tax-free-investment-income-strategies",
    newExcerpt: "Want to keep more of your earnings? Explore the best strategies for generating tax-free investment income, including municipal bonds, Roth IRAs, and Health Savings Accounts (HSAs)."
  },
  {
    oldTitle: "How Does Tax Loss Harvesting Work?",
    newTitle: "How Tax Loss Harvesting Works: Offset Gains & Lower Your Taxes",
    newSlug: "how-tax-loss-harvesting-works",
    newExcerpt: "Discover how tax loss harvesting can significantly reduce your tax bill. Learn the strategy of selling losing investments to offset capital gains and minimize your overall tax liability."
  },
  {
    oldTitle: "Do You Pay Taxes on ETFs?",
    newTitle: "How Are ETFs Taxed? Capital Gains & Dividend Tax Rules",
    newSlug: "do-you-pay-taxes-on-etfs",
    newExcerpt: "Do you pay taxes on Exchange-Traded Funds (ETFs)? Learn the essential ETF tax rules, including how capital gains, dividend distributions, and the creation/redemption process impact your taxes."
  },
  {
    oldTitle: "Long-Term vs Short-Term Capital Gains Tax",
    newTitle: "Long-Term vs. Short-Term Capital Gains Tax Rates Explained",
    newSlug: "long-term-vs-short-term-capital-gains-tax",
    newExcerpt: "Compare long-term vs. short-term capital gains tax rates to maximize your returns. Understand the holding periods and learn how strategic investing can drastically lower your tax burden."
  },
  {
    oldTitle: "How Are Dividends Taxed?",
    newTitle: "How Are Dividends Taxed? Qualified vs. Ordinary Dividend Rates",
    newSlug: "how-are-dividends-taxed",
    newExcerpt: "Not all dividends are taxed equally. Understand the critical difference between qualified and ordinary dividends, their respective tax rates, and how to optimize your dividend investing strategy."
  },
  {
    oldTitle: "Are Stablecoins Taxable?",
    newTitle: "Are Stablecoins Taxable? IRS Rules on USDC, USDT & Crypto Yield",
    newSlug: "are-stablecoins-taxable-irs-rules",
    newExcerpt: "Wondering if stablecoins like USDC or USDT are taxable? Learn how the IRS taxes stablecoin transactions, including earning yield, trading for other cryptos, and spending them on purchases."
  },
  {
    oldTitle: "What Happens If You Don't Report Crypto Gains?",
    newTitle: "What Happens If You Don't Report Crypto Taxes? IRS Penalties",
    newSlug: "failing-to-report-crypto-gains-penalties",
    newExcerpt: "Skipping crypto taxes is extremely risky. Understand the severe IRS penalties, the high risk of a tax audit, and the potential legal consequences if you fail to report your cryptocurrency gains."
  },
  {
    oldTitle: "How Are Crypto Losses Taxed?",
    newTitle: "How Are Crypto Losses Taxed? Deducting Crypto to Offset Gains",
    newSlug: "how-to-report-crypto-losses-taxes",
    newExcerpt: "Don't let your crypto losses go to waste. Discover how to accurately report cryptocurrency losses on your tax return to offset capital gains and reduce your overall ordinary income tax liability."
  },
  {
    oldTitle: "Do You Pay Taxes on Crypto if You Never Sell?",
    newTitle: "Do You Pay Taxes on Crypto if You Don't Sell? IRS Rules",
    newSlug: "taxes-on-crypto-without-selling",
    newExcerpt: "Holding crypto long-term? Learn the specific IRS tax rules for cryptocurrency investors and discover the scenarios where you might owe taxes even if you never sell or cash out your digital assets."
  },
  {
    oldTitle: "Do You Pay Taxes When Moving Crypto Between Wallets?",
    newTitle: "Are Wallet-to-Wallet Crypto Transfers Taxable? IRS Guidelines",
    newSlug: "taxes-moving-crypto-between-wallets",
    newExcerpt: "Do you pay taxes when moving crypto between your own wallets or exchanges? Find out how the IRS treats crypto transfers and how to avoid triggering accidental taxable events."
  },
  {
    oldTitle: "Does Overtime Count Toward Social Security Limits?",
    newTitle: "Does Overtime Count Toward the Social Security Wage Base Limit?",
    newSlug: "does-overtime-count-social-security-tax-limit",
    newExcerpt: "Maximize your take-home pay. Learn exactly how overtime pay impacts your Social Security tax limit (wage base) and what it means for your overall payroll tax deductions this year."
  }
];

function patchFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  
  updates.forEach(u => {
    // We want to replace the title and excerpt, and also add the slug if it's not there.
    // The line looks like: { title: "oldTitle", category: "something", excerpt: "oldExcerpt" }
    // We'll replace it with: { title: "newTitle", slug: "newSlug", category: "something", excerpt: "newExcerpt" }
    
    // Create a regex to match the exact object, with any category
    // This is safer since we know the structure
    
    // Instead of complex regex, let's just do simple replacements.
    // Replace title: "oldTitle" -> title: "newTitle", slug: "newSlug"
    content = content.replace(
      new RegExp(`title:\\s*"${u.oldTitle.replace(/[.*+?^$\\{\\}()|[\\]\\\\]/g, '\\\\$&')}"`, "g"),
      `title: "${u.newTitle}", slug: "${u.newSlug}"`
    );
    
    // Wait, the excerpt might have different spacing.
    // Actually, each article is on its own line in the files we saw.
  });
  
  // We need to also patch the excerpt for each title.
  // A better way is to parse line by line and replace
  const lines = content.split('\n');
  const patchedLines = lines.map(line => {
    let newLine = line;
    for (const u of updates) {
      if (newLine.includes(`title: "${u.newTitle}"`)) {
        // Now replace the excerpt
        newLine = newLine.replace(/excerpt: ".*?"/, `excerpt: "${u.newExcerpt}"`);
      }
    }
    return newLine;
  });
  
  content = patchedLines.join('\n');
  
  // Also we need to patch the slug logic in both files
  content = content.replace(
    /const slug = generateSlug\(article\.title\);/g,
    "const slug = (article as any).slug || generateSlug(article.title);"
  );
  content = content.replace(
    /slug: slugify\(a\.title\),/g,
    "slug: (a as any).slug || slugify(a.title),"
  );
  
  fs.writeFileSync(filePath, content);
  console.log(`✅ Patched ${filePath}`);
}

patchFile('src/app/admin/seed/page.tsx');
patchFile('scripts/seed_drafts.ts');
