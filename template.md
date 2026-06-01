# TaxExpertsHub Article Component Template

Use this guide to generate article HTML for TaxExpertsHub. Every component below is styled via CSS — just use the exact class names and HTML structure.

---

## 1. Article Structure (wraps everything)

This is generated automatically by the page — do NOT include it in the article body HTML. The body HTML goes inside `.article-content` as raw `dangerouslySetInnerHTML`.

---

## 2. Standard Section

Use for most content sections. Every section must be wrapped in `<section>`.

```html
<section>
  <h2>Section Title Here</h2>
  <p>
    Paragraph text here. Use <strong>bold</strong> for emphasis on key terms.
  </p>

  <h3>Subsection Title (if needed)</h3>
  <p>
    More text here.
  </p>

  <ul>
    <li><strong>Bold label:</strong> Description text here.</li>
    <li><strong>Another label:</strong> Description text here.</li>
  </ul>

  <ol>
    <li><strong>First step.</strong> Explanation here.</li>
    <li><strong>Second step.</strong> Explanation here.</li>
  </ol>
</section>
```

### Typography rules
- **H2**: 28px, Inter 700, navy `#071A52`, margin-top 64px, margin-bottom 24px
- **H3**: 20px, Inter 600, navy `#071A52`, margin-top 40px, margin-bottom 16px
- **Body**: 18px, Inter, line-height 1.85, color `var(--foreground)`
- **Strong**: `color: var(--navy)` (inside light backgrounds)
- **Max content width**: 900px (applied automatically)

---

## 3. Key Takeaway Box (gold accent, top of article)

Use ONCE at the top of the article to summarize the main answer.

```html
<section class="key-box">
  <h2>Key takeaway</h2>
  <p>
    Overtime pay is <strong>not taxed at a higher rate</strong> than regular income. Summary of the main point here.
  </p>
</section>
```

**Style**: gold-tinted background, gold left border, 16px border-radius, 28px padding.

---

## 4. Step Cards (numbered grid, 3 columns)

Use for step-by-step processes or numbered lists of strategies.

```html
<section>
  <h2>Section Title for Steps</h2>
  <p>Intro paragraph explaining the steps.</p>

  <div class="step-grid">
    <div class="info-card">
      <span class="card-number">1</span>
      <h3>Step title here.</h3>
      <p>Description of this step. Keep it concise but informative.</p>
    </div>

    <div class="info-card">
      <span class="card-number">2</span>
      <h3>Step title here.</h3>
      <p>Description of this step.</p>
    </div>

    <div class="info-card">
      <span class="card-number">3</span>
      <h3>Step title here.</h3>
      <p>Description of this step.</p>
    </div>
  </div>
</section>
```

**Grid**: 1 col mobile → 2 col tablet → 3 col desktop.
**Card**: white bg, 16px radius, 24px padding, 220px min-height, subtle shadow.

---

## 5. Reason / Comparison Cards (unlabeled grid, 3 columns)

Use for "why" reasons, causes, or comparison points (no numbers).

```html
<section>
  <h2>Section Title</h2>

  <div class="reason-grid">
    <div class="info-card">
      <h3>Reason title here.</h3>
      <p>Explanation of this reason or factor.</p>
    </div>

    <div class="info-card">
      <h3>Another reason.</h3>
      <p>Explanation here.</p>
    </div>

    <div class="info-card">
      <h3>Third reason.</h3>
      <p>Explanation here.</p>
    </div>
  </div>
</section>
```

Same grid/card styling as step-grid but without `.card-number`.

---

## 6. Tables (premium, fixed layout, no scroll)

Use for data-heavy comparisons, bracket tables, scenario comparisons.

**IMPORTANT**: Each `<td>` MUST have a `data-label` attribute matching its column header for mobile card layout. Always include the `<thead>` with proper headers.

