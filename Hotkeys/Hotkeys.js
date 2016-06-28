$(document).ready(function () {

    var AOSsettings = AOSsettings || JSON.parse(ProcessWire.config.AdminOnSteroids),
        HotkeysSettings = AOSsettings.Hotkeys;

    if (HotkeysSettings.indexOf('save') !== -1) {

        //var aos_saveButton = $('form.InputfieldForm').find('button[type="submit"]')
        //    .not('#Inputfield_clear_file_compiler')
        //    .not('#upload')
        //    .not('#download')
        //    .not('#download_zip')
        //    .not('.Inputfield_submit_bookmark')
        //    .not('[name="install"]')
        //    .not('[name="delete"]')
        //    .eq(0);

        var aos_saveButton = $('form.InputfieldForm').find('button[type="submit"]')
            .filter('#submit_save, #ProcessTemplateEdit #Inputfield_submit, #Inputfield_submit_save_field, #Inputfield_submit_save_module, #submit_save_profile, #save_translations')
            .eq(0);

        $(document).on('keydown', function (e) {

            //console.log(aos_saveButton);
            //return false;

            if (e.ctrlKey && e.keyCode == 83) {
                if (aos_saveButton.length) {
                    aos_triggerSave();
                }
                // intentionally disable browser Save as dialog everywhere
                e.preventDefault();
            }
        });

        // ctrl+s in CKEditor
        if (window.CKEDITOR) {
            CKEDITOR.on('instanceReady', function (evt) {
                evt.editor.document.on('keydown', function (e) {
                    // ctrl+s
                    if (e.data.getKeystroke() == CKEDITOR.CTRL + 83) {
                        e.data.$.preventDefault();
                        aos_triggerSave();
                    }
                });
            });
        }

        function aos_triggerSave() {
            $('body').addClass('aos_saving');
            $('#wrap, body.AdminThemeDefault #content').addClass('ui-state-disabled');
            aos_saveButton.trigger('click');
        }
    }

});
