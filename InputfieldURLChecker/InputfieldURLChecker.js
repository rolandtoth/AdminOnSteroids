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

    // $(document).on('reloaded', '.Inputfield', initIUC);  // runs on all inputfields!
    // $(document).on('reloaded', '.InputfieldRepeaterItem', function() {

    $(document).on('reloaded', '.InputfieldRepeaterItem .Inputfield:not(.pw-panel-items)', initIUC);

    $(document).on('reloaded', '.InputfieldRepeaterItem .Inputfield.pw-panel-items', function () {
        pwPanels.init();
        initIUC();
    });

    // ProFields table
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

        obj.parent().children(IUC.selector).on('click', function () {

            var url = $(this).attr('href') ? $(this).attr('href').trim() : false,
                pwPanel = $(IUC.pwPanelSelector + ':eq(0)');

            if (!url) {

                $(this).addClass(IUC.linkHiddenClass);
                return false;

            } else {

                // workaround because pw-panel is not dynamic
                // do not update iframe if it has the same url loaded
                if (pwPanel.length && pwPanel.attr('src') !== url) {
                    pwPanel.attr('src', url);
                    return false;
                }
            }
            // return false;
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

    //var als_timer;
    //
    //// AdminLangSwitcher z-index fix (Default theme)
    //$("body.AdminThemeDefault #masthead, body.AdminThemeDefault .aos_adminLangSwitcher").mouseover(
    //    function () {
    //        if(window.als_timer) {
    //            clearTimeout(als_timer);
    //        }
    //        $('#masthead').css('z-index', 33);
    //    }
    //);
    //$("body.AdminThemeDefault .aos_adminLangSwitcher").mouseleave(
    //    function () {
    //        //console.log('here');
    //        als_timer = setTimeout(function () {
    //            $('#masthead').css('z-index', '');
    //        }, 1000);
    //    }
    //);
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
    return (forcePrefix && url != "" && url.indexOf(prefix) === -1) ? prefix + '://' + url : url;
}