/**
 * InputfieldURLChecker module for ProcessWire
 * https://goo.gl/F8CAK8
 */

$(document).ready(function () {

    //$('.InputfieldRepeater').on('reloaded', '.InputfieldRepeaterItem', function () {
    //    console.log($(this));
    //});
    //$(document).on('reloaded', '.InputfieldRepeaterItem', function () {
    //    console.log($(this));
    //});

    var IUC = {
        selector: 'a.iuc',
        linkHiddenClass: 'iuc-hide',
        lockedClass: 'iuc-locked-link',
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

    // $(document).on('ready reloaded wiretabclick opened', initIUC);
    $(document).on('ready reloaded wiretabclick opened', initIUC);

    // repeaters

    // $(document).on('reloaded', '.Inputfield', initIUC);  // runs on all inputfields!
    // $(document).on('reloaded', '.InputfieldRepeaterItem', function() {
    //
    // $(document).on('reloaded', '.InputfieldRepeaterItem .Inputfield:not(.pw-panel-items)', initIUC);
    //
    // $(document).on('reloaded', '.InputfieldRepeaterItem .Inputfield.pw-panel-items', function () {
    //     pwPanels.init();
    //     initIUC();
    // });

    // ProFields table
    $(document).on('mousedown', 'a.InputfieldTableAddRow', initIUC);


    // FieldtypeAssistedURL: refresh IUC link on modal close
    $(document).on('pw-modal-closed', function () {
        $('.iuc ~ input:not([type="hidden"])').trigger('fieldchange');
    });


    function initIUC(e) {

        $(IUC.selector).not('[' + IUC.dataLoaded + '="1"]').each(function () {

            var iucLink = $(this);

            // set link height
            setTimeout(function () {
                if (IUC.btnHeight > 0) {
                    iucLink.css({
                        'height': IUC.btnHeight + 'px',
                        'line-height': IUC.btnHeight + 'px'
                    });
                }
            }, 0);
        });

        $(IUC.selector + '[' + IUC.dataMode + '!=""][' + IUC.dataMode + ']').not('[' + IUC.dataLoaded + '="1"]').each(function () {

            var mode = $(this).attr(IUC.dataMode),
                input = $(this).parents('.InputfieldContent').first().find('input:not([type="hidden"])');

            // (see .module file) process inputs that are not autocomplete fields, or autocomplete fields in the page edit link modal
            // if (!input.hasClass('ui-autocomplete-input') || input.parents('#ProcessPageEditLinkForm').length) {

                // always add buttonMode because hotkey modes will trigger this
                addButtonMode(e, input);
                addFieldListener(input);

                if (mode.indexOf('ctrl-shift-click') !== -1) {
                    addHotkeyMode(input, 'click', 'ctrl-shift-click');
                }

                if (mode.indexOf('ctrl-shift-enter') !== -1) {
                    // addHotkeyMode(input, 'keyup', 'ctrl-shift-enter');
                    addHotkeyMode(input, 'keydown', 'ctrl-shift-enter');
                }
            // }

            $(this).attr(IUC.dataLoaded, 1);
        });
    }


    function addButtonMode(e, obj) {

        obj.parents('.InputfieldContent').first().find(IUC.selector).on('mousedown', function () {

            var url;

            url = $(this).attr('href') ? $(this).attr('href').trim() : false;

            if (!url || url.indexOf('mailto:') !== -1) {

                $(this).addClass(IUC.linkHiddenClass);
                return false;

            } else {

                // right click
                if (e.which == 3) return true;

                // if middle mouse button pressed, open a new page
                if (e.which == 2 || e.button == 4) {
                    window.open(url.replace('&modal=1', ''));
                    return false;
                }
            }
        });
    }


    function addHotkeyMode(obj, eventName, mode) {

        obj.on(eventName, function (e) {

            var url = $(this).val(),
                isCtrlShiftPressed = (e.metaKey || e.ctrlKey) && e.shiftKey,
                keyCode = e.keyCode || e.charCode,
                isEnterPressed = keyCode == 10 || keyCode == 13;

            if (!url && url.trim() === "") return;

            if ((mode === 'ctrl-shift-enter' && isCtrlShiftPressed && isEnterPressed) ||
                (mode === 'ctrl-shift-click' && isCtrlShiftPressed)) {

                obj.parents('.InputfieldContent').first().find(IUC.selector).get(0).click();

                return false;
            }
        });
    }


    function addFieldListener(obj) {

        //obj.on('keyup fieldchange input change keydown', function () {
        obj.on('keyup input change fieldchange', function () {

            var link = obj.parents('.InputfieldContent').first().find(IUC.selector),
                url = getUrl(obj.val(), link.attr(IUC.dataForceHttp)).trim();

            if (url) {
                link.attr('href', url);
                link.removeClass(IUC.linkHiddenClass);
            } else {
                link.attr('href', '');
                link.addClass(IUC.linkHiddenClass);
            }
        });

        // populate on load
        obj.trigger('fieldchange');
    }
});


/**
 * Get url with or without "http://"
 *
 * @param url
 * @param forcePrefix
 * @returns {string}
 */
function getUrl(url, forcePrefix) {
    var prefix = 'http';

    // return the original url if starts with "/" (allows relative paths)
    if (url.indexOf('/') === 0) {
        return url;
    }

    if (url.indexOf('mailto:') !== -1) {
        return "";
    }

    return (forcePrefix && url != "" && url.indexOf(prefix) === -1) ? prefix + '://' + url : url;
}