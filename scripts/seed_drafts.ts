import { PrismaClient } from '../src/generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

const prisma = new PrismaClient({ adapter: new PrismaPg(process.env.DATABASE_URL!) })

const articles = [
  // Personal Income Tax
  { title: "Does Overtime Count Toward Social Security Limits?", category: "personal-income-tax", excerpt: "Learn how overtime pay impacts your Social Security wage base limits and what it means for your tax deductions." },
  { title: "Why Is My Overtime Paycheck Less Than I Expected?", category: "personal-income-tax", excerpt: "Discover the tax withholding rules for overtime pay and why your bonus or extra hours might be taxed differently." },
  { title: "Does Overtime Push You Into a Higher Tax Bracket?", category: "personal-income-tax", excerpt: "Find out if earning overtime pay can push your income into a higher tax bracket and increase your overall tax liability." },
  { title: "Can Parents Claim Adult Children on Their Taxes?", category: "personal-income-tax", excerpt: "Understand the IRS rules for claiming adult children as dependents, including income limits and support requirements." },
  { title: "Do College Students Need to File a Tax Return?", category: "personal-income-tax", excerpt: "A complete guide on when college students are required to file taxes and how they might get a refund." },
  { title: "What Happens If You Forget to File Taxes?", category: "personal-income-tax", excerpt: "Learn about the consequences of missing the tax deadline, potential penalties, and how to file late." },
  { title: "Why Is My Tax Refund Lower Than Last Year?", category: "personal-income-tax", excerpt: "Explore common reasons why your tax refund might have decreased, from tax law changes to income adjustments." },
  { title: "How Does Filing Status Affect Your Taxes?", category: "personal-income-tax", excerpt: "Discover how choosing the right tax filing status can impact your standard deduction, tax brackets, and eligibility for credits." },
  { title: "What Income Is Not Taxable in the United States?", category: "personal-income-tax", excerpt: "Learn about the types of income that are exempt from federal taxes, including gifts, inheritances, and certain benefits." },
  { title: "Can You Change Your Filing Status After Filing?", category: "personal-income-tax", excerpt: "Find out if and how you can amend your tax return to change your filing status for better tax benefits." },

  // Freelancer & Small Business
  { title: "Can You Deduct Business Expenses Without an LLC?", category: "freelancer-small-business", excerpt: "Learn how sole proprietors and freelancers can legally deduct business expenses without forming an LLC." },
  { title: "Do Freelancers Need a Separate Bank Account?", category: "freelancer-small-business", excerpt: "Understand why having a separate business bank account is crucial for freelancers when managing finances and taxes." },
  { title: "What Happens If a Freelancer Doesn't Pay Quarterly Taxes?", category: "freelancer-small-business", excerpt: "Find out the penalties and consequences for self-employed individuals who miss their estimated quarterly tax payments." },
  { title: "Can You Write Off Internet Expenses for a Home Business?", category: "freelancer-small-business", excerpt: "Discover the IRS rules for deducting home internet costs as a business expense for freelancers and remote workers." },
  { title: "How Does Self-Employment Tax Work?", category: "freelancer-small-business", excerpt: "A simple guide explaining how the self-employment tax is calculated and what it covers for independent contractors." },
  { title: "Can You Deduct a Laptop for Business Use?", category: "freelancer-small-business", excerpt: "Learn how to write off the cost of a new laptop or computer used for your freelance business or side hustle." },
  { title: "LLC vs Sole Proprietorship for Taxes", category: "freelancer-small-business", excerpt: "Compare the tax implications, benefits, and drawbacks of running your business as an LLC versus a sole proprietorship." },
  { title: "What Receipts Should Freelancers Keep for Taxes?", category: "freelancer-small-business", excerpt: "Find out exactly which business receipts and records freelancers need to save for tax deductions and potential audits." },
  { title: "Can You Deduct a Home Office if You Rent?", category: "freelancer-small-business", excerpt: "Learn how renters can qualify for the home office deduction and write off a portion of their rent and utilities." },
  { title: "What Is the Most Overlooked Tax Deduction for Freelancers?", category: "freelancer-small-business", excerpt: "Discover hidden tax deductions that many self-employed professionals miss, helping you keep more of your earnings." },

  // Crypto & Investment Tax
  { title: "Do You Pay Taxes When Moving Crypto Between Wallets?", category: "crypto-investment", excerpt: "Find out if transferring cryptocurrency between your own wallets or exchanges triggers a taxable event." },
  { title: "Do You Pay Taxes on Crypto if You Never Sell?", category: "crypto-investment", excerpt: "Learn about the tax rules for holding cryptocurrency and when you might owe taxes without selling your assets." },
  { title: "How Are Crypto Losses Taxed?", category: "crypto-investment", excerpt: "Discover how to report cryptocurrency losses on your taxes to offset gains and reduce your overall tax liability." },
  { title: "What Happens If You Don't Report Crypto Gains?", category: "crypto-investment", excerpt: "Understand the risks, penalties, and potential IRS audits if you fail to report your cryptocurrency earnings." },
  { title: "Are Stablecoins Taxable?", category: "crypto-investment", excerpt: "Learn how the IRS taxes stablecoin transactions, including earning interest, trading, and spending." },
  { title: "How Are Dividends Taxed?", category: "crypto-investment", excerpt: "A guide to understanding the difference between qualified and ordinary dividends and their respective tax rates." },
  { title: "Long-Term vs Short-Term Capital Gains Tax", category: "crypto-investment", excerpt: "Compare the tax rates for long-term and short-term capital gains to optimize your investment strategy." },
  { title: "Do You Pay Taxes on ETFs?", category: "crypto-investment", excerpt: "Learn how Exchange-Traded Funds (ETFs) are taxed, including capital gains and dividend distributions." },
  { title: "How Does Tax Loss Harvesting Work?", category: "crypto-investment", excerpt: "Discover how to use tax-loss harvesting to sell losing investments and minimize your overall tax burden." },
  { title: "What Investment Income Is Tax-Free?", category: "crypto-investment", excerpt: "Explore investment strategies that generate tax-free income, such as municipal bonds and Roth IRAs." },

  // Tax Relief & Audits
  { title: "What Happens During an IRS Audit?", category: "tax-relief-audits", excerpt: "A step-by-step guide to what you can expect if your tax return is selected for an IRS audit." },
  { title: "Can the IRS Freeze Your Bank Account?", category: "tax-relief-audits", excerpt: "Learn under what circumstances the IRS can issue a bank levy and freeze your accounts for unpaid taxes." },
  { title: "What Happens If You Owe the IRS Money?", category: "tax-relief-audits", excerpt: "Find out your options and the potential consequences if you find yourself owing a tax debt to the IRS." },
  { title: "Can You Negotiate With the IRS?", category: "tax-relief-audits", excerpt: "Discover how programs like the Offer in Compromise allow you to settle your tax debt for less than the full amount owed." },
  { title: "How Does an IRS Payment Plan Work?", category: "tax-relief-audits", excerpt: "Learn how to set up an installment agreement with the IRS to pay off your tax debt over time." },
  { title: "What Is a Tax Lien?", category: "tax-relief-audits", excerpt: "Understand what a federal tax lien is, how it affects your credit, and the steps to get it released." },
  { title: "What Happens If You Ignore an IRS Letter?", category: "tax-relief-audits", excerpt: "Find out why ignoring IRS notices can lead to severe penalties, levies, and escalated collection actions." },
  { title: "Can IRS Penalties Be Removed?", category: "tax-relief-audits", excerpt: "Learn about penalty abatement and how you might qualify to have certain IRS penalties reduced or removed." },
  { title: "How Long Can the IRS Collect a Tax Debt?", category: "tax-relief-audits", excerpt: "Discover the IRS statute of limitations on collection and when your old tax debt might legally expire." },
  { title: "What Happens If You Can't Pay Your Taxes?", category: "tax-relief-audits", excerpt: "Explore your options when you can't afford to pay your tax bill, from payment plans to hardship statuses." }
]

function generateSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

function categorizeArticles() {
  const cats: Record<string, typeof articles> = {};
  for (const a of articles) {
    if (!cats[a.category]) cats[a.category] = [];
    cats[a.category].push(a);
  }
  return cats;
}

async function main() {
  const byCategory = categorizeArticles();
  const catOrder = Object.keys(byCategory);
  const maxLen = Math.max(...Object.values(byCategory).map(g => g.length));

  const interleaved: typeof articles = [];
  for (let i = 0; i < maxLen; i++) {
    for (const cat of catOrder) {
      if (i < byCategory[cat].length) {
        interleaved.push(byCategory[cat][i]);
      }
    }
  }

  const startDate = new Date('2026-01-01T12:00:00Z').getTime();
  const endDate = new Date('2026-10-01T12:00:00Z').getTime();
  const timeSpan = endDate - startDate;
  const interval = timeSpan / (interleaved.length - 1);

  console.log(`Starting to insert ${interleaved.length} draft articles (interleaved dates)...`);

  for (let i = 0; i < interleaved.length; i++) {
    const article = interleaved[i];
    const slug = generateSlug(article.title);
    const publishDate = new Date(startDate + interval * i);

    try {
      await prisma.article.create({
        data: {
          title: article.title,
          slug,
          category: article.category,
          excerpt: article.excerpt,
          content: '', // Empty content as requested
          published: false,
          publishDate: publishDate,
        },
      });
      console.log(`[${i+1}/${articles.length}] Inserted: ${article.title} (Date: ${publishDate.toISOString().split('T')[0]})`);
    } catch (e) {
      console.error(`Error inserting ${article.title}:`, e);
    }
  }

  console.log('Finished inserting drafts.');
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
