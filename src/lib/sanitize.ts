import DOMPurify from 'isomorphic-dompurify';

export function sanitizeHtml(dirty: string): string {
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: [
      'section', 'h2', 'h3', 'p', 'strong', 'em', 'ul', 'ol', 'li',
      'div', 'span', 'table', 'thead', 'tbody', 'tr', 'th', 'td',
      'details', 'summary', 'a', 'br', 'img',
    ],
    ALLOWED_ATTR: [
      'class', 'id', 'href', 'src', 'alt', 'data-label', 'target', 'rel',
    ],
  });
}
