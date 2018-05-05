/*
 * Link Files Menu plugin
 *
 * @author Robin Sallis: https://github.com/Toutouwai/CkeLinkFiles
 * @version 0.1.0
 */

CKEDITOR.plugins.add('linkfilesmenu', {
    icons: 'linkfilesmenu',
    hidpi: true,
    lang: ['en'],
    init: function (editor) {
        var $orig_element = $(editor.element.$);
        var cke_id = $orig_element.attr('id');
        editor.addCommand('showLinkFilesMenu', {
            exec: function (editor) {
                var $editor = $(editor.element.$);
                var $cke_outer = $('#cke_' + $editor.attr('id'));
                var $button = $cke_outer.find('.cke_button__linkfilesmenu').first();
                var editorID = $editor.attr('id');
                var configName = $editor.attr('data-configname');
                // console.log(editorID);  // Inputfield_body
                // console.log(configName);    // InputfieldCKEditor_body_1088
                var langID = editorID.replace(configName.replace('CKEditor', ''), '').replace('__', '');
                var $menu = $('#link-files-menu' + langID);
                if (!$menu.length) return;
                $menu.data('cke-id', cke_id);
                if ($menu.is(":hidden")) {
                    $button.addClass('cke_button_on');
                    var button_offset_top = $button.offset().top;
                    var button_offset_left = $button.offset().left;
                    $menu.css({top: button_offset_top + 27, left: button_offset_left});
                    $menu.show();
                } else {
                    $menu.hide();
                    $button.removeClass('cke_button_on');
                }
            }
        });
        editor.ui.addButton('LinkFilesMenu', {
            label: editor.lang.linkfilesmenu.lfm_button_label,
            icon: 'linkfilesmenu',
            command: 'showLinkFilesMenu'
        });
    }
});


$(function () {

    // Add menu on DOM ready
    addFilesMenu(config.CkeLinkFiles.page_id);

    // Add menu after ajax file upload done
    $(document).on('AjaxUploadDone', function () {
        addFilesMenu(config.CkeLinkFiles.page_id);
    });

    // hide menu on click outside
    $('body').on('mousedown', function (e) {

        var menu = $('[id^="link-files-menu"]');

        if ($(e.target).is('.cke_button__linkfilesmenu, .cke_button__linkfilesmenu_icon')) {
            return true;
        }

        if (!menu.is(e.target) && menu.has(e.target).length === 0) {
            hideFilesMenu(menu);
        }
    });

    // hide menu on editor hover
    $('body').on('mouseover', '.cke_contents', function () {
        hideFilesMenu($('[id^="link-files-menu"]'));
    });

    // Menu item clicked
    $('body').on('click', '[id^="link-files-menu"] li', function (event) {
        var use_description = !!event.altKey;
        var $menu = $(this).parents('[id^="link-files-menu"]').first();
        var cke_id = $menu.data('cke-id');
        var editor = CKEDITOR.instances[cke_id];
        var html = '';

        if ($(this).hasClass('no-files')) {
            // No files
            return hideFilesMenu($menu);

        } else if ($(this).hasClass('all-files')) {
            // All files
            html = '<ul>';
            $(this).siblings().each(function () {
                var text;
                if (use_description && $(this).attr('data-title').length) {
                    text = $(this).attr('data-title');
                } else {
                    text = $(this).find('span').text();
                }
                html += '<li><a href="' + $(this).data('url') + '">' + text + '</a></li>';
            });
            html += '</ul>';
            
        } else {
            // Individual file
            var text;
            var selection = editor.getSelection().getSelectedElement() || editor.getSelection().getSelectedText();
            if (selection) {
                // Something is selected in the editor
                var fragment = editor.getSelection().getRanges()[0].extractContents();
                var element = CKEDITOR.dom.element.createFromHtml('<a href="' + $(this).data('url') + '"></a>');
                fragment.appendTo(element);
                editor.insertElement(element);
                hideFilesMenu($menu);
                return;
            } else if (use_description && $(this).attr('data-title').length) {
                text = $(this).attr('data-title');
            } else {
                text = $(this).find('span').text();
            }
            html = '<a href="' + $(this).data('url') + '">' + text + '</a>'
        }
        editor.insertHtml(html);
        hideFilesMenu($menu);
    });

});

function addFilesMenu(page_id) {

    $('[id^="link-files-menu"]').remove();

    var ajax_url = config.urls.admin + 'login/logout/?request=AdminOnSteroids&ckelinkfiles_pid=' + page_id;

    function getBaseNameWithoutExtension(str) {
        return str.replace(/\.[^/.]+$/, '');
    }

    function getDisplayName(value) {
        return value.description ? value.description : getBaseNameWithoutExtension(value.basename);
    }

    $.getJSON(ajax_url).done(function (data) {

        if (data && data['']) { // empty key = default language
            $.each(data, function (langID, langItems) {
                var $list = $('<ul></ul>');
                $.each(langItems, function (index, value) {
                    var displayMarkup = '<strong>' + getDisplayName(value) + '</strong><span>' + value.basename + '</span>';
                    $list.append($('<li data-url="' + value.url + '" data-title="' + getDisplayName(value) + '">' + displayMarkup + '</li>'));
                });

                $list.append($('<li class="all-files">' + config.CkeLinkFiles.all_files_text + '</li>'));

                $('body').append($('<div id="link-files-menu' + langID + '"></div>').append($list));
            });
        } else {
            var $list = $('<ul></ul>');
            $list.append($('<li class="no-files">' + config.CkeLinkFiles.no_files_text + '</li>'));
            $('body').append($('<div id="link-files-menu"></div>').append($list));
        }
    });
}

function hideFilesMenu($menu) {
    $('.cke_button__linkfilesmenu').removeClass('cke_button_on');
    $menu.hide();
}
