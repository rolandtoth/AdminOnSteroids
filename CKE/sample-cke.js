CKEDITOR.editorConfig = function (config) {

    // use instance.name to check current field
    var instance = this;

    // config.skin = 'lightwire' + ',' + aosUrl + 'CKE/skins/' + 'lightwire' + '/';

    // settings for 'body' field, any language
    // if (instance.name.indexOf('Inputfield_body') !== -1) {
    //     config.autoGrow_bottomSpace = 100;
    // }

    // settings for 'body' field, specific language
    // if (instance.name == 'Inputfield_body__1022') {
    //     config.autoGrow_bottomSpace = 200;
    // }

    //config.autoGrow_onStartup = true;
    //config.autoGrow_bottomSpace = 20;

    config.codemirror = {

        // Set this to the theme you wish to use (codemirror themes)
        // theme: 'base16-light',
        // theme: 'lesser-dark',
        theme: 'paraiso-light',
        // theme: 'yeti',

        // Whether or not you want to show line numbers
        lineNumbers: true,

        // Whether or not you want to use line wrapping
        lineWrapping: true,

        // Whether or not you want to highlight matching braces
        matchBrackets: true,

        // Whether or not you want to highlight matching tags
        matchTags: true,

        // Whether or not you want tags to automatically close themselves
        autoCloseTags: true,

        // Whether or not you want Brackets to automatically close themselves
        autoCloseBrackets: true,

        // Whether or not to enable search tools, CTRL+F (Find), CTRL+SHIFT+F (Replace), CTRL+SHIFT+R (Replace All), CTRL+G (Find Next), CTRL+SHIFT+G (Find Previous)
        enableSearchTools: true,

        // Whether or not you wish to enable code folding (requires 'lineNumbers' to be set to 'true')
        enableCodeFolding: true,

        // Whether or not to enable code formatting
        enableCodeFormatting: true,

        // Whether or not to automatically format code should be done when the editor is loaded
        autoFormatOnStart: true,

        // Whether or not to automatically format code which has just been uncommented
        autoFormatOnUncomment: true,

        // Whether or not to highlight the currently active line
        highlightActiveLine: true,

        // Whether or not to highlight all matches of current word/selection
        highlightMatches: true,

        // Define the language specific mode 'htmlmixed' for html  including (css, xml, javascript), 'application/x-httpd-php' for php mode including html, or 'text/javascript' for using java script only
        mode: 'htmlmixed',

        // Whether or not to show the search Code button on the toolbar
        showSearchButton: true,

        // Whether or not to show Trailing Spaces
        showTrailingSpace: true,

        // Whether or not to show the format button on the toolbar
        showFormatButton: true,

        // Whether or not to show the comment button on the toolbar
        showCommentButton: true,

        // Whether or not to show the uncomment button on the toolbar
        showUncommentButton: true,

        // Whether or not to show the showAutoCompleteButton button on the toolbar
        showAutoCompleteButton: true
    };
};
