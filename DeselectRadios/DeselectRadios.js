$(document).ready(function () {

    var AOSsettings = AOSsettings || JSON.parse(ProcessWire.config.AdminOnSteroids),
        ADRsettings = AOSsettings.DeselectRadios,
        $radioButtons = $("input:radio");

    // enable only for superusers
    //if (ADRsettings.indexOf('adminOnly') !== -1) {
    //    if (!AOSsettings.isSuperUser) {
    //        return true;
    //    }
    //}

    $radioButtons.filter(":checked").data("chk", true);

    $radioButtons.click(function () {

        // enable clearing required radios
        if (ADRsettings.indexOf('allowRequired') === -1) {
            if ($(this).parents('.InputfieldStateRequired').length) {
                return true;
            }
        }
        $("input[name='" + $(this).attr("name") + "']:radio").not(this).removeData("chk");
        $(this).data("chk", !$(this).data("chk"));
        $(this).prop("checked", $(this).data("chk"));
    });
});
