// load autoSize on document ready, ajax loaded fields and switching admin tabs
$(document).on('ready reloaded wiretabclick', function(e) {

    var target = e.target || e.srcElement,
        autosizeTextareas = target.querySelectorAll('textarea');

    if (autosizeTextareas.length) {
        autosize(autosizeTextareas);
    }
});

// update textareas when clicking on language tabs
$(document).on('tabsactivate', '.langTabs', function (e, ui) {

    var textareas = ui.newPanel.get(0).querySelectorAll('textarea');

    if (textareas.length && window.autosize && window.autosize.update) {
        autosize.update(textareas);
    }
});