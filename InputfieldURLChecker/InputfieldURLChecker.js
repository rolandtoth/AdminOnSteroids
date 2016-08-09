/**
 * InputfieldURLChecker module for ProcessWire
 * https://goo.gl/F8CAK8
 */

$(document).ready(function () {

    var IUC = {
        selector: 'a.iuc',
        asmSelectPlaceholder: 'data-asm-placeholder',
        linkHiddenClass: 'iuc-hide',
        lockedClass: 'iuc-locked-link',
        pwPanelSelector: 'iframe.pw-panel-content',
        dummyFieldSelector: 'IUC-dummy',
        dataMode: 'data-iuc-mode',
        dataTarget: 'data-iuc-target',
        dataForceHttp: 'data-iuc-force-http',
        dataLoaded: 'data-iuc-loaded'
    };

    // get button height with a dummy element
    $('body').append('<input class="' + IUC.dummyFieldSelector + '">');
    IUC.btnHeight = $('.' + IUC.dummyFieldSelector).outerHeight() - 2;
    $('.' + IUC.dummyFieldSelector).remove();

    $(document).on('ready reloaded wiretabclick opened', initIUC);

    // repeaters
    $(document).on('reloaded', '.Inputfield', initIUC);

    // profield table
    $(document).on('click', 'a.InputfieldTableAddRow', initIUC);

    function initIUC() {

        $(IUC.selector).not('[' + IUC.dataLoaded + '="1"]').each(function () {

            var currInput = $(this).siblings('input:not([type="hidden"])');

            // set link height
            setTimeout(function () {
                if (IUC.btnHeight > 0) {
                    currInput.parent().children(IUC.selector).css({
                        'height': IUC.btnHeight + 'px',
                        'line-height': IUC.btnHeight + 'px'
                    });
                }
            }, 0);
        });


        $(IUC.selector + '[' + IUC.dataMode + '!=""][' + IUC.dataMode + ']').not('[' + IUC.dataLoaded + '="1"]').each(function () {

            var mode = $(this).attr(IUC.dataMode),
                input = $(this).parent().children('input:not([type="hidden"])');

            // always add buttonMode because hotkey modes will trigger this
            addButtonMode(input);
            addFieldListener(input);

            if (mode.indexOf('ctrl-shift-click') !== -1) {
                addHotkeyMode(input, 'click', 'ctrl-shift-click');
            }

            if (mode.indexOf('ctrl-shift-enter') !== -1) {
                addHotkeyMode(input, 'keydown', 'ctrl-shift-enter');
            }

            $(this).attr(IUC.dataLoaded, 1);
        });
    }

    function addButtonMode(obj) {

        obj.parent().children(IUC.selector).on('click', function (e) {

            var url = $(this).attr('href').trim(),
                pwPanel = $(IUC.pwPanelSelector);

            if (url === "") {
                $(this).addClass(IUC.linkHiddenClass);
                return false;

            } else {
                // workaround because pw-panel is not dynamic
                // do not update iframe if it has the same url loaded
                if (pwPanel.length && pwPanel.attr('src') !== url) {
                    // update panel title
                    //$('.pw-panel-container-loaded .pw-panel-button small.ui-button-text').text(url);

                    pwPanel.attr('src', url);
                }
            }
            //return false;
        });
    }


    function addHotkeyMode(obj, eventName, mode) {

        obj.on(eventName, function (e) {

            var url = $(this).val(),
                isCtrlShiftPressed = e.ctrlKey && e.shiftKey,
                isEnterPressed = e.keyCode == 10 || e.keyCode == 13;

            if (!url && url.trim() === "") return;

            if ((mode === 'ctrl-shift-enter' && isCtrlShiftPressed && isEnterPressed) ||
                (mode === 'ctrl-shift-click' && isCtrlShiftPressed)) {

                obj.parent().children(IUC.selector).get(0).click();

                return false;
            }
        });
    }


    function addFieldListener(obj) {

        obj.on('keyup fieldchange', function () {

            var link = obj.parent().children(IUC.selector),
                url = getUrl(obj.val(), link.attr(IUC.dataForceHttp)).trim();

            link.attr('href', url).toggleClass(IUC.linkHiddenClass, url == "")
        });

        // populate on load
        obj.trigger('fieldchange');
    }

    /**
     * Add placeholder to asmSelect
     * Selector: http://stackoverflow.com/questions/10641258/jquery-select-data-attributes-that-arent-empty#answer-23944081
     */
    $(function () {
        $('select[' + IUC.asmSelectPlaceholder + '!=""][' + IUC.asmSelectPlaceholder + ']').each(function () {

            var placeholder = $(this).data('asmPlaceholder');

            if (placeholder) {
                $(this).parent().find('.asmSelect option:first').attr({
                    'selected': true,
                    'disabled': true
                }).text(placeholder);
            }
        });
    });
});


/**
 * Get url with or without "http://"
 *
 * @param url
 * @param forcePrefix
 * @returns {*}
 */
function getUrl(url, forcePrefix) {
    var prefix = 'http';
    return (forcePrefix && url != "" && url.indexOf(prefix) === -1) ? prefix + '://' + url : url;
}