```html
<section>
  <h2>Table Title</h2>
  <p>Intro paragraph explaining the table.</p>

  <div class="table-wrapper">
    <table>
      <thead>
        <tr>
          <th>Header 1</th>
          <th>Header 2</th>
          <th>Header 3</th>
          <th>Header 4</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td data-label="Header 1">Value 1</td>
          <td data-label="Header 2">Value 2</td>
          <td data-label="Header 3">Value 3</td>
          <td data-label="Header 4">Value 4</td>
        </tr>
        <tr>
          <td data-label="Header 1">Value 1</td>
          <td data-label="Header 2">Value 2</td>
          <td data-label="Header 3">Value 3</td>
          <td data-label="Header 4">Value 4</td>
        </tr>
      </tbody>
    </table>
  </div>

  <p class="source-note">Source: Citation here. Figures are estimates for illustration only.</p>
</section>
```

**Style**: navy header, white bg, 16px radius, `table-layout: fixed`, cells wrap text.
**Mobile**: transforms each row into a stacked card (labels shown via `data-label`).

---

## 7. Highlight Box (navy-tinted insight)

Use for key insights, "what this tells us" sections, or important callouts within a section.

```html
<div class="highlight-box">
  <h3>What this tells us</h3>
  <p>
    Key insight or conclusion here. <strong>Bold text</strong> for emphasis works.
  </p>
</div>
```

**Style**: light navy tint background, 16px radius, 28px padding, subtle border.

---

## 8. FAQ Accordion (collapsible cards)

Use for Frequently Asked Questions. Each `<details>` is inside `<div class="faq-list">`.

```html
<section>
  <h2>Frequently Asked Questions</h2>

  <div class="faq-list">
    <details>
      <summary>Question text here?</summary>
      <p>Answer text here. Can include <strong>bold</strong> and links.</p>
    </details>

    <details>
      <summary>Another question here?</summary>
      <p>Answer text here.</p>
    </details>
  </div>
</section>
```

**Style**: white card, navy 16px 14px radius, 22px padding, chevron arrow on right.
**Do NOT**: add raw text with triangle bullets or plain `<p>` FAQ items.

---

## 9. Bottom Line / Conclusion (dark navy box)

Use ONCE at the very end of the article as the final conclusion.

```html
<section class="bottom-line">
  <h2>The Bottom Line</h2>
  <p>
    Concluding text here. <strong>Bold text</strong> becomes gold (#F4C15D). Links become gold.
    Normal text is white at 92% opacity.
  </p>
</section>
```

**Style**: dark navy bg, 18px radius, 32px padding, gold accents for bold/link text.

---

## 10. Content Rules Summary

| Component | When to use | Key classes |
|-----------|-------------|-------------|
| Standard section | General content with h2/h3/p/lists | `<section>` |
| Key takeaway | Top of article, main answer | `class="key-box"` |
| Step cards | Numbered processes (3 items) | `class="step-grid"` + `class="info-card"` + `class="card-number"` |
| Reason cards | Unlabeled comparisons (3 items) | `class="reason-grid"` + `class="info-card"` |
| Table | Data comparison, brackets, scenarios | `class="table-wrapper"`, `data-label=""` on each td |
| Highlight box | Key insight inside a section | `class="highlight-box"` |
| FAQ | Q&A section | `class="faq-list"` + `<details><summary>` |
| Bottom line | Article conclusion | `class="bottom-line"` |
| Source note | Below tables | `class="source-note"` |

### Writing Guidelines for SEO

- **Article length**: 2,000–2,500 words minimum
- **H2 sections**: 5–8 per article (including FAQ and Bottom Line)
- **Tables**: 2–3 per article minimum
- **Cards (step/reason)**: 1–2 grids per article
- **Key takeaway**: Always present at the top
- **FAQ**: 5–8 questions minimum
- **Bottom line**: Always present at the end
- **Target keyword**: Use in H2, first paragraph, FAQ questions, and Bottom Line
- **Internal links**: Link to other TaxExpertsHub articles where relevant
- **External links**: Link to authoritative sources (IRS.gov, etc.) in source notes

### General HTML Rules

- Use `<strong>` for bold/key terms (never `<b>` as standalone)
- Use `<em>` for italics sparingly
- All table cells MUST have `data-label` matching the column header
- Never use inline styles — all styling is in CSS classes
- Each section must be wrapped in `<section>` (except highlight-box which is `<div>`)
- FAQ items must use `<details><summary>` — never plain text or bullet lists
