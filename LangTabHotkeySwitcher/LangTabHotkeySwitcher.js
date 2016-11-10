var languagesCount;

$(document).on('ready', function () {
    languagesCount = $('.ui-tabs-nav').eq(0).children('li').length;
    setLangTabSwicherHotkeys();

    // add custom class because .hasLangTabs is removed on expanding lang tabs
    // needs to be re-added on ctrl+up/right because of ajax loaded fields
    $('.hasLangTabs').addClass('hasLangTabs_');
});

function setLangTabSwicherHotkeys() {

    var getIndex = function (index, direction) {
        if (direction == 'down') {
            return index < 0 ? languagesCount - 1 : index;
        } else {
            return index > languagesCount - 1 ? 0 : index;
        }
    };

    function switchLangCKE(ckeID) {

        var ckeInstance = CKEDITOR.instances[ckeID];

        ckeInstance.on('contentDom', function () {

            var editable = this.editable();

            editable.attachListener(editable, 'keydown', function (e) {

                var langTabs = $('#' + ckeID).closest('.langTabs'),
                    index;

                // left
                if (e.data.getKeystroke() == CKEDITOR.CTRL + 37) {
                    index = langTabs.find('ul .ui-tabs-active').index() - 1;
                    index = getIndex(index, 'down');
                    return activateLangTab(index);
                }

                // right
                if (e.data.getKeystroke() == CKEDITOR.CTRL + 39) {
                    index = langTabs.find('ul .ui-tabs-active').index() + 1;
                    index = getIndex(index, 'up');
                    return activateLangTab(index);
                }

                function activateLangTab(index) {

                    langTabs.tabs('option', 'active', index);
                    langTabs.find('input, textarea').eq(index).focus();

                    var currentCKEinsanceId = langTabs.find('li').eq(index).find('a').attr('href').replace('#langTab_', '');

                    setTimeout(function () {
                        CKEDITOR.instances[currentCKEinsanceId].focus();
                    }, 200);

                    switchLangCKE(currentCKEinsanceId);
                }
            });
        });
    }


    if ($('.InputfieldCKEditor.hasLangTabs').length) {

        $('.InputfieldCKEditor.hasLangTabs').each(function () {
            var ckeInstanceId = $(this).find('textarea.FieldtypeTextareaLanguage.InputfieldCKEditorLoaded').eq(0).attr('id');

            if (ckeInstanceId) {
                switchLangCKE(ckeInstanceId);
            }
        })
    }


    $(document).on('keydown', '.LanguageSupport input, .LanguageSupport textarea', function (e) {

        e = e || window.event;

        var keyCode = e.keyCode || e.which,
            arrow = {left: 37, up: 38, right: 39, down: 40},
            langTabs = $(this).closest('.langTabs'),
            inputs = langTabs.find('input, textarea'),
            index;

        function activateLangTab(index) {
            langTabs.tabs('option', 'active', index);
            inputs.eq(index).focus();
        }

        if (e.metaKey || e.ctrlKey) {

            switch (keyCode) {

                case arrow.left:
                    // prevent moving cursor
                    e.preventDefault();

                    // if ui tabs were destroyed (ctrl-up/down), don't try switching tab
                    if (!langTabs.hasClass('ui-tabs')) {
                        index = getIndex(inputs.index($(this)) - 1, 'down');
                        return inputs.eq(index).focus();
                    }
                    index = langTabs.find('ul .ui-tabs-active').index() - 1;
                    index = getIndex(index, 'down');
                    return activateLangTab(index);
                    break;

                case arrow.right:
                    e.preventDefault();

                    // if ui tabs were destroyed (ctrl-up/down), don't try switching tab
                    if (!langTabs.hasClass('ui-tabs')) {
                        index = getIndex(inputs.index($(this)) + 1, 'up');
                        return inputs.eq(index).focus();
                    }
                    index = langTabs.find('ul .ui-tabs-active').index() + 1;
                    index = getIndex(index, 'up');
                    return activateLangTab(index);
                    break;

                case arrow.up:
                case arrow.down:
                    e.preventDefault();

                    // add custom class because .hasLangTabs is removed on expanding lang tabs
                    langTabs.parents('.hasLangTabs').addClass('hasLangTabs_');

                    langTabs.parents('.hasLangTabs_').find('.langTabsToggle').trigger('click');

                    if (langTabs.hasClass('ui-tabs')) {
                        index = langTabs.find('input, textarea').index($(this));
                        return activateLangTab(index);

                    } else {
                        return this.focus();
                    }
                    break;
            }
        }
    });
}
