$(document).ready(function () {

    var AOSsettings = AOSsettings || JSON.parse(ProcessWire.config.AdminOnSteroids);

    // LongClickDuration

    if (AOSsettings.enabledSubmodules.indexOf('LongClickDuration') !== -1) {
        // set custom long click duration
        if (jQuery && jQuery.longclick) {
            if (AOSsettings.LongClickDuration) {
                jQuery.longclick.duration = parseInt(AOSsettings.LongClickDuration);
            }
        }
    }

    // RenoTWeaks

    if (AOSsettings.enabledSubmodules.indexOf('RenoTweaks') !== -1) {

        var renoTweaksSettings = AOSsettings.RenoTweaks,
            bodyClasses = '';

        if (renoTweaksSettings.indexOf('stickyHeader') !== -1) {
            bodyClasses += ' aos_stickyHeader';
        }

        if (renoTweaksSettings.indexOf('stickySidebar') !== -1) {
            bodyClasses += ' aos_stickySidebar';
        }

        if (renoTweaksSettings.indexOf('autoHideSidebar') !== -1) {
            bodyClasses += ' aos_autoHideSidebar';
        }

        if (renoTweaksSettings.indexOf('alwaysVisibleSidebarItems') !== -1) {
            bodyClasses += ' aos_alwaysVisibleSidebarItems';
        }

        if (renoTweaksSettings.indexOf('headButtonNextToTitle') !== -1) {
            bodyClasses += ' aos_headButtonNextToTitle';
        }

        if (renoTweaksSettings.indexOf('closeNoticeButtonToLeft') !== -1) {
            bodyClasses += ' aos_closeNoticeButtonToLeft';
        }

        $('body').addClass(bodyClasses);
    }

});
