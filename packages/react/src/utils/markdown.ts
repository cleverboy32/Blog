import { Marked, Tokens } from "marked";
import { markedHighlight } from "marked-highlight";
import hljs from 'highlight.js';



const options = markedHighlight({
    emptyLangClass: 'hljs',
    langPrefix: 'hljs language-',
    highlight(code, lang) {
        if (!lang) {
            lang = hljs.highlightAuto(code).language ?? '';
            console.log(lang, '11')
        }
        const language = hljs.getLanguage(lang) ? lang : 'plaintext';

        console.log(language)
        return hljs.highlight(code, { language }).value;
    }
});

const renderer = options.renderer ?? {};
renderer.code = (code: Tokens.Code) => {
    return `<pre><code class="hljs" style="word-break: break-word; white-space: pre-line">${code.text}</code></pre>`;
}


const marked = new Marked(options);
export { marked }


