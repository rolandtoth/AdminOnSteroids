$(document).on('ready reloaded wiretabclick', function (e) {

    var AOSsettings = AOSsettings || JSON.parse(ProcessWire.config.AdminOnSteroids),
        AAFsettings = AOSsettings.FocusInputOnLangTabSwitch,
        AAFsettingsCKE = AOSsettings.FocusInputOnLangTabSwitchCKE;

    $('.langTabs').on('tabsactivate', function (e, ui) {

        //e = e || window.event;

        var inputs = ui.newPanel.get(0).querySelectorAll('input, textarea');

        if (inputs.length) {

            var input = inputs[0],
                settings;

            if ($(input).hasClass('InputfieldCKEditorNormal')) {

                var ckeLoaded = false,
                    ckEditor_id = ui.newPanel.selector.replace('#langTab_', ''),
                    editor = CKEDITOR.instances[ckEditor_id];

                settings = AAFsettingsCKE;

                if (editor) {

                    if (input.getAttribute('data-cke-loaded') == "1") {
                        ckeLoaded = true;
                    } else {
                        input.setAttribute('data-cke-loaded', "1");
                    }

                    setTimeout(function () {

                        if (settings == "focus") {
                            // set focus - this also remembers previous cursor position
                            editor.focus();

                        } else if (settings == "moveEnd") {
                            // move cursor to end

                            editor.focus();
                            var element = editor.document.getBody();
                            var range = editor.createRange();
                            if (range) {
                                range.moveToElementEditablePosition(element, true);
                                range.select();
                            }

                            // select all
                        } else if (settings == "selectAll") {
                            editor.execCommand('selectAll');
                        }
                    }, ckeLoaded ? 0 : 300);
                }

            } else {
                // regular text input or textarea
                settings = AAFsettings;

                if (settings == "focus") {
                    // focus
                    input.focus();

                } else if (settings == "moveEnd") {
                    // move cursor at the end
                    input.focus();
                    input.selectionStart = input.selectionEnd = input.value.length;

                } else if (settings == "selectAll") {
                    // select all text on click
                    input.select();
                }
            }
        }
    });
});