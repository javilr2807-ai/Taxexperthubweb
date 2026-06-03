import OpenAI from 'openai';

export async function generateArticleContent(title: string, excerpt: string): Promise<string> {
  const openai = new OpenAI({
    baseURL: 'https://api.deepseek.com',
    apiKey: process.env.DEEPSEEK_API_KEY || 'dummy_key_for_build', // Fallback to prevent build errors if env var is missing during build
  });

  const systemPrompt = `You are an expert, professional tax and financial writer for TaxExpertsHub.
Your task is to write a highly detailed, SEO-optimized article on the given topic. The article MUST be written entirely in English.

You MUST format your output strictly as raw HTML, following these exact rules:
1. Do NOT output a <html> or <body> tag. Your output will be injected inside a <div class="article-content">.
2. Every major section must be wrapped in <section>.
3. Start the article with exactly this structure:
   <section class="key-box">
     <h2>Key takeaway</h2>
     <p>Summarize the main answer here. Use <strong>bold</strong> for emphasis.</p>
   </section>
4. Use standard <section> for body paragraphs, wrapped in <p> tags.
5. Use <h2> and <h3> for headings. Do NOT use <h1>. Ensure headings are rich in LSI (Latent Semantic Indexing) keywords for SEO.
6. Include at least ONE table using this exact structure:
   <div class="table-wrapper">
     <table>
       <thead><tr><th>...</th></tr></thead>
       <tbody><tr><td data-label="Header Name">...</td></tr></tbody>
     </table>
   </div>
   <p class="source-note">Source: ...</p>
   CRITICAL: Every <td> MUST have a data-label attribute that exactly matches its column header.
7. Include at least ONE highlight box:
   <div class="highlight-box">
     <h3>What this tells us</h3>
     <p>Insight here...</p>
   </div>
8. Include at least ONE grid (either step-grid or reason-grid):
   <div class="reason-grid">
     <div class="info-card"><h3>Reason</h3><p>Text</p></div>
   </div>
9. Include an FAQ section at the end (before conclusion) using Schema.org friendly formatting (clear Q&A structure):
   <section>
     <h2>Frequently Asked Questions</h2>
     <div class="faq-list">
       <details><summary>Question 1?</summary><p>Answer 1</p></details>
     </div>
   </section>
10. The very last section MUST be:
    <section class="bottom-line">
      <h2>The Bottom Line</h2>
      <p>Conclusion text here...</p>
    </section>

Do not include any markdown code block formatting (like \`\`\`html) around your response. Just return the raw HTML.
Ensure the content is comprehensive, authoritative, perfectly answers the user intent behind the title, and follows strict On-Page SEO guidelines.`;

  const userPrompt = `Please write the full article in ENGLISH.
Title: ${title}
Excerpt/Summary to expand on: ${excerpt}

CRITICAL REQUIREMENTS:
- The article MUST be written entirely in English.
- The article MUST be highly optimized for SEO, targeting search intent for the title.
- The article MUST contain a minimum of 2000 words. Expand deeply on tax rules, exceptions, real-world examples, and step-by-step guidance to reach the word count naturally.
- Strictly follow the HTML formatting rules provided.`;

  const response = await openai.chat.completions.create({
    model: 'deepseek-chat',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt }
    ],
    temperature: 0.7,
    max_tokens: 6000,
  });

  return response.choices[0].message.content || '';
}
