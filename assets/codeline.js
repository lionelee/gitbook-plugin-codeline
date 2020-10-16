require(['gitbook', 'jquery'], function (gitbook, $) {

    const TERMINAL_HOOK = '**[terminal]'

    var pluginConfig = {};
    var timeouts = {};

    function addCopyButton(div) {
        div.parent().append(
            $('<i class="fa fa-clone t-copy"></i>')
                .click(function () {
                    copyCommand($(this));
                })
        );
    }

    function copyCommand(button) {
        pre = button.parent();
        textarea = $('#code-textarea');
        textarea.val(pre.text());
        textarea.focus();
        textarea.select();
        document.execCommand('copy');
        pre.focus();
        updateCopyButton(button);
    }

    function format_code_block(block) {
        code = block.children('code');
        lines = code.html().split('\n');

        if (lines[lines.length - 1] == '') {
            lines.splice(-1, 1);
        }

        var newlines = new Array()
        if (lines.length > 1) {
            for (i = 0, len = lines.length; i < len; i++) {
                if (lines[i].indexOf('<') === 0) {
                    var line = lines[i]
                    console.log(line)
                    var number = line.match(/^(<span class="hljs-number">\d+<\/span>)/)
                    var end = line.match(/(<span class="hljs-comment">.*<\/span>)$/)
                    if (end == null) {
                        line += '</span>'
                    }
                    if (number != null) {
                        newlines.push(number[0].replace(/hljs-number/, 'code-line')
                            + line.slice(number[0].length))
                    } else {
                        newlines.push(line)
                    }
                } else {
                    console.log(lines[i])
                    n = lines[i].split(' ')[0]
                    newlines.push('<span class="code-line">' + n + '</span>'
                        + '<span class="hljs-comment">' + lines[i].slice(n.length) + '</span>')
                }
            }
            code.html(newlines.join('\n'));
        }
    }

    function updateCopyButton(button) {
        id = button.attr('data-command');
        button.removeClass('fa-clone').addClass('fa-check');

        // Clear timeout
        if (id in timeouts) {
            clearTimeout(timeouts[id]);
        }
        timeouts[id] = window.setTimeout(function () {
            button.removeClass('fa-check').addClass('fa-clone');
        }, 1000);
    }

    gitbook.events.bind('start', function (e, config) {
        pluginConfig = config.codeline;

        if (pluginConfig.copyButtons) {
            $('body').append('<textarea id="code-textarea" />');
        }
    });

    gitbook.events.bind('page.change', function () {
        $('pre').each(function () {
            format_code_block($(this))
            if (pluginConfig.copyButtons) {
                addCopyButton($(this))
            }
        });
    });
});