// use timeout to prevent continuous keypress (toggle CKEditor source mode with hotkey)
var ckeSrcTimeout,
    ckeSrcTimeoutActive = false;

// Keyboard shortcuts for headings 1-6, p
(function () {
    CKEDITOR.plugins.add('keystrokes', {
        init: function (editor) {
            editor.addCommand('h1', {
                exec: function (editor) {
                    var format = {element: "h1"};
                    var style = new CKEDITOR.style(format);
                    style.apply(editor.document);
                }
            });
            editor.addCommand('h2', {
                exec: function (editor) {
                    var format = {element: "h2"};
                    var style = new CKEDITOR.style(format);
                    style.apply(editor.document);
                }
            });
            editor.addCommand('h3', {
                exec: function (editor) {
                    var format = {element: "h3"};
                    var style = new CKEDITOR.style(format);
                    style.apply(editor.document);
                }
            });
            editor.addCommand('h4', {
                exec: function (editor) {
                    var format = {element: "h4"};
                    var style = new CKEDITOR.style(format);
                    style.apply(editor.document);
                }
            });
            editor.addCommand('h5', {
                exec: function (editor) {
                    var format = {element: "h5"};
                    var style = new CKEDITOR.style(format);
                    style.apply(editor.document);
                }
            });
            editor.addCommand('h6', {
                exec: function (editor) {
                    var format = {element: "h6"};
                    var style = new CKEDITOR.style(format);
                    style.apply(editor.document);
                }
            });
            editor.addCommand('p', {
                exec: function (editor) {
                    var format = {element: "p"};
                    var style = new CKEDITOR.style(format);
                    style.apply(editor.document);
                }
            });
            editor.addCommand('n', {
                exec: function (editor) {
                    editor.execCommand('numberedlist');
                }
            });
            editor.addCommand('ns', {
                exec: function (editor) {
                    editor.execCommand('numberedListStyle');
                }
            });
            editor.addCommand('b', {
                exec: function (editor) {
                    editor.execCommand('bulletedlist');
                }
            });
            editor.addCommand('bs', {
                exec: function (editor) {
                    editor.execCommand('bulletedListStyle');
                }
            });
            editor.addCommand('u', {
                exec: function (editor) {
                    // editor.setMode( editor.mode == 'source' ? 'wysiwyg' : 'source' );
                    // note: codemirror requires manual editing of codemirror/plugin.js, set sourcearea editorFocus to true
                    editor.execCommand('source');
                    editor.focus();
                    setCKESrcToggleLock();
                }
            });

            editor.setKeystroke(CKEDITOR.ALT + 49, 'h1'); // ALT + 1
            editor.setKeystroke(CKEDITOR.ALT + 50, 'h2'); // ALT + 2
            editor.setKeystroke(CKEDITOR.ALT + 51, 'h3'); // ALT + 3
            editor.setKeystroke(CKEDITOR.ALT + 52, 'h4'); // ALT + 4
            editor.setKeystroke(CKEDITOR.ALT + 53, 'h5'); // ALT + 5
            editor.setKeystroke(CKEDITOR.ALT + 54, 'h6'); // ALT + 6
            editor.setKeystroke(CKEDITOR.ALT + 55, 'p'); // ALT + 7

            editor.setKeystroke(CKEDITOR.ALT + 78, 'n'); // ALT + n
            editor.setKeystroke(CKEDITOR.ALT + CKEDITOR.SHIFT + 78, 'ns'); // ALT + n

            editor.setKeystroke(CKEDITOR.ALT + 66, 'b'); // ALT + b
            editor.setKeystroke(CKEDITOR.ALT + CKEDITOR.SHIFT + 66, 'bs'); // ALT + b

            editor.setKeystroke(CKEDITOR.CTRL + CKEDITOR.SHIFT + 85, 'u'); // CTRL + SHIFT + u
        }
    });
})();


// manually restore ckeditor wysiwyg mode from source mode
$(document).on('keyup', '.InputfieldCKEditor', function (e) {

    var keyCode = e.keyCode || e.charCode;

    if (ckeSrcTimeoutActive) return true;

    if ((e.metaKey || e.ctrlKey) && e.shiftKey && keyCode == 85) { // CTRL + SHIFT + u

        e.preventDefault();
        e.stopImmediatePropagation();

        setCKESrcToggleLock();

        var instanceID = $(this).find('textarea.InputfieldCKEditorLoaded').attr('id'),
            instance = CKEDITOR.instances[instanceID];

        instance.fire('saveSnapshot');
        instance.execCommand('source');
        // CKEDITOR.instances[instanceID].execCommand('wysiwyg');

        return false;
    }
});

function setCKESrcToggleLock() {
    ckeSrcTimeoutActive = true;

    if (ckeSrcTimeout) clearTimeout(ckeSrcTimeout);

    ckeSrcTimeout = setTimeout(function () {
        ckeSrcTimeoutActive = false;
    }, 500);
}