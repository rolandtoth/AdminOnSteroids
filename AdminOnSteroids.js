$(document).ready(function () {

    var AOSsettings = AOSsettings || JSON.parse(ProcessWire.config.AdminOnSteroids);

    // set custom long click duration
    if (jQuery && jQuery.longclick) {
        if (AOSsettings.LongClickDuration) {
            jQuery.longclick.duration = parseInt(AOSsettings.LongClickDuration);
        }
    }

});