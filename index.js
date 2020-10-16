var escape = require('escape-html');

function format_code_block(block) {
  lines = escape(block.body).split('\r\n');

  if (lines[lines.length - 1] == '') {
    lines.splice(-1, 1);
  }

  if (lines.length > 1) {
    startnum = block.kwargs.startnum
    lines = lines.map(line => (startnum++) + ' ' + line)
  }

  return '<div class="code-wrapper"><pre><code class="lang-' + block.kwargs.lang + '">' + lines.join('\n') + '</code></pre></div>';
}

module.exports = {
  website: {
    assets: './assets',
    js: [
      'codeline.js'
    ],
    css: [
      'codeline.css'
    ]
  },
  blocks: {
    codeline: function (block) {
      return format_code_block(block);
    }
  }
};
