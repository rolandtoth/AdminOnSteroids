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

});
