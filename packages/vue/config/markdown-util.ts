import hljs from 'highlight.js'
import MarkdownIt from 'markdown-it';
import MarkdownItAnchor from 'markdown-it-anchor';

const markdown = MarkdownIt({
    breaks: true,
    html: true,
    highlight: function (str, lang) {
        if (!(lang && hljs.getLanguage(lang))) {
            return '';
        }
    
        return hljs.highlight(lang, str, true).value;
    },
});


markdown.use(MarkdownItAnchor)

export default markdown;

