import { visit } from 'unist-util-visit';

const PATTERN = /\{\{VERIFY:\s*([^}]+?)\s*\}\}/g;

/**
 * Turns {{VERIFY: some number}} in markdown into a highlighted <mark> so unconfirmed
 * figures are impossible to miss on the page and can never be mistaken for real data.
 */
export function remarkVerify() {
  return (tree) => {
    visit(tree, 'text', (node, index, parent) => {
      if (!parent || index === null) return;
      const value = node.value;
      PATTERN.lastIndex = 0;
      if (!PATTERN.test(value)) return;

      PATTERN.lastIndex = 0;
      const children = [];
      let cursor = 0;
      let match;

      while ((match = PATTERN.exec(value)) !== null) {
        if (match.index > cursor) {
          children.push({ type: 'text', value: value.slice(cursor, match.index) });
        }
        children.push({
          type: 'html',
          value: `<mark class="verify-token" title="Unconfirmed figure, pending verification">${escapeHtml(
            match[1]
          )}</mark>`,
        });
        cursor = match.index + match[0].length;
      }

      if (cursor < value.length) {
        children.push({ type: 'text', value: value.slice(cursor) });
      }

      parent.children.splice(index, 1, ...children);
      return index + children.length;
    });
  };
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
