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


    // editFieldWidth
    // body.id-11: template edit page
    if (AsmTweaksSettings.indexOf('editFieldWidth') !== -1 && $('body').hasClass('id-11')) {

        // add "100%" to all fields not having percentages
        function addAsmWidths() {
            setTimeout(function () {
                $("#wrap_fieldgroup_fields .asmListItemStatus:not(:contains('%'))").each(function () {
                    $(this).html($(this).text() + '<em> 100%</em>');
                });
            }, 100);
        }

        $(document).on('hover', '#wrap_fieldgroup_fields .asmList:not(.editFieldWidth)', function () {
            $(this).addClass('editFieldWidth');
        });

        $(document).on('reloaded', function () {
            addAsmWidths();
        });

        $(document).on('click', '#wrap_fieldgroup_fields .asmListItemStatus', function () {
            var statusEl = $(this),
                editLink = statusEl.siblings('.asmListItemEdit').first().find('a'),
                originalUrl = editLink.attr('href');

            editLink
                .attr('href', editLink.attr('href') + '#inputfieldConfig')
                .trigger('click');

            setTimeout(function () {
                if (editLink.length) {
                    editLink.attr('href', originalUrl);
                }
            }, 250);
        });

        addAsmWidths();

        // closing the modal after editing field width, force re-adding "100%" text for asmListItems
        $(document).on('pw-modal-closed', function () {
            $(document).trigger('reloaded');
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
