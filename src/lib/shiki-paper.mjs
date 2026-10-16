/**
 * "Paper" syntax themes for Shiki, used by markdown code fences and the
 * CodeWorkbench. Light is ink on cream; dark is warm charcoal. Both stay inside
 * the site palette (cobalt, orange, lime-green, lavender, magenta ink).
 */

const scopes = (c) => [
  { scope: ['comment', 'punctuation.definition.comment'], settings: { foreground: c.comment, fontStyle: 'italic' } },
  { scope: ['string', 'string.quoted', 'string.template', 'punctuation.definition.string'], settings: { foreground: c.string } },
  { scope: ['constant.numeric', 'constant.language', 'constant.character', 'support.constant'], settings: { foreground: c.number } },
  { scope: ['keyword', 'storage', 'storage.type', 'storage.modifier', 'keyword.control', 'keyword.operator.new', 'keyword.operator.expression'], settings: { foreground: c.keyword } },
  { scope: ['entity.name.function', 'support.function', 'meta.function-call entity.name.function', 'variable.function'], settings: { foreground: c.fn } },
  { scope: ['entity.name.type', 'entity.name.class', 'support.type', 'support.class', 'entity.other.inherited-class', 'storage.type.primitive'], settings: { foreground: c.type } },
  { scope: ['variable.other.property', 'meta.object-literal.key', 'support.type.property-name', 'entity.other.attribute-name', 'variable.other.object.property'], settings: { foreground: c.prop } },
  { scope: ['entity.name.tag', 'meta.tag'], settings: { foreground: c.keyword } },
  { scope: ['variable.parameter'], settings: { foreground: c.param } },
  { scope: ['keyword.operator', 'punctuation', 'meta.brace'], settings: { foreground: c.punct } },
  { scope: ['markup.heading', 'entity.name.section'], settings: { foreground: c.type, fontStyle: 'bold' } },
  { scope: ['markup.inserted'], settings: { foreground: c.string } },
  { scope: ['markup.deleted'], settings: { foreground: c.number } },
];

/** @type {import('shiki').ThemeRegistration} */
export const paperLight = {
  name: 'paper-light',
  type: 'light',
  colors: { 'editor.background': '#fffcf6', 'editor.foreground': '#2c2925' },
  tokenColors: scopes({
    comment: '#8a8275',
    string: '#3d7a16',
    number: '#c24a12',
    keyword: '#b5338a',
    fn: '#6a44cc',
    type: '#2547d6',
    prop: '#0f766e',
    param: '#a84115',
    punct: '#68645e',
  }),
};

/** @type {import('shiki').ThemeRegistration} */
export const paperDark = {
  name: 'paper-dark',
  type: 'dark',
  colors: { 'editor.background': '#1d1b18', 'editor.foreground': '#ece6da' },
  tokenColors: scopes({
    comment: '#8a8275',
    string: '#b5e08a',
    number: '#ffa97e',
    keyword: '#ff9ac1',
    fn: '#c9b6ff',
    type: '#97abff',
    prop: '#7fd6c2',
    param: '#ffcbb0',
    punct: '#a39b8e',
  }),
};

/** Carries ```lang title="file.ts" through to the HTML as data-title. */
export const titleTransformer = {
  name: 'paper-title',
  pre(node) {
    const raw = this.options.meta?.__raw ?? '';
    const m = raw.match(/title=["']([^"']+)["']/);
    if (m) node.properties['data-title'] = m[1];
  },
};
