$(document).ready(function () {

    var AOSsettings = AOSsettings || JSON.parse(ProcessWire.config.AdminOnSteroids),
        AsmTweaksSettings = AOSsettings.AsmTweaks;

    if (AsmTweaksSettings.indexOf('asmCollapse') !== -1) {

        $(document).on('dblclick', '.asmFieldset', function () {

            var asmItem = $(this),
                speed = 200,
                collapseClass = 'collapsed';

            if (asmItem.hasClass('asmFieldsetStart')) {

                asmItem.toggleClass(collapseClass);
                asmItem.nextUntil('.asmFieldsetStart').slideToggle(speed);

            } else {

                asmItem.prevAll('.asmFieldsetStart').eq(0).toggleClass(collapseClass);
                asmItem.prevUntil('.asmFieldsetStart').add(asmItem).slideToggle(speed);
            }
        });
    }


    if (AsmTweaksSettings.indexOf('fieldMiddleEdit') !== -1) {

        $(document).on('mousedown', '.asmList a[href*="/field/edit?"]', function (e) {

            e = e || window.event;

            var link = $(this),
                linkClone = link.clone(true);

            if (e.which === 2) {
                link.unbind('click');

                var editFieldUrl = link.attr('href').split('&fieldgroup_id')[0],
                    fieldName = link.contents().first()[0].textContent;

                // need to remove href to avoid Chrome opening it
                link.removeAttr('href');

                window.open(editFieldUrl, fieldName);
                window.focus(fieldName);

                setTimeout(function () {
                    link.replaceWith(linkClone);
                }, 300);
            }

            return false;
        });
    }

});
