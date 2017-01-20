$(document).ready(function () {

    // $('body').removeClass('aos_saving');
    // $('#wrap, body.AdminThemeDefault #content').removeClass('ui-state-disabled');
    //
    // if (window.frameElement) {
    //     $('body', window.parent.document).removeClass('aos_saving');
    //     $('#wrap, body.AdminThemeDefault #content', window.parent.document).removeClass('ui-state-disabled');
    // }

    var AOSsettings = AOSsettings || JSON.parse(ProcessWire.config.AdminOnSteroids),
        HotkeysSettings = AOSsettings.Hotkeys,
        BreadcrumbsSettings = ProcessWire.config.AOS_breadcrumbs;

    // on ESC close PW panels
    $(document).on('keydown', function (e) {

        // button is located outside the iframe
        var panelCloseBtn = $('.pw-panel-container-open a.pw-panel-button-open', window.parent.document);

        if (panelCloseBtn.length) {

            var keyCode = e.keyCode || e.charCode;

            if (keyCode === 27) {  // ESC
                e.preventDefault();
                panelCloseBtn.get(0).click();
                // put back focus to main document for other hotkeys
                window.parent.document.body.focus();
                return false;
            }
        }
    });


    // focus filterbox on alt+s
    if (HotkeysSettings.indexOf('filterboxHotkey') !== -1) {

        $(document).on('keydown', function (e) {

            // note: html also has class "filterbox"
            var filterbox = $('html .filterbox');

            if (filterbox.length) {

                var keyCode = e.keyCode || e.charCode;

                if (e.altKey && keyCode === 83) {  // S
                    e.preventDefault();
                    filterbox.find('input').focus();
                    return false;
                }
            }
        });
    }


    // alt+o to open page tree panel
    if (HotkeysSettings.indexOf('addPageTreeTrigger') !== -1) {

        setupCKEpageTreeTrigger();

        $(document).on('keydown', function (e) {

            var keyCode = e.keyCode || e.charCode,
                pageTreePanelSelector = 'a.pw-panel[data-tab-icon="sitemap"]',  // no better selector than data-tab-icon
                pageTreePanelBtn = $(pageTreePanelSelector);

            // if panel is focused, the trigger button is outside the iframe
            if (pageTreePanelBtn.length === 0) {
                pageTreePanelBtn = $(pageTreePanelSelector, window.parent.document);
            }

            if (pageTreePanelBtn.length) {
                if (e.altKey && keyCode === 79) {   // alt+o
                    aos_togglePageTreePanel();
                }
            }

            function aos_togglePageTreePanel() {

                // triggering the button twices toggles state
                pageTreePanelBtn.get(0).click();

                return false;
            }
        });
    }


    if (HotkeysSettings.indexOf('removeNoticeHotkey')) {

        function removeNoticeHotkey(e) {

            var keyCode = e.keyCode || e.charCode;

            // always remove event because only first keydown should trigger the notice removal
            $(document).off('keydown', removeNoticeHotkey);

            if (keyCode === 27) {
                if ($('a.notice-remove').length) {
                    $('a.notice-remove').first().trigger('click');
                    return false;
                }
            }

            return true;
        }

        if ($('a.notice-remove').length) {
            $(document).on('keydown', removeNoticeHotkey);
        }
    }


    if (HotkeysSettings.indexOf('breadcrumbTweaks') && BreadcrumbsSettings) {

        // add "data-*" markups
        // skip first item in Default admin theme (.pw-panel)
        // skip debug (href #, default theme)
        $('#breadcrumbs a:not(.pw-panel):not([href="#"])').each(function (i) {

            // Default admin theme has an extra element in the beginning of the breadcrumb
            if (!BreadcrumbsSettings[i]) {
                return true;    // = continue
            }

            if (BreadcrumbsSettings[i]['url']) {
                $(this).attr('data-url', BreadcrumbsSettings[i]['url']);
            }
            if (BreadcrumbsSettings[i]['editUrl']) {
                $(this).attr('data-editurl', BreadcrumbsSettings[i]['editUrl']);
            }
        });

        $('#breadcrumbs').on('longclick', 'a', function (e) {
            if ($(this).attr('data-url')) {
                e.preventDefault();
                var url = $(this).attr('data-url');
                window.open(url);
            }
        });

        $('#breadcrumbs').on('click', 'a', function (e) {
            if ((e.metaKey || e.ctrlKey) && $(this).attr('data-editurl')) {
                e.preventDefault();
                var url = $(this).attr('data-editurl');
                window.location = url;
            }
        });
    }


    function getSaveButton() {

        var aos_saveButton = false;

        if (window.frameElement) {

            // in iframe
            aos_saveButton = $('.ui-dialog-buttonset button[role="button"]', window.parent.document).eq(0);

        } else {

            aos_saveButton = $('form.InputfieldForm').find('button[type="submit"]')
                .filter('.aos_hotkeySave, form#ProcessTemplateAdd #Inputfield_submit, #submit_publish, #Inputfield_submit_save, #submit_save, #ProcessTemplateEdit #Inputfield_submit, #Inputfield_submit_save_field, #Inputfield_submit_save_module, #submit_save_profile, #save_translations')
                .eq(0);

            // modal opened, but controls have focus (outside the iframe)
            if (aos_saveButton.length === 0) {
                aos_saveButton = $('.ui-dialog-buttonset button[role="button"]').eq(0);
            }
        }

        return aos_saveButton;
    }


    function aos_triggerSave() {

        // return if there's an open cke dialog (eg. Source)
        if ($('.cke_dialog:visible').length) {
            if ($('.cke_dialog:visible').find('.cke_dialog_ui_button_ok').length) {
                aos_saveButton = $('.cke_dialog:visible').find('.cke_dialog_ui_button_ok').first().get(0).click();
                return false;
            }
        }

        var aos_saveButton = getSaveButton();

        if (aos_saveButton.length) {

            var context = $('html');

            if ($('iframe.pw-modal-window', window.parent.document).length) {
                context = $('iframe.pw-modal-window', window.parent.document).contents().find('html');
            }

            // these are removed on document ready
            $('body', context).addClass('aos_saving');
            $('#wrap, body.AdminThemeDefault #content', context).addClass('ui-state-disabled');

            aos_saveButton.addClass('ui-state-disabled').focus();

            // IE fix
            setTimeout(function () {
                aos_saveButton.click();
            }, 100);
        }
    }


    function setupCKESave() {
        if (window.CKEDITOR) {
            CKEDITOR.on('instanceReady', function (evt) {

                evt.editor.addCommand('saveCKECommand', {
                    exec: function (editor, data) {
                        aos_triggerSave();
                    }
                });
                evt.editor.keystrokeHandler.keystrokes[CKEDITOR.CTRL + 83 /* s */] = 'saveCKECommand';
            });
        }
    }

    function setupCKEfocusSearch() {
        if (window.CKEDITOR) {
            CKEDITOR.on('instanceReady', function (evt) {

                if (HotkeysSettings.indexOf('focusSearch') !== -1) {

                    evt.editor.addCommand('focusSearchBox', {
                        exec: function (editor, data) {
                            focusSearchBox();
                        }
                    });
                    evt.editor.keystrokeHandler.keystrokes[CKEDITOR.ALT + 68 /* d */] = 'focusSearchBox';
                }
            });
        }
    }

    function setupCKEpageTreeTrigger() {
        if (window.CKEDITOR) {
            CKEDITOR.on('instanceReady', function (evt) {

                if (HotkeysSettings.indexOf('addPageTreeTrigger') !== -1) {

                    evt.editor.addCommand('pageTreeTrigger', {
                        exec: function (editor, data) {
                            aos_togglePageTreePanel();
                        }
                    });
                    evt.editor.keystrokeHandler.keystrokes[CKEDITOR.ALT + 79 /* o */] = 'pageTreeTrigger';
                }
            });
        }
    }

    if (HotkeysSettings.indexOf('save') !== -1) {

        $(document).on('keydown', function (e) {

            var keyCode = e.keyCode || e.charCode;

            if ((e.metaKey || e.ctrlKey) && keyCode === 83) {
                aos_triggerSave();

                // intentionally disable browser Save as dialog globally
                // only inside this function to avoid keydown hijack
                e.preventDefault();
            }
        });

        // ctrl+s in CKEditor
        setupCKESave();

        // ctrl+s in CKEditor (repeaters)
        // $(document).on('reloaded', '.Inputfield', function () {
        $(document).on('reloaded', '.InputfieldRepeaterItem', function () {
            setupCKESave();
        });
    }

    function focusSearchBox(e, blur) {
        try {
            var searchBox = $('#ProcessPageSearchQuery');

            if (e) {
                e.preventDefault();
            }

            if (blur) {
                searchBox.blur();
                $('#search.open').removeClass('open');
                return false;
            }

            if (searchBox.is(':focus')) {
                searchBox.blur();

            } else {

                // ensure search box visibility
                $('#search').addClass('open');
                searchBox.focus();
                searchBoxValue = searchBox.val().trim();
                // use zero-width space to trigger autocomplete dropdown
                searchBox.val('​' + searchBoxValue);
                searchBox.trigger('keydown');
            }
        } finally {
        }
    }

    if (HotkeysSettings.indexOf('focusSearch') !== -1) {

        setupCKEfocusSearch();

        $(document).on('keydown', function (e) {

            var keyCode = e.keyCode || e.charCode;

            if (keyCode === 27) {  // ESC
                focusSearchBox(e, true);
                return false;
            }

            if (e.altKey && keyCode === 68) {  // alt+d
                focusSearchBox(e);
            }
        });
    }
})
;