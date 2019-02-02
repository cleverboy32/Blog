
var hljs = require('highlight.js');

var markdown = require('markdown-it')({
    preset: 'default',
    breaks: true,
    html: true,
    highlight: function (str, lang) {
        if (!(lang && hljs.getLanguage(lang))) {
            return '';
        }
    
        return hljs.highlight(lang, str, true).value;
    }
});

markdown.use(require('markdown-it-anchor'))

module.exports = markdown;