import { Marked, RendererObject, Tokens, Renderer } from 'marked';
import { markedHighlight } from 'marked-highlight';
import hljs from 'highlight.js';

import html2pdf from 'html2pdf.js';

const options = markedHighlight({
    emptyLangClass: 'hljs',
    langPrefix: 'hljs language-',
    highlight(code, lang) {
        if (!lang) {
            lang = hljs.highlightAuto(code).language ?? '';
        }
        const language = hljs.getLanguage(lang) ? lang : 'plaintext';

        return hljs.highlight(code, { language }).value;
    },
});
const renderer = { } as RendererObject;
const extendRenderer = new Renderer();

console.log(extendRenderer.heading);

renderer.blockquote = function (text) {

    if (typeof text !== 'string') {
        const body = this.parser.parse(text.tokens);
        return `<blockquote class="marked-blockquote">\n${body}</blockquote>\n`;
    }

    return `<blockquote class="marked-blockquote">${text}</blockquote>`;
};

// renderer.code = function (this, { lang, escaped }: Tokens.Code) {
//     return `<pre><code class="marked-code" lang="${lang}">${escaped}</code></pre>`;
// };

// renderer.html = function (html) {
//     return `<div class="marked-html">${html}</div>`;
// };

renderer.heading = function (this, heading) {
    const { depth, tokens } = heading;
    return `<h${depth} class="marked-heading">${this.parser.parseInline(tokens)}</h${depth}>`;
};

renderer.hr = function () {
    return `<hr class="marked-hr" />`;
};

renderer.list = function (this, token) {
    const { items, ordered, start } = token;
    const type = ordered ? 'ol' : 'ul';
    return `<${type} class="marked-list" start="${start}">${items.map((item) => this.listitem(item)).join('')}</${type}>`;
};

// renderer.listitem = function ({ text }) {
//     return `<li class="marked-listitem">${text}</li>`;
// };

// Inline elements
// renderer.strong = function (text) {
//     return `<strong class="marked-strong">${text}</strong>`;
// };

// renderer.paragraph = function ({ text, tokens }) {
//     console.log(tokens, text);
//     if (tokens[0].type === 'text') {
//         return `<p class="marked-paragraph">${text}</p>`;
//     }

//     else {
//         return `<p class="marked-paragraph"><${tokens[0].type}>${(tokens[0] as any)?.text}</${tokens[0].type}></p>`;
//     }
// };


// renderer.table = function (this, token) {
//     const { header, rows } = token;
//     return `<table class="marked-table"><thead>${header}</thead><tbody>${rows}</tbody></table>`;
// };

// renderer.tablerow = function (content) {
//     return `<tr class="marked-tablerow">${content}</tr>`;
// };

// renderer.tablecell = function (this, token) {
//     const { text, tokens } = token;
//     return `<td class="marked-table-cell"${tokens}>${text}</td>`;
// };



// renderer.em = function (text) {
//     return `<em class="marked-em">${text}</em>`;
// };

// renderer.codespan = function (code) {
//     return `<code class="marked-codespan">${code}</code>`;
// };

// renderer.br = function () {
//     return `<br class="marked-br"/>`;
// };

// renderer.del = function (text) {
//     return `<del class="marked-del">${text}</del>`;
// };

// renderer.link = function (this, link) {
//     const { href, title, text } = link;
//     return `<a href="${href}" title="${title}">${text}</a>`;
// };

// renderer.image = function (this, image) {
//     const { href, title, text } = image;
//     return `<img src="${href}" title="${title}" alt="${text}">`;
// };

// renderer.text = function (text) {
//     return `<span class="marked-text">${text}</span>`;
// };

renderer.code = (code: Tokens.Code) => {
    return `<pre><code class="hljs">${code.text}</code></pre>`;
};

const marked = new Marked(options);
marked.use({ renderer, ...markedHighlight });

export { marked };

export const mergePdfOption = (options: any = {}) => {
    return {
        margin: [0, 0],
        filename: options?.filename?.split('.')?.[0] ?? 'file',
        image: { type: 'jpeg', quality: 1 },
        html2canvas: { scale: window.devicePixelRatio },
        jsPDF: {
            unit: 'mm',
            format: options?.format ?? 'a4',
            orientation: 'portrait',
        },
        pagebreak: { mode: ['css', 'legacy'] },
    };
};

export const previewMDPdf = (html: string, pdfOption: any): Promise<string> => {
    return new Promise((resolve) => {
        html2pdf()
            .set(pdfOption)
            .from(`<div class="marked-container">${html}</div>`)
            .outputImg('datauristring')
            .then(function (uri: string) {
                resolve(uri);
            });
    });
};

export const savePdf = (html: string, pdfOption: any) => {
    html2pdf().set(pdfOption).from(`<div class="marked-container">${html}</div>`).save();
};
