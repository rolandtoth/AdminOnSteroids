var AOSsettings = AOSsettings || (ProcessWire && ProcessWire.config && ProcessWire.config.AdminOnSteroids) ? JSON.parse(ProcessWire.config.AdminOnSteroids) : null;

function _isEnabled(submoduleName) {
    return AOSsettings.enabledSubmodules.indexOf(submoduleName) !== -1
}

function initCKE() {

    var CKEplugins = ProcessWire.config.InputfieldCKEditor.plugins,
        enabledCKEplugins = AOSsettings.CKEaddons_plugins,
        CKEskin = AOSsettings.CKEaddons_skin,
        CKEenabledFields = AOSsettings.CKEaddons_enabledFields,
        CKEpluginCount = enabledCKEplugins.length,
        CKEtoolbars = {
            codesnippet: ["CodeSnippet"],
            div: ["CreateDiv"],
            find: ["Find", "Replace"],
            justify: ["JustifyLeft", "JustifyCenter", "JustifyRight", "JustifyBlock"],
            indentblock: ["Indent", "Outdent"],
            maximize: ["Maximize"],
            oembed: ["oembed"],
            showblocks: ["ShowBlocks"],
            templates: ["Templates"],
            token: ["CreateToken"]
        };

    window.CKEpluginDependencies = {
        autosave: 'notification',
        codesnippet: 'widget,dialog,lineutils',
        indentblock: 'indent',
        oembed: 'widget,lineutils',
        token: 'widget,dialog,lineutils'
    };

    // keep the plugin order from admin
    if (enabledCKEplugins) enabledCKEplugins.reverse();

    // set each plugin path to AOS dir
    if (CKEpluginCount > 0) {

        var dependencies,
            dependentPlugins = ['oembed', 'autosave', 'indentblock', 'codesnippet', 'token'];

        for (var i = 0; i < CKEpluginCount; i++) {

            var pluginName = enabledCKEplugins[i];

            if (dependentPlugins.indexOf(pluginName) !== -1 && CKEpluginDependencies[pluginName]) {
                dependencies = CKEpluginDependencies[pluginName].split(',');
                for (var k in dependencies) {
                    if (dependencies.hasOwnProperty(k)) {
                        CKEplugins[dependencies[k]] = aosUrl + 'CKE/plugins/' + dependencies[k] + '/plugin.js';
                    }
                }
            }

            CKEplugins[pluginName] = aosUrl + 'CKE/plugins/' + pluginName + '/plugin.js';
        }
    }

    function addCKEtoolbars(instance) {

        var plugins = instance.extraPlugins.split(',');

        for (i = 0; i < plugins.length; i++) {
            var toolbarName = plugins[i];
            if (CKEtoolbars.hasOwnProperty(toolbarName) && enabledCKEplugins.indexOf(toolbarName) !== -1) {
                instance.toolbar.unshift(CKEtoolbars[toolbarName]);
            }
        }
    }


    $(document).ready(function () {

        // LightWire skin (global)
        if (aosUrl && CKEskin && CKEskin !== 'default') {
            CKEDITOR.config.skin = CKEskin + ',' + aosUrl + 'CKE/skins/' + CKEskin + '/';
        }

        // Content Templates templates.js
        if (CKEtemplatesFile) {
            CKEDITOR.config.templates_files = [CKEtemplatesFile];
            CKEDITOR.config.templates = 'default';
            CKEDITOR.config.templates_replaceContent = false;
        }

        // set some plugin defaults
        CKEDITOR.config.autoGrow_onStartup = true;
        CKEDITOR.config.autoGrow_bottomSpace = 20;
        CKEDITOR.config.autoGrow_maxHeight = 700;
        CKEDITOR.config.codemirror = {
            theme: 'material',
            lineNumbers: true,
            indentAuto: true,
            lineWrapping: true,
            // extraKeys: {
            //     "Tab": function (cm) {
            //         CodeMirror.commands[cm.getSelection().length ?
            //             "indentMore" : "insertTab"](cm);
            //     },
            //     "Shift-Tab": "indentLess"
            // }
        };

        $('.InputfieldCKEditorNormal, .InputfieldCKEditorInline').each(function () {

            var CKEname = $(this).attr('data-configname'),
                CKEfield = ProcessWire.config[CKEname];

            // only add once
            if (!CKEfield || CKEfield.aos) return true;

            // load custom config if exists
            if (AOSsettings.customCKEScript) {
                CKEfield.customConfig = AOSsettings.customCKEScript;
            }

            // load custom css file (only if there's no field custom css set)
            // by default contents.css is loaded from /wire/... directory
            if (CKEfield.contentsCss.indexOf('/wire/') !== -1 && AOSsettings.customCKEStyle) {
                CKEfield.contentsCss = AOSsettings.customCKEStyle;
            }

            // process enabled fields
            if (CKEenabledFields.length) {
                if (CKEenabledFields.indexOf(CKEname.replace('InputfieldCKEditor_', '')) === -1) {
                    return true;
                }
            }

            var extraPlugins = enabledCKEplugins.join(',');

            // remove magicline from Removed plugins (PW by default)
            if (extraPlugins.indexOf('magicline') !== -1) {
                var removedPluginsArr = CKEfield.removePlugins.split(','),
                    index = removedPluginsArr.indexOf('magicline');

                if (index > -1) removedPluginsArr.splice(index, 1);

                CKEfield.removePlugins = removedPluginsArr.join(',');
            }

            CKEfield.extraPlugins += ',' + extraPlugins;
            addCKEtoolbars(CKEfield);

            CKEfield.aos = true;
        })
    });
}

if (AOSsettings) {

    var aosUrl = AOSsettings.aosUrl,
        CKEtemplatesFile = AOSsettings.customCKEtemplates;

    if (_isEnabled('CKEaddons') && ProcessWire.config.InputfieldCKEditor) {
        // $(document).on('ready wiretabclick', initCKE);
        $(document).on('reloaded', '.InputfieldRepeaterItem, .InputfieldCKEditor', initCKE);
        initCKE();
    }
}


// make autogrow CKEditor plugin work with tabs
if (_isEnabled('CKEaddons') && AOSsettings.CKEaddons_plugins.indexOf('autogrow') !== -1) {

    $(document).on('wiretabclick', function (e, elem) {
        var CKEs = $(elem).find('.InputfieldCKEditor');
        if (CKEs.length) updateAutoGrowCKE(CKEs);
    });

    // https://github.com/processwire/processwire/pull/16
    $(document).on('showInputfield', function (e, elem) {
        if ($(elem).hasClass('InputfieldCKEditor')) updateAutoGrowCKE($(elem));
    });
}


function updateAutoGrowCKE(CKEs) {
    if (CKEs.length) {
        CKEs.each(function (i, el) {

            var CKEid = $(el).attr('id').replace('wrap_', ''),
                editor = CKEDITOR.instances[CKEid];

            if (editor && !editor.autogrowFired) {
                editor.autogrowFired = true;
                editor.execCommand('autogrow');
            }
        })
    }
}


function updateAutoGrowCKE(CKEs) {
    if (CKEs.length) {
        CKEs.each(function (i, el) {

            var CKEid = $(el).attr('id').replace('wrap_', ''),
                editor = CKEDITOR.instances[CKEid];

            if (editor && !editor.autogrowFired) {
                editor.autogrowFired = true;
                editor.execCommand('autogrow');
            }
        })
    }
}


// add "scrolled" body class
//var addScrolledBodyClass = debounce(function () {
//    var el = document.querySelector('body');
//    if (!el) return false;
//    posTop() > 20 ? el.classList.add('scrolled') : el.classList.remove('scrolled');
//}, 120);
//
//['scroll', 'resize', 'load'].forEach(function (e) {
//    window.addEventListener(e, addScrolledBodyClass);
//});

function posTop() {
    return typeof window.pageYOffset != 'undefined' ? window.pageYOffset : document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop ? document.body.scrollTop : 0;
}

function debounce(func, wait, immediate) {
    var timeout;
    return function () {
        var context = this, args = arguments;
        var later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// function to add image titles to image select dialog (opened by CKEditor image button)
function addImageSelectLabels(imageUL) {
    if (imageUL.children('li').length) {

        imageUL.addClass('aos-image-titles').children('li').each(function (index, el) {
            var link = $(el).find('a'),
                url = link.attr('href'),
                imgName;

            imgTitle = link.find('img').attr('alt') || AOSsettings.loc['untitled'];
            imgName = url.split('&')[0].split(',')[1];

            link.append('<span class="imageSelectLabel">' + imgTitle + '<small>' + imgName + '</small></span>');
        });
    }
}

// build search strings and add to rows && set column widths
function setDtTable(table) {
    setColWidths('#' + table.attr('id'));

    table.find('tbody tr').each(function () {

        var $tr = $(this),
            cells = $tr.children('td'),
            searchStrings = [];

        $.each(cells, function (i, el) {

            // get text from html element, or its value (in case of inputs)
            var text = ((el.innerText || el.textContent) || $(el).find('input').val());

            if (text) searchStrings.push(text.trim());

            // // also add title
            // if (el.find('a[title]'))
            //     searchStrings.push(el.find('a[title]').attr('title'));

        });

        $tr.attr('data-filter', searchStrings.join(" "));
    });
}

function paginateFilteredLister(input, direction) {

    var selector = direction == 'right' ? '.MarkupPagerNavNext a' : '.MarkupPagerNavPrevious a';

    if ($(selector).length) {
        $('body').attr('data-filterbox', $(input).val());
        $(selector).first().trigger('click');
    }
}


function toggleFilterBoxState(input, on) {
    input.attr('disabled', !on);
}

function restoreFilterBoxValue(input) {

    var prevValue = $('body').attr('data-filterbox');

    if (!prevValue) return false;

    toggleFilterBoxState(input, true);

    input.val(prevValue)
        .trigger('fieldchange')
        .focus();

    $('body').removeAttr('data-filterbox');
}

// default AdminDataTable filter
function setupAdminDataTableFilter() {


    // do not add dtFilter to modules
    if ($('#modules_form').length) {
        return false;
    }


    // if ($('.dtFilter').length) return false;

    if ($('.AdminDataTable:not(.InputfieldTable)').length) {

        var autofocus = $('#ProcessTemplateList, #ProcessFieldList').length ? ' autofocus' : '';
        if ($('body.AdminThemeUikit').length == 0) {
            var dtFilter = $('<div class="Inputfield InputfieldMarkup"><div class="dtFilter filterbox InputfieldContent"><input type="text"' + autofocus + ' placeholder="Filter items..." class="ui-input"><i class="fa fa-close"></i><span class="counter"></span></div></div>');
        }
        else {
            var dtFilter = $('<div class=\'uk-inline filterbox-wrapper uk-grid-margin Inputfield InputfieldMarkup\'>' +
                '<div class="dtFilter filterbox InputfieldContent ">' +
                // '<span class="uk-form-icon">' +
                // '<i class="fa fa-search"></i>' +
                // '</span>' +
                '<input type="text"' + autofocus + ' class=\'uk-input uk-form-width-medium\'>' +
                '<i class="fa fa-close"></i>' +
                '<span class="counter"></span></div></div>');
        }

        function updateDtFilterCounter(num, input, total) {

            // $(input).toggleClass('hidden', !num);

            var counter = $(input).siblings('.counter');

            // see in CSS
            // if((!num)) {
            //     counter.text('');
            // } else {
            counter.html('<strong>' + num + '</strong>' + '<em>/ ' + total + '</em>');
            // }
        }

        // do not show if there is only 1 item
        if ($('.AdminDataTable').find('tbody tr').length <= 1) {
            return false;
        }

        $('.AdminDataTable').each(function () {

            var table = $(this);

            if (table.attr('data-dtfilter-added')) return true;

            // continue if table is under Module Info section
            // if (table.parents('#ModuleEditForm, #ModuleInfo').length) return true;
            if (table.parents('#ModuleInfo').length) return true;

            setDtTable(table);

            // add to DOM
            if ($('.AdminDataTable').length == 1) {

                // Sessions page
                if ($('body').hasClass('id-1095')) {
                    table.parents('.Inputfields').first().prepend(dtFilter.clone());
                } else {
                    table.before(dtFilter.clone());

                }

            } else {

                if (table.parents('.WireTab').length) {
                    table.before(dtFilter.clone());

                } else {

                    if (!$('body').hasClass('dtFilterAdded')) {
                        table.parents('.Inputfields').first().prepend(dtFilter.clone());
                        $('body').addClass('dtFilterAdded');
                    }

                    if (table.parents('#ProcessListerTable').length) {
                        table.parents('#ProcessListerTable').first().prepend(dtFilter.clone());
                    }
                }
            }

            table.attr('data-dtfilter-added', '1');

            // 2 pager: top and bottom
            if (table.parents('form').find('ul.MarkupPagerNav').length) {
                restoreFilterBoxValue(table.parents('form').find('.dtFilter input'));
            }
        });

        function cleardtFilter(input) {
            input.val('').focus();
            input.parent().removeClass('hasValue');

            input.trigger('fieldchange');

            //$('.Inputfield.hidden').removeClass('hidden');
            // note: hiding the counter is in CSS
            // updateDtFilterCounter();
        }

        // clear filterbox on ESC, remove focus on second ESC
        $(document).on('keydown', '.dtFilter input', function (e) {

            e = e || window.event;
            var target = e.target || e.srcElement;

            if (e.keyCode === 27) { // ESC
                if (!target.value) {
                    target.blur();  // if input is empty, remove focus
                } else {
                    setTimeout(function () {
                        cleardtFilter($(target));
                    }, 0);
                }
            }
        });

        // click on close X
        $(document).on('click', '.dtFilter i', function (e) {

            e = e || window.event;
            var target = e.target || e.srcElement;

            cleardtFilter($(target).prev('input'));

            return false;
        });

        // separate because no need for debounce
        // paginated tables ctrl+arrow navigation
        $(document).on('keydown', '.dtFilter input', function (e) {

            e = e || window.event;

            var input = $(this),
                pager = input.parents('form').find('.MarkupPagerNav'),
                keyCode = e.keyCode || e.charCode || e.which,
                arrow = {left: 37, up: 38, right: 39, down: 40};

            if (e.metaKey || e.ctrlKey) {
                switch (keyCode) {
                    case arrow.left:
                        // prevent moving cursor
                        e.preventDefault();
                        if (pager.find('.MarkupPagerNavPrevious').length) {
                            toggleFilterBoxState(input, false);
                            paginateFilteredLister(input, 'left');
                            return false;
                        }
                        break;

                    case arrow.right:
                        e.preventDefault();
                        if (pager.find('.MarkupPagerNavNext').length) {
                            toggleFilterBoxState(input, false);
                            paginateFilteredLister(input, 'right');
                            return false;
                        }
                        break;
                }
            }
        });

        // focus
        // $(document).on('wiretabclick', function (e, elem) {
        //     if (elem.find('.dtFilter').length) {
        //         setTimeout(function () {
        //             elem.find('.dtFilter').first().focus();
        //         }, 100);
        //     }
        // });

        // filter items
        $(document).on('input keyup fieldchange', '.dtFilter input', debounce(function (e) {

            e = e || window.event;

            var target = e.target || e.srcElement,
                filter = target.value.toLowerCase(),
                field = $('.AdminDataTable'),
                items = field.find('tbody td'),
                //count = 0,
                length = filter.length,
                invertedSearch = false;

            // Lister page: process only closest tables (exception)
            if ($('body').hasClass('id-1007')) {
                field = $(target).parent().parent().find('.AdminDataTable');
                items = field.find('tbody td');
            }

            if (!target.value) {
                updateDtFilterCounter();
                $(target).parent().removeClass('hasValue');
                $('tr.hidden').removeClass('hidden');
                $('.Inputfield.hidden').removeClass('hidden');
                return true;
            }

            if (e.keyCode == 13) {  // Enter
                var visibleRowLinks = $('tbody tr:not(.hidden) a');
                if (visibleRowLinks.length) {
                    visibleRowLinks.first().get(0).click();
                }
                return false;
            }

            // check if first or last character is "!" and remove if yes
            // only if filter is at least 2 chars long (enables searching for single "!")
            // use filter.length because it changes
            if (filter.length > 1) {
                if (filter.charAt(0) === '!') {
                    filter = filter.slice(1);
                    invertedSearch = true;
                }
                if (filter.charAt(filter.length - 1) === '!') {
                    filter = filter.slice(0, -1);
                    invertedSearch = true;
                }
            }

            // set new length as it may have changed
            length = filter.length;

            // if (field.find('tbody tr:not(.hidden)').length == 0) {
            //     $(target).addClass('empty');
            //     return false;
            //     // allow escape, backspace, delete, leftarrow keys only
            //     // return e.keyCode == 27 || e.keyCode == 8 || e.keyCode == 37 || e.keyCode == 46;
            // }

            $(target).removeClass('empty');
            $(target).parent().addClass('hasValue');

            if (length > 0) {

                var filter_tags = filter.split(" "); // Split user input by spaces

                if (filter_tags.length == 0) return true;

                items.each(function () {

                    var row = $(this).parent('tr'),
                        itemFilters = row.attr('data-filter'),
                        matches = true;

                    // no item filters - table is probably replaced by AJAX
                    if (!itemFilters) {
                        setDtTable(field);
                        return false;
                    }

                    // Match each splitted string against the whole tags string
                    $.each(filter_tags, function (i, a_filter) {
                        var isFilterMatch = itemFilters.toLowerCase().indexOf(a_filter);
                        // if (itemFilters.toLowerCase().indexOf(a_filter) === -1) {
                        if (invertedSearch) {
                            if (isFilterMatch !== -1) matches = false;
                        } else {
                            if (isFilterMatch === -1) matches = false;
                        }
                    });

                    if (matches) {
                        row.parents('li.Inputfield.InputfieldStateCollapsed').first().removeClass('InputfieldStateCollapsed');
                        row.removeClass('hidden');
                        //count++;
                    } else {
                        row.addClass('hidden');
                    }
                });

            } else {

                row.parents('li.Inputfield.InputfieldStateCollapsed').first().removeClass('InputfieldStateCollapsed');
                items.removeClass('hidden');
                //count++;
            }

            // used for hiding empty inputfields
            var fieldCount = function (table) {
                var count = 1;
                if (table.parents('.WireTab').length) {
                    // table is inside a tab
                    // currently there's only 1 table per tab
                    count = 1;
                } else {
                    count = field.length;
                }

                return count;
            };

            updateDtFilterCounter(field.find('tbody tr:not(.hidden)').length, target, field.find('tbody tr').length);

            field.each(function () {
                var ff = $(this),
                    isAllRowsHidden = ff.find('tbody tr:not(.hidden)').length == 0;

                ff.find('thead tr').toggleClass('hidden', isAllRowsHidden);

                // hide empty inputfields (only if there are more than 1)
                if (fieldCount(ff) > 1) {
                    ff.parents('.Inputfield').first().toggleClass('hidden', isAllRowsHidden);
                }
            });

        }, 200));
    }
}


// Translator filter box
function setupTranslatorFilter() {

    var transFilter = $('<div class="transFilter filterbox"><input type="text" autofocus><i class="fa fa-close"></i></div>');

    $('form > .Inputfields > .Inputfield:not(.Inputfield_abandoned_fieldset)').each(function () {

        var $tr = $(this),
            cells = $tr.find('p, span, input'),
            searchStrings = [];

        $.each(cells, function (i, el) {

            // get text from html element, or its value (in case of inputs)
            var text = ((el.innerText || el.textContent) || $(el).val());

            if (text) searchStrings.push(text.trim());
        });

        $tr.attr('data-filter', searchStrings.join(" "));
    });

    // add to DOM
    $('form > .Inputfields').before(transFilter);

    function clearTransFilter(input) {
        input.val('').focus();
        input.parent().removeClass('hasValue');
        // trigger is no-go here
        //input.trigger('fieldchange');
        $('.Inputfield.hidden').removeClass('hidden');
    }

    // show all translations (if "Only show blocks that are not translated" is checked)
    $('.transFilter input').on('click', function () {
        $('input[name="untranslated"]').prop('checked', false);
        $('li.translated').show();
    });

    // clear filterbox on ESC, remove focus on second ESC
    $('.transFilter input').on('keydown', function (e) {

        e = e || window.event;
        var target = e.target || e.srcElement;

        if (e.keyCode === 27) { // ESC
            if (!target.value) {
                target.blur();  // if input is empty, remove focus
            } else {
                setTimeout(function () {
                    clearTransFilter($(target));
                }, 0);
            }
        }
    });

    // click on close X
    $('.transFilter i').click(function (e) {

        e = e || window.event;
        var target = e.target || e.srcElement;

        clearTransFilter($(target).prev('input'));

        return false;
    });

    // filter items
    $(document).on('input keyup fieldchange', '.transFilter input', debounce(function (e) {

        var target = e.target || e.srcElement,
            filter = target.value.toLowerCase(),
            length = filter.length,
            field = $('form > .Inputfields'),
            items = field.children('.Inputfield:not(.Inputfield_abandoned_fieldset)');

        if (!target.value) {
            $(target).parent().removeClass('hasValue');
            clearTransFilter($(target));
            return true;
        }

        $(target).removeClass('empty');
        $(target).parent().addClass('hasValue');

        if (length > 0) {

            var filter_tags = filter.split(" "); // Split user input by spaces

            if (filter_tags.length == 0) return true;

            items.each(function () {

                var row = $(this),
                    itemFilters = row.attr('data-filter'),
                    matches = true;

                // Match each splitted string against the whole tags string
                $.each(filter_tags, function (i, a_filter) {
                    var isFilterMatch = itemFilters.toLowerCase().indexOf(a_filter);
                    if (isFilterMatch === -1) matches = false;
                });

                if (matches) {
                    row.removeClass('hidden');
                } else {
                    row.addClass('hidden');
                }
            });
        }

    }, 200));
}


$(document).ready(function () {

        if (AOSsettings == null) return;

        // set search field position to avoid overlap with Save button (Reno, compactHeader, unchecked headBtnToTitle)
        if ($('html.AdminThemeReno.headStickyCompact:not(.headBtnToTitle):not(.modal)').length) {
            var saveBtnWidth = $('#Inputfield_submit_save_module_copy').outerWidth();
            if (saveBtnWidth && saveBtnWidth != 0) {
                $('#search').attr('style', 'right: ' + (saveBtnWidth + 120 + 24) + 'px !important');
            }
        }

        // add config links to admin themes in Profile page
        $('html.themeConfigLinks [id^="Inputfield_admin_theme_"]').each(function () {
            var $label = $(this).parent('label'),
                theme = $(this).attr('id').slice(23),
                themeConfigUrl = ProcessWire.config.urls.admin + 'module/edit?name=' + theme;

            $label.after('<a href="' + themeConfigUrl + '" class="themeConfigLink" target="_blank"><i class="fa fa-cog"></a>');
        });

        // add "title" to h1
        if ($('h1#title').length) {

            if ($('h1#title > span').length) {
                pageTitle = $('h1#title > span')[0].innerText;
            } else {
                pageTitle = $('h1#title').text();
                $('h1#title').wrapInner('<span>');
            }

            if (pageTitle && pageTitle.length > 64) {
                $('h1#title').attr('title', pageTitle);
            }
        }


        // FieldAndTemplateEditLinks
        if (_isEnabled('FieldAndTemplateEditLinks')) {

            // template edit link on ProcessPageEdit template select field (Settings tab)

            var templateEditSettingsElem = $('#ProcessPageEdit select#template'),
                templateEditSettingsLink = '<a href="#" class="pw-modal aos-template-edit-settings"><i class="fa fa-pencil-square-o"></i></a>';

            if (templateEditSettingsElem.length) {
                templateEditSettingsElem.after(templateEditSettingsLink);
            } else {
                // workaround for scenario: Don't allow pages to be moved + Don't allow pages to change their template (Advanced tab)
                templateEditSettingsElem = $('body[class*="ProcessPageEdit-template-"] #wrap_Inputfield__pw_page_name').next('li.Inputfield').find('i.fa-cubes').parent().parent().find('.InputfieldContent p');
                templateEditSettingsElem.append(templateEditSettingsLink);
            }

            $(document).on('hover', '.aos-template-edit-settings', function () {

                var editLink = $(this);

                if (editLink.prev('select').length) {
                    editLink.attr('href', ProcessWire.config.urls.admin + 'setup/template/edit?id=' + editLink.prev('select').val());
                } else {
                    // changing template is disabled at the Advanced tab (Don't allow pages to change their template?)
                    // get href from the templateEditLink from the main page title
                    if ($('.aos_EditTemplate').length) {
                        editLink.attr('href', $('.aos_EditTemplate').attr('href'));
                    }
                }
            });

            // wrap AdminThemeDefault li.title inner in a span
            $('ul.nav li.title').wrapInner('<span>');

            //$(document).on('mousedown', '#ProcessPageEdit .Inputfield .aos_EditField', function (e) {
            $(document).on('mousedown', '.Inputfield .aos_EditField', function (e) {

                var editFieldLink = $(this).parents('.Inputfield').eq(0).find('.aos_EditFieldLink');

                // right click
                if (e.which == 3) return false;

                if (editFieldLink.length) {

                    // if middle mouse button pressed, open a new page
                    if (e.which == 2 || e.button == 4) {
                        window.open(editFieldLink.attr('href').replace('&modal=1', ''));
                    } else {
                        editFieldLink[0].click();
                    }

                    return false;

                }
            });

            // workaround: add edit links to ajax-loaded fields
            $('.Inputfield:not(.InputfieldPageListSelect)').on('reloaded', function () {
                var field = $(this),
                    label = field.children('label');

                if (!label.length) return;

                if (label.find('span').length === 0) {
                    field.addClass('aos_hasTooltip');
                    var fieldName = label.parent().find('.InputfieldContent .aos_EditFieldLink').attr('data-field-name');

                    if (!fieldName) return;

                    label.contents().eq(0).wrap('<span class="title">');
                    field.find('span.title').append('<em class="aos_EditField">' + fieldName + ' <i class="fa fa-pencil"></i></em>');
                }
            });
        }


        // var $allIcons = $('.InputfieldIconAll > span');
        //
        // if($allIcons.length) {
        //     for(var ii = 0; ii < $allIcons.length; ii++) {
        //         $allIcons[ii].style = '';
        //     }
        // }


// FocusInputOnLangTabSwitch
        if (_isEnabled('FocusInputOnLangTabSwitch')) {

            $(document).on('ready reloaded wiretabclick', function (e) {

                var AAFsettings = AOSsettings.FocusInputOnLangTabSwitch,
                    AAFsettingsCKE = AOSsettings.FocusInputOnLangTabSwitchCKE;

                $('.langTabs').on('tabsactivate', function (e, ui) {

                    //e = e || window.event;

                    var inputs = ui.newPanel.get(0).querySelectorAll('input, textarea');

                    if (inputs.length) {

                        var input = inputs[0],
                            settings;

                        if ($(input).hasClass('InputfieldCKEditorNormal')) {

                            var ckeLoaded = false,
                                ckEditor_id = ui.newPanel.selector.replace('#langTab_', ''),
                                editor = CKEDITOR.instances[ckEditor_id];

                            settings = AAFsettingsCKE;

                            if (editor) {

                                if (input.getAttribute('data-cke-loaded') == "1") {
                                    ckeLoaded = true;
                                } else {
                                    input.setAttribute('data-cke-loaded', "1");
                                }

                                setTimeout(function () {

                                    if (settings == "focus") {
                                        // set focus - this also remembers previous cursor position
                                        editor.focus();

                                    } else if (settings == "moveEnd") {
                                        // move cursor to end

                                        editor.focus();
                                        var element = editor.document.getBody();
                                        var range = editor.createRange();
                                        if (range) {
                                            range.moveToElementEditablePosition(element, true);
                                            range.select();
                                        }

                                        // select all
                                    } else if (settings == "selectAll") {
                                        editor.execCommand('selectAll');
                                    }
                                }, ckeLoaded ? 0 : 300);
                            }

                        } else {
                            // regular text input or textarea
                            settings = AAFsettings;

                            if (settings == "focus") {
                                // focus
                                input.focus();

                            } else if (settings == "moveEnd") {
                                // move cursor at the end
                                input.focus();
                                input.selectionStart = input.selectionEnd = input.value.length;

                            } else if (settings == "selectAll") {
                                // select all text on click
                                input.select();
                            }
                        }
                    }
                });
            });
        }

// Hotkeys
        if (_isEnabled('Hotkeys')) {

            var HotkeysSettings = AOSsettings.Hotkeys,
                BreadcrumbsSettings = ProcessWire.config.AOS_breadcrumbs;


            // on ESC close PW panels
            $(document).on('keydown', function (e) {

                // button is located outside the iframe
                var panelCloseBtn = $('.pw-panel-container-open a.pw-panel-button-open', window.parent.document);

                if (panelCloseBtn.length) {

                    var keyCode = e.keyCode || e.charCode;

                    if (keyCode === 27) {  // ESC
                        e.preventDefault();
                        panelCloseBtn.get(0).click();
                        // put back focus to main document for other hotkeys
                        window.parent.document.body.focus();
                        return false;
                    }
                }
            });


            // focus filterbox on alt+s
            if (HotkeysSettings.indexOf('filterboxHotkey') !== -1) {

                $(document).on('keydown', function (e) {

                    // note: html also has class "filterbox"
                    var filterbox = $('html .filterbox');

                    if (filterbox.length) {

                        var keyCode = e.keyCode || e.charCode;

                        if (e.altKey && keyCode === 83) {  // S
                            e.preventDefault();
                            filterbox.find('input').focus();
                            return false;
                        }
                    }
                });
            }


            // alt+o to open page tree panel
            if (HotkeysSettings.indexOf('addPageTreeTrigger') !== -1) {

                setupCKEpageTreeTrigger();

                $(document).on('keydown', function (e) {

                    var keyCode = e.keyCode || e.charCode,
                        pageTreePanelSelector = 'a.pw-panel[data-tab-icon="sitemap"], .uk-breadcrumb a.pw-panel',  // no better selector than data-tab-icon
                        pageTreePanelBtn = $(pageTreePanelSelector).first();

                    // if panel is focused, the trigger button is outside the iframe
                    if (pageTreePanelBtn.length === 0) {
                        pageTreePanelBtn = $(pageTreePanelSelector, window.parent.document);
                    }

                    if (pageTreePanelBtn.length) {
                        if (e.altKey && keyCode === 79) {   // alt+o
                            aos_togglePageTreePanel();
                        }
                    }

                    function aos_togglePageTreePanel() {

                        // triggering the button twices toggles state
                        pageTreePanelBtn.get(0).click();

                        return false;
                    }
                });
            }


            if (HotkeysSettings.indexOf('removeNoticeHotkey')) {

                function removeNoticeHotkey(e) {

                    var keyCode = e.keyCode || e.charCode;

                    // always remove event because only first keydown should trigger the notice removal
                    $(document).off('keydown', removeNoticeHotkey);

                    if (keyCode === 27) {
                        if ($('a.notice-remove').length) {
                            $('a.notice-remove').first().trigger('click');
                            return false;
                        }
                    }

                    return true;
                }

                if ($('a.notice-remove').length) {
                    $(document).on('keydown', removeNoticeHotkey);
                }
            }


            if (HotkeysSettings.indexOf('breadcrumbTweaks') !== -1 && BreadcrumbsSettings) {

                // add "data-*" markups
                // skip first item in Default admin theme (.pw-panel)
                // skip debug (href #, default theme)
                $('#breadcrumbs a:not(.pw-panel):not([href="#"])').each(function (i) {

                    // Default admin theme has an extra element in the beginning of the breadcrumb
                    if (!BreadcrumbsSettings[i]) {
                        return true;    // = continue
                    }

                    if (BreadcrumbsSettings[i]['url']) {
                        $(this).attr('data-url', BreadcrumbsSettings[i]['url']);
                    }
                    if (BreadcrumbsSettings[i]['editUrl']) {
                        $(this).attr('data-editurl', BreadcrumbsSettings[i]['editUrl']);
                    }
                });

                $('#breadcrumbs').on('longclick', 'a', function (e) {
                    if ($(this).attr('data-url')) {
                        e.preventDefault();
                        var url = $(this).attr('data-url');
                        window.open(url);
                    }
                });

                $('#breadcrumbs').on('click', 'a', function (e) {
                    if ((e.metaKey || e.ctrlKey) && $(this).attr('data-editurl')) {
                        e.preventDefault();
                        var url = $(this).attr('data-editurl');
                        window.location = url;
                    }
                });
            }


            function getSaveButton() {

                var aos_saveButton = false;

                // if CKEditor is maximized (via plugin), return to normal state
                $('.cke_button__maximize.cke_button_on').trigger('click');

                if (window.frameElement && !$('body').hasClass('modal')) {  // in iframe but not in a modal (eg. with FEEL)

                    aos_saveButton = $('.ui-dialog-buttonset button[role="button"]', window.parent.document).eq(0);

                } else {

                    var selectors = '.aos_hotkeySave, #submit_save_unpublished, form#ProcessTemplateAdd #Inputfield_submit, #submit_publish, #Inputfield_submit_save, #submit_save, #ProcessTemplateEdit #Inputfield_submit, #Inputfield_submit_save_field, #Inputfield_submit_save_module, #submit_save_profile, #save_translations'.split(',');

                    $.each(selectors, function (i, selector) {
                        var res = $(selector);
                        if (res.length) {
                            aos_saveButton = res;
                            return false;
                        }
                    });

                    // modal opened, but controls have focus (outside the iframe)
                    if (aos_saveButton.length === 0) {
                        aos_saveButton = $('.ui-dialog-buttonset button[role="button"]').eq(0);
                    }
                }

                return aos_saveButton;
            }


            function aos_triggerSave() {

                // return if there's an open cke dialog (eg. Source)
                if ($('.cke_dialog:visible').length) {
                    if ($('.cke_dialog:visible').find('.cke_dialog_ui_button_ok').length) {
                        aos_saveButton = $('.cke_dialog:visible').find('.cke_dialog_ui_button_ok').first().get(0).click();
                        return false;
                    }
                }

                var aos_saveButton = getSaveButton();

                if (aos_saveButton.length) {

                    var context = $('html');

                    if ($('iframe.pw-modal-window', window.parent.document).length) {
                        context = $('iframe.pw-modal-window', window.parent.document).contents().find('html');
                    }

                    // these are removed on document ready
                    $('body', context).addClass('aos_saving');
                    $('body', context).addClass('ui-state-disabled');
                    // $('#wrap, body.AdminThemeDefault #content, .uk-container#main', context).addClass('ui-state-disabled');

                    // aos_saveButton.addClass('ui-state-disabled').focus();
                    aos_saveButton.addClass('ui-state-disabled');

                    // IE fix
                    setTimeout(function () {
                        aos_saveButton.focus().click();
                    }, 100);
                }
            }


            function setupCKESave() {
                if (window.CKEDITOR) {
                    CKEDITOR.on('instanceReady', function (evt) {

                        evt.editor.addCommand('saveCKECommand', {
                            exec: function (editor, data) {
                                aos_triggerSave();
                            }
                        });
                        evt.editor.keystrokeHandler.keystrokes[CKEDITOR.CTRL + 83 /* ctrl+s */] = 'saveCKECommand';
                    });
                }
            }

            function setupCKEfocusSearch() {
                if (window.CKEDITOR) {

                    CKEDITOR.on('instanceReady', function (evt) {

                        if (HotkeysSettings.indexOf('focusSearch') !== -1) {

                            evt.editor.addCommand('focusSearchBox', {
                                exec: function (editor, data) {
                                    focusSearchBox();
                                }
                            });
                            evt.editor.keystrokeHandler.keystrokes[CKEDITOR.ALT + 68 /* alt+d */] = 'focusSearchBox';
                        }
                    });
                }
            }

            function setupCKEpageTreeTrigger() {
                if (window.CKEDITOR) {
                    CKEDITOR.on('instanceReady', function (evt) {

                        if (HotkeysSettings.indexOf('addPageTreeTrigger') !== -1) {

                            evt.editor.addCommand('pageTreeTrigger', {
                                exec: function (editor, data) {
                                    aos_togglePageTreePanel();
                                }
                            });
                            evt.editor.keystrokeHandler.keystrokes[CKEDITOR.ALT + 79 /* alt+o */] = 'pageTreeTrigger';
                        }
                    });
                }
            }

            if (HotkeysSettings.indexOf('save') !== -1) {

                $(document).on('keydown', function (e) {

                    var keyCode = e.keyCode || e.charCode;

                    if ((e.metaKey || e.ctrlKey) && keyCode === 83) {
                        aos_triggerSave();

                        // intentionally disable browser Save as dialog globally
                        // only inside this function to avoid keydown hijack
                        e.preventDefault();
                    }
                });

                // ctrl+s in CKEditor
                setupCKESave();

                // ctrl+s in CKEditor (repeaters)
                // $(document).on('reloaded', '.Inputfield', function () {
                $(document).on('reloaded', '.InputfieldRepeaterItem', function () {
                    setupCKESave();
                });
            }

            function focusSearchBox(e, blur) {
                var searchBox = $('#ProcessPageSearchQuery, .uk-navbar-right .pw-search-form .pw-search-input').first(),
                    searchBoxValue;

                // try in parent frame (uikit)
                if(searchBox.length === 0) {
                    searchBox = $('#ProcessPageSearchQuery, .uk-navbar-right .pw-search-form .pw-search-input', window.parent.document);
                }

                if (e) {
                    e.preventDefault();
                }

                if (blur) {
                    searchBox.blur();
                    $('#search.open').removeClass('open');
                    return false;
                }

                if (searchBox.is(':focus')) {
                    searchBox.blur();
                } else {
                    // ensure search box visibility
                    $('#search').addClass('open');
                    searchBox.focus();
                    searchBoxValue = searchBox.val() ? searchBox.val().trim() : '';
                    // use zero-width space to trigger autocomplete dropdown
                    searchBox.val('​' + searchBoxValue);
                    searchBox.trigger('keydown');
                }
            }

            if (HotkeysSettings.indexOf('focusSearch') !== -1) {

                setupCKEfocusSearch();

                $(document).on('keydown', function (e) {

                    var keyCode = e.keyCode || e.charCode;

                    if (keyCode === 27) {  // ESC
                        focusSearchBox(e, true);
                        return false;
                    }

                    if (e.altKey && keyCode === 68) {  // alt+d
                        focusSearchBox(e);
                    }
                });
            }
        }

// AsmTweaks
        if (_isEnabled('AsmTweaks')) {
            var AsmTweaksSettings = AOSsettings.AsmTweaks;

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
                            $(this).html($(this).html() + '<em> 100%</em>');
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
        }


// LongClickDuration
        if (_isEnabled('LongClickDuration')) {
            // set custom long click duration
            if (jQuery && jQuery.longclick) {
                if (AOSsettings.LongClickDuration) {
                    jQuery.longclick.duration = parseInt(AOSsettings.LongClickDuration);
                }
            }
        }


// Misc
        if (_isEnabled('Misc')) {

            if (AOSsettings.Misc.indexOf('prevNextLinks') !== -1) {
                var PrevNextLinks = ProcessWire.config.AOS_prevnextlinks;
                if (PrevNextLinks) {

                    var $targetElement = $('h1, li.title span, li.title').first();

                    if ($targetElement.length) {

                        if (PrevNextLinks['prev']) {
                            $targetElement.append('<a href="' + PrevNextLinks['prev']['url'] + '" title="' + PrevNextLinks['prev']['title'] + '" class="aos-edit-prev"><i class="fa fa-angle-left"></i></a>');
                        }

                        if (PrevNextLinks['next']) {
                            $targetElement.append('<a href="' + PrevNextLinks['next']['url'] + '" title="' + PrevNextLinks['next']['title'] + '" class="aos-edit-next"><i class="fa fa-angle-right"></i></a>');
                        }
                    }
                }
            }

            if (AOSsettings.Misc.indexOf('adminColumns') !== -1) {

                // Split.js
                if (window.Split && $('.aos_col_left ~ .aos_col_right').length) {

                    var storageName = $('.aos_col_right').attr('data-splitter-storagekey'),
                        defaultLeft = parseFloat($('.aos_col_left').attr('data-splitter-default')),
                        defaultRight = parseFloat($('.aos_col_right').attr('data-splitter-default')),
                        sizes = localStorage.getItem(storageName) || [defaultLeft, defaultRight];

                    var aos_splitter = Split(['.aos_col_left', '.aos_col_right'], {
                        sizes: typeof sizes === 'string' ? JSON.parse(sizes) : sizes,
                        gutterSize: 12,
                        minSize: 250,
                        onDragEnd: function () {
                            localStorage.setItem(storageName, JSON.stringify(aos_splitter.getSizes()));
                            setSplitterHeight();
                        }
                    });
                }

                function setSplitterHeight() {
                    // set height to 0 before checking parent height
                    !$('.gutter').length || $('.gutter').css('height', 0).css('height', $('.gutter').parent().outerHeight());
                }

                $(window).on('load', function () {
                    setTimeout(function () {
                        setSplitterHeight();
                    }, 2000);
                });

                // restore default splitter position on double-click on splitter
                $(document).on('dblclick', '.aos_col_left + .gutter', function (e) {
                    if (!aos_splitter) return true;
                    aos_splitter.setSizes([defaultLeft, defaultRight]);
                    localStorage.removeItem(storageName);
                });

                // recalculate splitter height on window resize
                $(window).on('resize', function () {
                    setSplitterHeight();
                });


                // check for AdminColumns in tabs
                if ($('#ProcessPageEdit li[data-column-break]').length) {

                    $(document).on('wiretabclick', function (e, elem) {

                        var tabName = elem.attr('id').replace('Inputfield_', ''),
                            tabSelector = '#Inputfield_' + tabName,
                            tabColumnBreaks = $('#ProcessPageEdit li[data-column-break]').attr('data-column-break');

                        if ($(tabSelector).hasClass('aos-columns-ready')) return false;

                        if (tabColumnBreaks) tabColumnBreaks = JSON.parse(tabColumnBreaks);

                        if (tabColumnBreaks[tabName]) {

                            if (!tabColumnBreaks[tabName][0]) return false;

                            var breakField = $('#wrap_Inputfield_' + tabColumnBreaks[tabName][0]),
                                colWidth = tabColumnBreaks[tabName][1] ? tabColumnBreaks[tabName][1] : 67;

                            if (!breakField.length) return false;

                            var aosColBreakIndex = breakField.index() + 1;

                            $(tabSelector + ' > .Inputfields > li:lt(' + aosColBreakIndex + ')').wrapAll('<li class="InputfieldFieldsetOpen aos_col_left" style="width: ' + colWidth + '%;"><div class="InputfieldContent"><ul class="Inputfields">');
                            $(tabSelector + ' > .Inputfields > .aos_col_left ~ li').wrapAll('<li class="InputfieldFieldsetOpen aos_col_right" style="width: ' + (100 - colWidth) + '%;"><div class="InputfieldContent"><ul class="Inputfields">');

                            $(tabSelector).addClass('aos-columns-ready');
                        }
                    });
                }
            }

            // AutosizeTextareas
            if (AOSsettings.Misc.indexOf('autosizeTextareas') !== -1) {

                $(document).on('ready reloaded wiretabclick', function (e) {

                    var target = e.target || e.srcElement,
                        autosizeTextareas = target.querySelectorAll('textarea');

                    if (window.autosize && autosizeTextareas.length) {

                        // try update first (init doesn't work if already initialized)
                        autosize.update(autosizeTextareas);
                        autosize(autosizeTextareas);

                        // force autosize
                        // Array.prototype.forEach.call(autosizeTextareas, function (el, i) {
                        //     el.addEventListener('focus', function () {
                        //         // autosize(el);
                        //         autosize.update(el);
                        //     });
                        // });
                    }
                });

// update textareas when clicking on language tabs
                $(document).on('tabsactivate', '.langTabs', function (e, ui) {

                    var textareas = ui.newPanel.get(0).querySelectorAll('textarea');

                    if (textareas.length && window.autosize && window.autosize.update) {
                        autosize.update(textareas);
                    }
                });
            }
        }

// InputfieldURLChecker
        if (_isEnabled('InputfieldURLChecker')) {

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
                        url = getUrlIUC(obj.val(), link.attr(IUC.dataForceHttp)).trim();

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


            /**
             * Get url with or without "http://"
             *
             * @param url
             * @param forcePrefix
             * @returns {string}
             */
            function getUrlIUC(url, forcePrefix) {
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
        }


// DeselectRadios
        if (_isEnabled('DeselectRadios')) {
            var ADRsettings = AOSsettings.DeselectRadios,
                $radioButtons = $("input:radio");

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
        }

// Tooltips
        if (_isEnabled('Tooltips')) {
            $(document).on('dblclick', 'html.tooltipDesc #content p.description, html.tooltipNotes #content p.notes', function () {
                $(this).toggleClass('tooltip-active');
            });
        }

// PageListThumbs
        if (_isEnabled('PageListThumbs')) {

            $(document).on('mousedown', 'a.aos_pageListLink', function (e) {

                e = e || window.event;

                // allow left and middle click only
                if (e.which === 1) {
                    window.location = $(this).attr('href');
                    return false;
                } else if (e.which === 2) {
                    window.open($(this).attr('href'));
                    return false;
                }
            });
        }

// PageListTweaks
        if (_isEnabled('PageListTweaks')) {


            // pListShowExtras
            if (AOSsettings.PageListTweaks.indexOf('pListShowExtras') !== -1) {

                $(document).on('hover', '.PageListItem', function () {

                    var $extrasToggle = $(this).find('.clickExtras'),
                        $templateEditAction = $(this).find('.PageListActionEdit ~ .PageListActionEdit');

                    if ($extrasToggle.length) {
                        $extrasToggle.trigger('click').remove();

                        if ($(this).find('.PageListActionExtras').length) {
                            $(this).find('.PageListActionExtras').remove();
                        }

                        // move template edit link to the end
                        if ($templateEditAction.length) {
                            $templateEditAction.parent().append($templateEditAction);
                        }
                    }
                });
            }

            // pListIconOnly
            if (AOSsettings.PageListTweaks.indexOf('pListIconOnly') !== -1) {
                // $(document).on("webkitAnimationEnd oanimationend msAnimationEnd animationend", ".PageListerActions a, .PageListActions a", function () {
                //     $(this).addClass('aos-hovered');
                // });
                $(document).on("hover", ".PageListActions a:not([title]), .PageListerActions a:not([title])", function () {
                    $(this).attr('title', $(this).text());
                })
            }

            // pListMiddleClick
            if (AOSsettings.PageListTweaks.indexOf('pListMiddleClick') !== -1) {
                $(document).on('mousedown', '.PageListPage, .actions_toggle', function (e) {

                    if (e.which == 2 || e.button == 4) {

                        var clickedElement = $(this),
                            targetLink;

                        if (e.metaKey || e.ctrlKey) {
                            // Edit
                            targetLink = clickedElement.parent().find('.PageListActionEdit a, .PageEdit');
                        } else {
                            // View
                            targetLink = clickedElement.parent().find('.PageListActionView a, .PageView');
                        }

                        clickedElement.css("pointer-events", "none");

                        if (targetLink.length > 0) {
                            window.open(targetLink.attr('href'));
                        }

                        setTimeout(function () {
                            if (clickedElement.length) {
                                clickedElement.css("pointer-events", "");
                            }
                        }, 200);
                        return false;
                    }
                    return true;
                });
            }

            if (AOSsettings.PageListTweaks.indexOf('pListUnselect') !== -1) {

                $(document).on('pageSelected', function (e, obj) {

                    var clearButton = obj.a.parents('.InputfieldPageListSelect').first().find('button.clear'),
                        restoreButton = obj.a.parents('.InputfieldPageListSelect').first().find('button.restore');

                    if (obj.id !== 0) {
                        clearButton.removeClass('empty');
                    } else {
                        clearButton.addClass('empty');
                    }

                    restoreButton.removeClass('empty').removeClass('initial');
                });

                $(document).on('click', '.aos_pagelist_unselect', function () {

                    var button = $(this),
                        parentEl = button.parent(),
                        input = button.parent().find('input'),
                        //titleElem = button.parent().find('.PageListSelectName .label_title');
                        titleElem = button.parent().find('.PageListSelectName');

                    // try without .label_title (on pageSelected the span disappears)
                    //if (!titleElem.length) {
                    //    titleElem = button.parent().find('.PageListSelectName');
                    //}

                    if (button.hasClass('clear')) {
                        // clear
                        input.removeAttr('value');
                        titleElem.html('');
                        button.addClass('empty');

                        parentEl.find('button.restore[data-value-original!=""]').removeClass('empty');
                        parentEl.find('button.restore').removeClass('initial');
                    } else {
                        // restore
                        input.val(button.attr('data-value-original'));
                        titleElem.html(button.attr('data-title-original'));
                        button.addClass('empty');
                        parentEl.find('button.clear').removeClass('empty');
                    }

                    // if pagelist is open, close it
                    if (parentEl.find('.PageListItemOpen').length) {
                        parentEl.find('a.PageListSelectActionToggle').trigger('click');
                    }

                    // allow dependent fields to update
                    input.trigger('change');

                    return false;
                });
            }
        }


// Misc
        if (_isEnabled('Misc')) {

            // LangTabHotkeySwitcher
            if (AOSsettings.Misc.indexOf('langTabHotkeySwitcher') !== -1) {

                var languagesCount = $('.ui-tabs-nav').eq(0).children('li').length;

                setLangTabSwitcherHotkeys();

                // add custom class because .hasLangTabs is removed on expanding lang tabs
                // needs to be re-added on ctrl+up/right because of ajax loaded fields
                $('.hasLangTabs').addClass('hasLangTabs_');

                function setLangTabSwitcherHotkeys() {

                    var getIndex = function (index, direction) {
                        if (direction === 'down') {
                            return index < 0 ? languagesCount - 1 : index;
                        } else {
                            return index > languagesCount - 1 ? 0 : index;
                        }
                    };

                    function switchLangCKE(ckeID) {

                        var ckeInstance = CKEDITOR.instances[ckeID];

                        ckeInstance.on('contentDom', function () {

                            var editable = this.editable();

                            editable.attachListener(editable, 'keydown', function (e) {

                                var langTabs = $('#' + ckeID).closest('.langTabs'),
                                    index;

                                // left
                                if (e.data.getKeystroke() == CKEDITOR.CTRL + 37) {
                                    index = langTabs.find('ul .ui-tabs-active').index() - 1;
                                    index = getIndex(index, 'down');
                                    return activateLangTab(index);
                                }

                                // right
                                if (e.data.getKeystroke() == CKEDITOR.CTRL + 39) {
                                    index = langTabs.find('ul .ui-tabs-active').index() + 1;
                                    index = getIndex(index, 'up');
                                    return activateLangTab(index);
                                }

                                function activateLangTab(index) {

                                    langTabs.tabs('option', 'active', index);
                                    langTabs.find('input, textarea').eq(index).focus();

                                    var currentCKEinsanceId = langTabs.find('li').eq(index).find('a').attr('href').replace('#langTab_', '');

                                    setTimeout(function () {
                                        CKEDITOR.instances[currentCKEinsanceId].focus();
                                    }, 200);

                                    switchLangCKE(currentCKEinsanceId);
                                }
                            });
                        });
                    }

                    if ($('.InputfieldCKEditor.hasLangTabs').length) {

                        $('.InputfieldCKEditor.hasLangTabs').each(function () {
                            var ckeInstanceId = $(this).find('textarea.FieldtypeTextareaLanguage.InputfieldCKEditorLoaded').eq(0).attr('id');

                            if (ckeInstanceId) {
                                switchLangCKE(ckeInstanceId);
                            }
                        })
                    }

                    $(document).on('keydown', '.LanguageSupport input, .LanguageSupport textarea', function (e) {

                        e = e || window.event;

                        var keyCode = e.keyCode || e.which,
                            arrow = {left: 37, up: 38, right: 39, down: 40},
                            langTabs = $(this).closest('.langTabs'),
                            inputs = langTabs.find('input, textarea'),
                            index;

                        function activateLangTab(index) {
                            langTabs.tabs('option', 'active', index);
                            inputs.eq(index).focus();
                        }

                        if (e.metaKey || e.ctrlKey) {

                            switch (keyCode) {

                                case arrow.left:
                                    // prevent moving cursor
                                    e.preventDefault();

                                    // if ui tabs were destroyed (ctrl-up/down), don't try switching tab
                                    if (!langTabs.hasClass('ui-tabs')) {
                                        index = getIndex(inputs.index($(this)) - 1, 'down');
                                        return inputs.eq(index).focus();
                                    }
                                    index = langTabs.find('ul .ui-tabs-active').index() - 1;
                                    index = getIndex(index, 'down');
                                    return activateLangTab(index);
                                    break;

                                case arrow.right:
                                    e.preventDefault();

                                    // if ui tabs were destroyed (ctrl-up/down), don't try switching tab
                                    if (!langTabs.hasClass('ui-tabs')) {
                                        index = getIndex(inputs.index($(this)) + 1, 'up');
                                        return inputs.eq(index).focus();
                                    }
                                    index = langTabs.find('ul .ui-tabs-active').index() + 1;
                                    index = getIndex(index, 'up');
                                    return activateLangTab(index);
                                    break;

                                case arrow.up:
                                case arrow.down:
                                    e.preventDefault();

                                    // add custom class because .hasLangTabs is removed on expanding lang tabs
                                    langTabs.parents('.hasLangTabs').addClass('hasLangTabs_');

                                    langTabs.parents('.hasLangTabs_').find('.langTabsToggle').trigger('click');

                                    if (langTabs.hasClass('ui-tabs')) {
                                        index = langTabs.find('input, textarea').index($(this));
                                        return activateLangTab(index);

                                    } else {
                                        return this.focus();
                                    }
                                    break;
                            }
                        }
                    });
                }
            }

            // titleCaseToggle
            if (AOSsettings.Misc.indexOf('titleCaseToggle') !== -1) {

                if ($('[id^="Inputfield_title"]').length) {

                    var $titleFields = $('[id^="Inputfield_title"]'),
                        titleCases = {
                            'original': function (string, $btn) {
                                return $btn.attr('data-original');
                            },
                            'Lorem ipsum': function (string) {
                                return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
                            },
                            'Lorem Ipsum': function (string) {
                                return string.replace(/\w\S*/g, function (txt) {
                                    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                                })
                            },
                            'LOREM IPSUM': function (string) {
                                return string.toLocaleUpperCase();
                            },
                            'lorem ipsum': function (string) {
                                return string.toLocaleLowerCase();
                            }
                        };

                    $titleFields.each(function () {

                        var $input = $(this),
                            dataOriginal = '';

                        $input.on('caseChange', function (e, $toggleBtn) {
                            toggleCase($input, $toggleBtn);
                        });

                        // change the original on type
                        $input.on('keyup', function () {
                            if ($input.prev('a.case-toggle').length) {
                                $input.prev('a.case-toggle').attr('data-original', $input.val());
                            }
                        });

                        if ($input.val().length) {
                            dataOriginal = ' data-original="' + $input.val() + '"';
                        }

                        $(this).before('<a class="case-toggle" data-case="original"' + dataOriginal + '><i class="fa fa-font"></i><i class="fa fa-font"></i></a>');
                    });


                    function getMode(currentMode) {

                        var modesArray = Object.keys(titleCases),
                            mode = modesArray[0];

                        if (modesArray.indexOf(currentMode) !== modesArray.length - 1) {
                            mode = modesArray[modesArray.indexOf(currentMode) + 1];
                        }

                        return mode;
                    }

                    function toggleCase($input, $toggleBtn) {

                        var string = $input.val(),
                            mode = getMode($toggleBtn.attr('data-case')),
                            newValue,
                            pageTitleSelector = $('h1#title > span').length ? 'h1#title > span' : 'h1#title';

                        if ($('body.AdminThemeDefault').length) {
                            pageTitleSelector = $('#breadcrumbs li.title > span').length ? '#breadcrumbs li.title span' : '#breadcrumbs li.title';
                        }

                        if (titleCases[mode]) {
                            newValue = titleCases[mode](string, $toggleBtn);
                        }

                        if (newValue && newValue.length) {

                            $input.val(newValue);

                            // #Inputfield_title: only modify page title if it's the default language title input
                            if ($input.attr('id') == 'Inputfield_title' && $(pageTitleSelector).length) {
                                // $(pageTitleSelector).text(newValue);
                                // $(pageTitleSelector).get(0).childNodes[0].nodeValue = newValue;
                                $(pageTitleSelector).contents().filter(function () {
                                    return this.nodeType == 3;
                                }).first().replaceWith(newValue);
                            }

                            $toggleBtn.attr('data-case', mode);
                        }

                        $input.focus();
                    }

                    $(document).on('click', '.case-toggle', function () {

                        var $toggleBtn = $(this),
                            $input = $(this).parent().find('[id^="Inputfield_title"]');

                        if ($input.length) {

                            if (!$input.val()) {
                                // add data-original if it's first click (was empty on start)
                                $toggleBtn.attr('data-original', $input.val());
                            }

                            $input.trigger('caseChange', [$toggleBtn]);
                        }

                        return false;
                    });
                }
            }

            if (AOSsettings.Misc.indexOf('addOrRemoveFieldsTweaks') !== -1) {

                // add "Apply to all" button to set all selects to selected option (add fields to templates, "Actions" tab of Edit field page)
                var addOrRemoveFieldSelects = $('form[action*="./send-templates-save?id="] select');

                if (addOrRemoveFieldSelects.length > 1) {   // only add if there are more than 1 dropdowns
                    var btn = $('<a href="#" class="addOrRemoveApplyButton" title="' + AOSsettings.loc['apply_to_all'] + '"><i class="fa fa-server" aria-hidden="true"></i></a>');
                    addOrRemoveFieldSelects.first().after(btn);

                    btn.on('click', function () {
                        var selectedValue = $(this).prev('select').val();

                        addOrRemoveFieldSelects.each(function () {
                            if ($(this).find('option[value=' + selectedValue + ']').length) {
                                $(this).val(selectedValue);
                            }
                        });
                        return false;
                    });

                    addOrRemoveFieldSelects.on('change', function () {
                        $(this).after(btn);
                    });

                } else if (addOrRemoveFieldSelects.length === 1) {  // show all items if there's only one select
                    var select = addOrRemoveFieldSelects.first();
                    select.attr('size', select.find('option, optgroup').length);
                }

                function checkOrClearCheckboxes(insertAfterSelector, checkboxSelector, formSelector) {

                    if (!$(insertAfterSelector).length || !$(formSelector).length) return false;

                    var insertAfterElem = $(insertAfterSelector).first(),
                        form = $(formSelector),
                        checkAllBtn = $('<a href="#" class="checkAllFieldToRemoveBtn">'),
                        checkboxSelector = (checkboxSelector === '') ? 'input[type="checkbox"]' : checkboxSelector,
                        checkboxes = form.find(checkboxSelector),
                        textCheckAll = AOSsettings.loc['check_all'],
                        textClearAll = AOSsettings.loc['clear_all'];

                    if (!checkboxes.length || checkboxes.length <= 1) return false;

                    checkAllBtn.text(textCheckAll);
                    if ($('#abandoned_fieldset').length) {
                        checkAllBtn.addClass('ui-button ui-priority-secondary');
                    }
                    insertAfterElem.after(checkAllBtn);

                    function batchupdateCheckboxes(e, updateCheckboxes) {

                        if (e.which !== 1) return true; // fire on left click only

                        // use delay to wait for checkbox population
                        setTimeout(function () {
                            var checkedNum = checkboxes.filter('input:checked').length,
                                allNum = checkboxes.length,
                                mode = checkedNum !== allNum;

                            if (updateCheckboxes !== false) {
                                checkboxes.each(function () {
                                    $(this).prop('checked', mode);
                                });
                            }

                            // do not use cached checkedNum here
                            checkAllBtn.text((checkboxes.filter('input:checked').length === allNum) ? textClearAll : textCheckAll);
                        }, 0);
                    }

                    form.on('mouseup', 'label', function (e) {
                        batchupdateCheckboxes(e, false);
                    });

                    checkAllBtn.on('mouseup', function (e) {
                        batchupdateCheckboxes(e);
                    });
                }

                // "Check all" btn (coming from field edit page Actions tab)
                if ($('form[action*="./send-templates-save?id="] input[type="checkbox"]').length) {
                    checkOrClearCheckboxes('#Inputfield_submit', '', 'form[action*="./send-templates-save?id="]');
                }

                // "Check all" btn (coming from template edit page)
                if ($('#Inputfield_submit_remove_fields').length) {
                    checkOrClearCheckboxes('#Inputfield_submit_remove_fields', 'input[name="remove_fields[]"]', 'form[action="removeFields"]');
                }

                // "Check all" btn (abandoned translations)
                if ($('#abandoned_fieldset').length) {
                    // checkOrClearCheckboxes('#abandoned_fieldset .InputfieldCheckbox:eq(-1)', '#abandoned_fieldset input[type="checkbox"]', 'form#InputfieldForm2');
                    checkOrClearCheckboxes('#abandoned_fieldset .description', '#abandoned_fieldset input[type="checkbox"]', 'form#InputfieldForm2');
                }

            }

            // set Home/View site link open in new tab
            if (AOSsettings.Misc.indexOf('homeOpenNewTab') !== -1) {
                var homeIcon = $('body').hasClass('AdminThemeDefault') ? 'fa-eye' : 'fa-home';
                try {
                    $('#topnav i.' + homeIcon).parent('a').attr('target', '_blank');
                } finally {
                }
            }

            // AdminDataTable filter box
            if (AOSsettings.Misc.indexOf('dataTableFilter') !== -1) {
                setupAdminDataTableFilter();
                $(document).on('loaded opened reloaded wiretabclick', function () {
                    setupAdminDataTableFilter();
                });
            }
            // AdminDataTable filter box
            if (AOSsettings.Misc.indexOf('adminLangSwitcher') !== -1) {
                if ($('.aos_adminLangSwitcher').length) {

                    var langSwitcher = $('.aos_adminLangSwitcher');

                    if ($('body').hasClass('AdminThemeReno')) {
                        langSwitcher.prependTo('#topnav');
                    } else if ($('body').hasClass('AdminThemeUikit')) {
                        langSwitcher.prependTo('.pw-user-nav');
                    } else {
                        langSwitcher.appendTo('#topnav');
                        // put inside 'a' to have top menu highlighted on hover
                        $('.aos_adminLangSwitcher > a').append($('.aos_adminLangSwitcher > a + ul'));
                    }

                    langSwitcher.removeAttr('style');

                    langSwitcher.on('click', 'a[data-lang-id]', function () {
                        var lang_id = $(this).attr('data-lang-id');
                        document.cookie = 'aos_lang_id=' + lang_id + ';expires=0;path=/';
                    });
                }
            }

            // Translator filter box
            if (AOSsettings.Misc.indexOf('transFilter') !== -1) {
                if ($('form[action*="?textdomain="]').length) {
                    setupTranslatorFilter();
                }
            }

            // noAnim
            if (AOSsettings.Misc.indexOf('noAnim') !== -1) {
                $.fx.off = true;
            }

            // hoverDropdown
            if (AOSsettings.Misc.indexOf('hoverDropdown') !== -1) {
                $('.pw-dropdown-toggle-click').removeClass('pw-dropdown-toggle-click');
                $('.dropdown-toggle-click').removeClass('dropdown-toggle-click');

                // force align dropdown menus to right of parent button
                $('.pw-button-dropdown.pw-dropdown-menu').attr('data-my', 'right top').attr('data-at', 'right bottom+1');
                $('.pw-button-dropdown.dropdown-menu').attr('data-my', 'right top').attr('data-at', 'right bottom+1');
            }

            // iconsFilter (by Robin S)
            if (AOSsettings.Misc.indexOf('iconsFilter') !== -1 && $('.InputfieldIconAll').length) {

                $('.InputfieldIconAll').before('<input id="icons-filter" class="hidden" placeholder="&#128269">');

                var $filterIcons,
                    hasParentSpan,
                    prev_value;

                $('a.InputfieldIconShowAll').click(function () {
                    $filterIcons = false;   // InputfieldIcons.js currently re-inits on each open
                    $('#icons-filter').toggleClass('hidden').val('').focus();
                });


                $('#icons-filter').on('input keydown', function (e) {

                    var filter_value = $(this).val().trim().toLowerCase().replace(' ', ''),
                        keyCode = e.keyCode || e.charCode || e.which;

                    if (!$filterIcons) {
                        $filterIcons = $('.InputfieldIconAll').children();
                        hasParentSpan = $filterIcons.first().is('span');
                    }

                    // Enter
                    if (keyCode === 13) {
                        e.preventDefault();
                        var $filterIconsVisible = $filterIcons.not('.hidden');

                        if ($filterIconsVisible.length) {
                            $filterIconsVisible.first().trigger('click');
                        }

                        // re-set focus
                        $('#icons-filter').focus();

                        return false;
                    }

                    if (filter_value === prev_value) return;
                    prev_value = filter_value;

                    $filterIcons.removeClass('hidden');

                    if (filter_value) {
                        if (hasParentSpan) {
                            $filterIcons.not(':has([title*=' + filter_value + '])').addClass('hidden');
                        } else {
                            $filterIcons.not('[title*=' + filter_value + ']').addClass('hidden');
                        }
                    }
                });
            }


            // tabIndex
            if (AOSsettings.Misc.indexOf('tabIndex') !== -1) {
                function aos_updateTabIndices() {
                    $('input, textarea, select').each(function (index) {
                        $(this).prop('tabindex', index + 1);
                    });
                }

                $(document).on('ready opened reloaded', function () {
                    aos_updateTabIndices();
                });

                // repeaters
                $(document).on('reloaded', '.InputfieldRepeater', function () {
                    aos_updateTabIndices();
                });

                // profield table
                $(document).on('click', 'a.InputfieldTableAddRow', function () {
                    aos_updateTabIndices();
                });
            }
        }


        // Delete action
        // $(document).on('mousedown', 'a.PageListActionDelete, .PageDelete', function (e) {
        //
        //     e.preventDefault();
        //
        //     if (e.which === 3 || e.which === 2) return false;
        //
        //     var link = $(this),
        //         url = link.attr('href'),
        //         linkTextDefault = AOSsettings.loc['delete_action'];
        //
        //     if (url.indexOf('delete_permanently') === -1) {
        //
        //         var linkCancel;
        //
        //         if (link.hasClass('cancel')) {
        //             linkCancel = link.next('a');
        //
        //             linkCancel
        //                 .removeClass('cancel')
        //                 .removeClass('confirm')
        //                 .attr('href', url.replace('delete_permanently&', 'delete&'))
        //                 .contents().last()[0].textContent = linkTextDefault;
        //
        //             link.replaceWith(linkCancel);
        //
        //             return false;
        //         }
        //
        //         linkCancel = link.clone(true);
        //
        //         link.addClass('confirm');
        //
        //         linkCancel.addClass('cancel')
        //             .contents().last()[0].textContent = ' ' + AOSsettings.loc['cancel'];
        //
        //         // replace text only (keep icon)
        //         link.contents().last()[0].textContent = ' ' + AOSsettings.loc['permanent_delete_confirm'];
        //         link.attr('href', url.replace('delete&', 'delete_permanently&'));
        //
        //         link.before(linkCancel);
        //     }
        //
        //     return false;
        // });

        // Delete + non-superuser Trash actions
        // $(document).on('mousedown', 'a.PageListActionTrash.aos-pagelist-confirm, .PageTrash.aos-pagelist-confirm', function (e) {
        $(document).on('mousedown', 'a.aos-pagelist-confirm', function (e) {

            e.preventDefault();

            if (e.which === 3 || e.which === 2) return false;

            var link = $(this),
                url = link.attr('href'),
                linkTextDefault;

            if (!link.attr('data-text-original')) {

                var currentText = $(this).get(0).childNodes[1] ? $(this).get(0).childNodes[1].nodeValue : $(this).html();

                link.attr('data-text-original', currentText);

                if (link.hasClass('PageListActionDelete') || link.hasClass('PageDelete')) {
                    link.attr('data-text-confirm', AOSsettings.loc['permanent_delete_confirm']);
                }
            }


            if (url.indexOf('&force=1') === -1) {

                var linkCancel;

                linkTextDefault = link.attr('data-text-original');

                if (link.hasClass('cancel')) {
                    linkCancel = link.next('a');

                    linkCancel
                        .removeClass('cancel')
                        .attr('href', link.attr('href').replace('&force=1', ''))
                        .contents().last()[0].textContent = linkTextDefault;

                    link.replaceWith(linkCancel);

                    return false;
                }

                linkTextDefault = link.attr('data-text-confirm') ? link.attr('data-text-confirm') : link.attr('data-text-original');

                linkCancel = link.clone(true);

                linkCancel
                    .addClass('cancel')
                    .contents().last()[0].textContent = ' ' + AOSsettings.loc['cancel'];

                // replace text only (keep icon)
                link.contents().last()[0].textContent = linkTextDefault;
                link.attr('href', link.attr('href') + '&force=1');

                link.before(linkCancel);
            }

            return false;
        });

// ListerTWeaks
        if (_isEnabled('ListerTweaks')) {

            //if (AOSsettings.ListerTweaks_options.indexOf('listerHoverBtn') !== -1) {
            if ($('html').hasClass('listerHoverBtn')) {
                $(document).on('mousedown', '.PageExtras', function () {
                    $(this).parents('td').find('.actions_toggle').trigger('click');
                });
            }
        }


// ModuleTweaks
        if (_isEnabled('ModuleTweaks')) {

            if (AOSsettings.ModuleTweaks.indexOf('moduleModal') !== -1) {

                $('#modules_form td > a')
                    .addClass('pw-modal pw-modal-large pw-modal-longclick')
                    // .addClass('pw-modal')
                    .attr('data-autoclose', '#Inputfield_submit_save_module.needsReload, #Inputfield_submit_save_module_forceClose, #Inputfield_submit_save_module_forceCloseRefresh')
                    .attr('data-buttons', '#Inputfield_submit_save_module, #Inputfield_submit_save_module_forceClose, #Inputfield_submit_save_module_forceCloseRefresh');

                // clone the Submit button (only if in iframe)
                var submitBtn = $('#ModuleEditForm button#Inputfield_submit_save_module');

                if (window.frameElement && submitBtn.length && $('body.modal').length) {

                    var submitBtnClone = submitBtn.clone(false),
                        submitBtnCloneRefresh = submitBtnClone.clone(),
                        loc = AOSsettings.loc;

                    submitBtn.children('.ui-button-text').html(loc['save']);

                    submitBtnClone
                        .attr('id', submitBtn.attr('id') + '_forceClose')
                        .addClass('ui-priority-secondary')
                        .appendTo(submitBtn.parent())
                        .children('.ui-button-text').html(loc['save_and_exit']).before('<i class="fa fa-fw fa-close"></i>');

                    submitBtnCloneRefresh
                        .attr('id', submitBtn.attr('id') + '_forceCloseRefresh')
                        .addClass('ui-priority-secondary')
                        .appendTo(submitBtn.parent())
                        .children('.ui-button-text').html(loc['save_and_reload']).before('<i class="fa fa-fw fa-refresh"></i>');

                    submitBtnClone.on('click', function () {

                        if ($('input#uninstall').is(':checked')) {
                            $(this).addClass('needsReload');
                            $('body', window.parent.document).addClass('needsReload');
                        }
                    });

                    submitBtnCloneRefresh.on('click', function () {
                        $('body', window.parent.document).addClass('needsReload');
                    })
                }

                $('#modules_form td > a').on('pw-modal-closed', function (event, ui) {
                    if ($('body').hasClass('needsReload')) {
                        location.reload();
                    }
                });

                $(document).on('pw-modal-opened', function (event, ui) {
                    // set focus on modal iframe to make ctrl+s work (without clicking on the iframe)
                    setTimeout(function () {
                        if (ui.event.currentTarget && ui.event.currentTarget.contentWindow) {
                            ui.event.currentTarget.contentWindow.focus();
                        }
                    }, 250);
                });

                // add ESC close
                $(document).on('keydown', function (e) {

                    e = e || window.event;
                    var closeBtn = $('.ui-dialog-titlebar-close');

                    if (e.keyCode === 27 && closeBtn.length) { // ESC
                        closeBtn.trigger('click');
                    }
                });
            }

            // flatModules
            if (AOSsettings.ModuleTweaks.indexOf('flatModules') !== -1) {
                if ($('html.flatModules body.id-21').length) {

                    var modulesArray = [],
                        mainTbody = '#modules_form .AdminDataTable:eq(0) tbody',
                        addNewBtn = '<button type="button" id="add_new_button" class="ui-button ui-widget ui-corner-all ui-state-default ui-priority-secondary"><span class="ui-button-text"><i class="fa fa-plus-circle"></i> ' + AOSsettings.loc['add_new'] + '</span></button>',
                        addNewBlock = $('#tab_new_modules'),
                        addNewBlockInput = addNewBlock.find('input:eq(0)'),
                        mainBlock = $('#tab_site_modules'),
                        moduleFilter = $('.moduleFilter');

                    $('#reset_modules').parent().prepend(addNewBtn);

                    $(document).on('click', '#add_new_button', function (e) {

                        var btn = $(this);

                        e.preventDefault();
                        e.stopImmediatePropagation();
                        e.stopPropagation();

                        if (btn.hasClass('active')) {
                            btn.removeClass('active');
                            if (moduleFilter.length) moduleFilter.show();
                            btn.find('i').removeClass('fa-minus-circle').addClass('fa-plus-circle');
                            mainBlock.after(addNewBlock);
                        } else {
                            btn.addClass('active');
                            mainBlock.before(addNewBlock);
                            if (moduleFilter.length) moduleFilter.hide();

                            btn.find('i').addClass('fa-minus-circle').removeClass('fa-plus-circle');

                            // use focus() to jump to block if page is scrolled down
                            addNewBlockInput.focus();
                        }

                        return false;
                    });

                    $('#modules_form p.detail').each(function () {
                        $(this).appendTo('#modules_form');
                    });

                    $('body').removeClass('hasWireTabs');

                    $('#modules_form tbody tr').each(function () {

                        var row = $(this),
                            moduleName,
                            moduleLink;

                        // continue if current row is in thead
                        if (row.parent('thead').length) return true;

                        moduleLink = row.find('a[href*="?name="]');

                        if (moduleLink.length) {
                            moduleName = moduleLink.attr('href').split('?name=')[1].trim();
                        } else {
                            // tab_install_modules
                            moduleLink = row.find('td:first-child > a[href="#"]');
                            moduleName = moduleLink.find('span').attr('data-name');
                        }

                        // some module names aren't in a span
                        if (!moduleName) {
                            //moduleName = row.children('td').first().find('a').text().trim();
                            // there is a "small" html tag inside the link but we need the pure link text
                            moduleName = row.children('td').first().find('a').first()
                                .clone()    //clone the element
                                .children() //select all the children
                                .remove()   //remove all the children
                                .end()  //again go back to selected element
                                .text().trim();
                        }


                        // create modulesArray without duplications
                        if (modulesArray.indexOf(moduleName) === -1) {
                            modulesArray.push(moduleName);
                            // set data-aos-name in each row
                            row.attr('data-aos-name', moduleName);
                            //} else {
                            //row.remove();
                        }
                    });

                    // sort alphabetically (case insensitive)
                    modulesArray.sort(function (a, b) {
                        return a.toLowerCase().localeCompare(b.toLowerCase());
                    });

                    $.each(modulesArray, function (i) {
                        var item = $('#modules_form tr[data-aos-name="' + modulesArray[i] + '"]');
                        item.appendTo(mainTbody);
                    });
                }

                // trigger addnew on url
                if (window.location.href.indexOf('module/?new') !== -1) {
                    setTimeout(function () {
                        // $('.moduleFilter').blur();
                        $('#add_new_button').trigger('click');
                        // $('#download_name').focus();
                    }, 0);

                }
            }

            if (AOSsettings.ModuleTweaks.indexOf('moduleCompact') !== -1) {

                // hack: install modules tab appears below other tabs (probably jquery tab issue)
                //$(window).on('load', function () {
                //    if ($('a#tab_install_modules') && !$('a#_tab_install_modules').hasClass('on')) {
                //        $('#tab_install_modules').css('display', 'none');
                //    }
                //});

                $("form#modules_form > .Inputfields > .Inputfield").each(function () {

                    var tab = $(this),
                        tbody = tab.find("tbody").first();

                    tab.find("tbody tr").each(function () {
                        //if (!$(this).children('th').length) {
                        $(this).appendTo(tbody);
                        //}
                    });
                    tab.find(".modules_section:gt(0)").remove();
                });
            }

            if (AOSsettings.ModuleTweaks.indexOf('moduleFilter') !== -1) {

                // Module Filter

                var hiddenStyle = window.location.href.indexOf('module/?new') !== -1 ? ' style="display: none"' : '',
                    moduleFilter;

                if ($('body.AdminThemeUikit').length != 0) {
                    moduleFilter = $('<div class="filterbox-wrapper Inputfield"><div class="moduleFilter filterbox InputfieldContent "' + hiddenStyle + '><input type="text" autofocus placeholder="Filter modules below" class="uk-input uk-form-width-medium"><i class="fa fa-close"></i><span class="counter"></span></div></div>');
                }
                else {
                    moduleFilter = $('<div class="moduleFilter filterbox"' + hiddenStyle + '><input type="text" autofocus><i class="fa fa-close"></i></div>');
                }

                if ($('#modules_form').length) {

                    // disable column width change when filtering
                    // $('#modules_form').find('table').css('table-layout', 'fixed');

                    $('#modules_form table').each(function () {
                        setColWidths('#' + $(this).attr('id'));
                    });

                    // build search strings and add to rows (tr)
                    $('#modules_form').find('tbody tr').each(function () {

                        var row = $(this),
                            cells = row.children('td'),
                            searchStrings = [];

                        $.each(cells, function (i, el) {
                            var text = (el.innerText || el.textContent),
                                moduleNameEl = el.querySelector('[data-name]'),
                                moduleHrefEl = el.querySelector('a[href^="edit?"]');

                            if (text) searchStrings.push(text.trim());
                            if (moduleNameEl) searchStrings.push(moduleNameEl.getAttribute('data-name').trim());
                            if (moduleHrefEl) searchStrings.push(moduleHrefEl.getAttribute('href').split('name=')[1]);
                        });

                        row.attr('data-filter', searchStrings.join(" "));
                    });

                    // add the search markup
                    $('#modules_form').before(moduleFilter);

                    function clearModuleFilter() {
                        $('.moduleFilter input')
                            .val('')
                            .trigger('keypress')
                            .parent().removeClass('hasValue');

                        $('tr.hidden').removeClass('hidden');
                        $('.modules_section.hidden').removeClass('hidden');
                    }

                    // clear filterbox on ESC, remove focus on second ESC
                    $(document).on('keydown', '.moduleFilter input', function (e) {

                        e = e || window.event;
                        var target = e.target || e.srcElement;

                        if (e.keyCode === 27) { // ESC
                            if (!target.value) {
                                target.blur();  // if input is empty, remove focus
                            } else {
                                setTimeout(function () {
                                    clearModuleFilter();
                                }, 0);
                            }
                        }
                    });

                    // click on close X
                    $(document).on('click', '.moduleFilter i', function () {
                        clearModuleFilter();
                        return false;
                    });


                    $(document).on('keydown', '.moduleFilter input', function (e) {

                        e = e || window.event;

                        var currentTab = $('#modules_form').find('.WireTabs .on'),
                            hasMatchesTabs = $('.WireTabs .hasMatches'),
                            keyCode = e.keyCode || e.charCode || e.which,
                            arrow = {left: 37, up: 38, right: 39, down: 40},
                            tabID,
                            prevTab,
                            nextTab;

                        if (e.metaKey || e.ctrlKey) {

                            var nextMatches = currentTab.parent().nextAll('li').has('.hasMatches'),
                                prevMatches = currentTab.parent().prevAll('li').has('.hasMatches');

                            if (hasMatchesTabs.length < 2) return true;

                            switch (keyCode) {

                                case arrow.left:

                                    e.preventDefault();

                                    prevTab = prevMatches.length ? prevMatches.first() : hasMatchesTabs.last().parent();

                                    currentTab.find('a').removeClass('on');
                                    tabID = prevTab.find('a').attr('id').slice(1);
                                    $('.WireTab').css('display', 'none');
                                    $('.WireTab#' + tabID).css('display', 'block');
                                    prevTab.find('a').addClass('on').trigger('click');
                                    return false;
                                    break;

                                case arrow.right:

                                    e.preventDefault();

                                    nextTab = nextMatches.length ? nextMatches.first() : hasMatchesTabs.first().parent();

                                    currentTab.find('a').removeClass('on');
                                    tabID = nextTab.find('a').attr('id').slice(1);
                                    $('.WireTab').css('display', 'none');
                                    $('.WireTab#' + tabID).css('display', 'block');
                                    nextTab.find('a').addClass('on').trigger('click');
                                    return false;
                                    break;
                            }
                        }
                    });

                    // filter items
                    $(document).on('input keypress keyup fieldchange', '.moduleFilter input', debounce(function (e) {

                        var target = e.target || e.srcElement,
                            filter = target.value.toLowerCase(),
                            field = $('#modules_form').find('.AdminDataTable'),
                            items = field.find('td'),
                            keyCode = e.keyCode || e.charCode,
                            //count = 0,
                            length = filter.length;

                        $('.WireTabs a').removeClass('hasMatches');

                        if (keyCode == 13) {  // Enter
                            if ($('tr:not(.hidden) a').length) {
                                $('tr:not(.hidden) a').first().get(0).click();
                            }
                            return false;
                        }

                        if (!target.value) {
                            clearModuleFilter();
                            return true;
                        }

                        $(target).parent().addClass('hasValue');

                        if (length > 0) {

                            var filter_tags = filter.split(" "); // Split user input by spaces

                            items.each(function () {

                                var $this = $(this).parent('tr'),
                                    matches = true,
                                    itemFilters = $this.attr('data-filter');

                                // Match each splitted string against the whole tags string
                                $.each(filter_tags, function (i, a_filter) {
                                    if (itemFilters.toLowerCase().indexOf(a_filter) === -1) {
                                        matches = false;
                                    }
                                });

                                if (matches) {
                                    $this.removeClass('hidden');

                                    var tabID = '_' + $this.parents('li[id^="tab_"]').first().attr('id');

                                    $('.WireTabs li a#' + tabID).addClass('hasMatches');

                                    //count++;
                                } else {
                                    $this.addClass('hidden');
                                }
                            });

                        } else {
                            items.removeClass('hidden');
                            //count++;
                        }

                        if (!$('html').hasClass('flatModules')) {
                            $('.modules_section').each(function () {
                                $(this).toggleClass('hidden', $(this).find('tbody tr:not(.hidden)').length == 0);
                            });
                        }

                        if (items.filter('.hidden').length == items.length) {
                            // allow escape, backspace, delete, leftarrow keys only
                            if (keyCode == 27 || keyCode == 8 || keyCode == 37 || keyCode == 46) {
                                return true;
                            }
                            return false;
                        }
                    }, 200));
                }
            }
        }

// RenoTWeaks

        if (_isEnabled('RenoTweaks') && $('body').hasClass('AdminThemeReno')) {

            var renoTweaksSettings = AOSsettings.RenoTweaks;

            // hide quicklinks
            var closeQuicklinksTimer;

            $(document).on('mouseleave', 'ul.quicklinks, #main-nav > li > ul > li', function () {
                var speed = $('html').hasClass('sbAutoHide') ? 0 : 400;
                closeQuicklinksTimer = setTimeout(function () {
                    $('ul.quicklinks:visible').removeAttr('style');
                    $('a.quicklinks-open').removeClass('quicklinks-open').children('i').removeClass('active');
                }, speed);
            });
            $(document).on('mouseenter', 'ul.quicklinks, i.quicklink-open', function () {
                if (closeQuicklinksTimer) {
                    clearTimeout(closeQuicklinksTimer);
                }
            });


            // enable single clicking on headers in sidebar
            if (renoTweaksSettings.indexOf('sbSingleClickHeads') !== -1 && renoTweaksSettings.indexOf('sbItemsVisible') !== -1) {

                $('#sidebar > #main-nav > li > a').on('click', function () {
                    window.location.href = $(this).attr('href');
                    return false;
                });
            }

            // miniScrollbar
            if (window.Ps) {

                var sidebarNav = document.querySelector('#main-nav'),
                    // mainContent = document.querySelector('#content'),
                    mainContent = document.querySelector('body:not(.modal-inline) #main'),
                    PsSettings = {
                        wheelSpeed: 2,
                        theme: 'pw-scrollbar',
                        suppressScrollX: true,
                        wheelPropagation: true
                    };

                if (sidebarNav && renoTweaksSettings.indexOf('miniScrollSb') !== -1) {
                    Ps.initialize(sidebarNav, PsSettings);
                }

                if (mainContent && renoTweaksSettings.indexOf('miniScrollMain') !== -1) {
                    Ps.initialize(mainContent, PsSettings);
                }
            }
        }

        // NavItems
        if ($('body[data-navitems]').length) {

            var topNavElem,
                $NavItems = $($('body').attr('data-navitems')),
                topNavHasItems = true;

            if ($('body').hasClass('AdminThemeReno')) {
                topNavElem = $('#main-nav li:eq(0) > ul');
                // non-superusers may not have items in main-nav
                if (!topNavElem.length) {
                    topNavElem = $('#main-nav');
                    topNavHasItems = false;
                }
            } else {
                topNavElem = $('#topnav li:eq(0) .pw-dropdown-menu.topnav');
                if (!topNavElem.length) {
                    topNavElem = $('#topnav li:eq(0) .dropdown-menu.topnav');
                }
            }

            // remove active submenu highlight from Tree
            // if ($('.AdminThemeReno .navItem > a.current').length) {
            // if ($('body').attr('data-navitems')) {
            if ($('.AdminThemeReno').length) {
                $('#main-nav').find('a[data-icon="sitemap"]').find('i.fa-sitemap').remove();
                $('#main-nav').find('a.current').removeClass('current');
            }

            // add 'active' class if submenu has active item
            $('.AdminThemeReno .navItem.hasSubmenu a.current').parents('.hasSubmenu').first().addClass('active');

            if (topNavHasItems) {
                // if ($('.NavItems > li').length) {
                $NavItems.children('li').each(function () {
                    topNavElem.append($(this));
                });
                // }
            } else {
                var firstNavItem = topNavElem.children('li').first();

                firstNavItem.append('<ul>');

                $NavItems.each(function () {
                    firstNavItem.children('ul').append($(this));
                });
            }

            $('body').removeAttr('data-navitems');
            // $('.NavItems').remove();
        }


// PagePreviewBtn
        if (_isEnabled('PagePreviewBtn')) {

            var pageTitleSelector = ($('body').hasClass('AdminThemeDefault') ? '#breadcrumbs li.title' : '#headline #title');

            if ($(pageTitleSelector).length && $('a#_ProcessPageEditView').length) {

                var pageTitle = $(pageTitleSelector),
                    pageViewUrl = $('a#_ProcessPageEditView').attr('href');

                if (pageTitle.children('.pageTitleLink').length == 0) {
                    if (!pageTitle.children('span').length) {
                        pageTitle.wrapInner('<span>');
                    }
                    pageTitle.append('<a href="' + pageViewUrl + '" id="aos_PagePreviewBtn" class="' + AOSsettings.PagePreviewBtn + '" target="_blank"><i class="fa fa-external-link"></i></a>');
                }
            }

            // do not display edit template tooltip on hover
            $("#aos_PagePreviewBtn").hover(
                function () {
                    $(this).prev('.aos_EditTemplate').css('display', 'none');
                }, function () {
                    $(this).prev('.aos_EditTemplate').removeAttr('style');
                }
            );
        }


// RestrictTreeDropdown

        if (_isEnabled('RestrictTreeDropdown')) {

            var RestrictTreeDropdownSettings = AOSsettings.RestrictTreeDropdown;

            if (RestrictTreeDropdownSettings === true) {
                $('a[href$="/page/list/"]').parent('li').remove();  // Default theme
                $('a[href$="/page/"]').children('i.quicklink-open').remove();   // Reno
            }

        }


// FileFieldTweaks

        if (_isEnabled('FileFieldTweaks')) {

            var FileFieldTweaksSettings = AOSsettings.FileFieldTweaks,
                $filterInput = $("<span class='InputfieldFileFieldFilter filterbox'><input placeholder='&#128269;' type='text' /><i class='fa fa-close'></i></span>"),
                filterFieldSelector = '.InputfieldImage.Inputfield:not(.filterbox_loaded), .InputfieldFile.Inputfield:not(.filterbox_loaded)',
                getItemSelector = function (field) {
                    return field.hasClass('InputfieldImage') ? '.gridImage:not(.gridImagePlaceholder)' : '.InputfieldFileItem'
                };


            if (FileFieldTweaksSettings.indexOf('moveAssetButtons') !== -1) {

                $(document).on('click', '.aos_moveAssets i', function () {

                    var parent = $(this).parents('.ui-sortable').first(),
                        button = $(this),
                        currentItem = $(this).parents('li').first(),
                        speed = 300;

                    currentItem.fadeOut(speed, function () {

                        button.is('[data-up]') ? currentItem.prependTo(parent) : currentItem.appendTo(parent);
                        // manually set order (taken from InputfieldFile.js)
                        parent.children("li").each(function (n) {
                            $(this).find(".InputfieldFileSort").val(n);
                        });
                        // trigger form change to trigger confirmation dialog on leave
                        parent.parent().find('input[type="file"]').first().trigger('change');
                        currentItem.fadeIn(speed);
                    });
                })
            }

            if (FileFieldTweaksSettings.indexOf('filterbox') !== -1) {

                // show filterbox when number of images in the field increases above 2
                $(filterFieldSelector).on('DOMNodeInserted.aos_filterbox', function (e) {

                    var target = e.target || e.srcElement,
                        field = $(target).closest('li.Inputfield'),
                        itemSelector = getItemSelector(field);

                    if ($(target).is(itemSelector)) {

                        if (field.find(itemSelector).length >= 2) {

                            field.find('.InputfieldFileFieldFilter').removeAttr('style');

                            // remove event listener
                            field.off('DOMNodeInserted.aos_filterbox');
                        }
                    }
                });

                // insert filterbox to the DOM
                function setupFilterInput(field) {

                    var itemSelector = getItemSelector(field);

                    if ($(filterFieldSelector).length) {

                        field.addClass('filterbox_loaded').find('.InputfieldHeader').append($filterInput.clone());

                        // hide filterbox if the field has less then 2 items to filter
                        if (field.find(itemSelector).length < 2) {
                            field.find('.InputfieldFileFieldFilter').css('display', 'none');
                        }

                        field.find('.InputfieldFileFieldFilter input').attr('list', field.attr('id'));
                    }
                }

                // init filterbox except ajax-loaded fields
                $(filterFieldSelector + ':not(.collapsed10)').each(function () {
                    setupFilterInput($(this));
                });

                $(document).on('opened reloaded', filterFieldSelector, function () {
                    $(filterFieldSelector).each(function () {
                        setupFilterInput($(this));
                    });

                }).on('wiretabclick', function (e, $newTab) {
                    $newTab.find(filterFieldSelector).each(function () {
                        setupFilterInput($(this));
                    });
                });


                // add data-filter attributes + update datalist
                function addFilterTargets(field) {

                    var searchField = field.find('.InputfieldFileFieldFilter input'),
                        fieldId = field.attr('id').replace('_', '').toLocaleLowerCase(),
                        datalistOptions = [],
                        options = "";

                    field.find(getItemSelector(field)).each(function () {

                        var listItem = $(this),
                            listItemName,
                            searchStrings = [];

                        if (listItem.find('.InputfieldImageEdit__name').text() !== '') {
                            searchStrings.push(listItem.find('.InputfieldImageEdit__name').text());
                        }

                        if (listItem.find('.InputfieldFileName').length) {
                            listItemName = listItem.find('.InputfieldFileName');
                            searchStrings.push(listItemName.text());
                            searchStrings.push(listItemName.attr('title'));
                        }

                        searchStrings.push(listItem.find('img').attr('src'));

                        var inputs = listItem.find('input[type="text"]:not(.InputfieldFileSort)');

                        $.each(inputs, function (el) {
                            if (inputs[el].value) {
                                searchStrings.push(inputs[el].value.trim());
                            }
                        });

                        listItem.attr('data-filter', searchStrings.join(" "));

                        datalistOptions.push(searchStrings);
                    });


                    // add/update datalist
                    $.each(datalistOptions, function (index, item) {
                        options += '<option value="' + item[0] + '"></option>';
                    });

                    if (field.find('datalist#' + fieldId).length) {
                        field.find('datalist#' + fieldId).empty().append(options);
                    } else {
                        field.append('<datalist id="' + fieldId + '">' + options + '</datalist>');
                        searchField.attr('list', fieldId);
                    }

                    // try to refresh datalist
                    // field.focus();
                }


                function clearFilterbox(inputField) {
                    // firefox fix
                    setTimeout(function () {
                        inputField.val('');
                        inputField.trigger('keypress').focus();
                        inputField.parent('span').removeClass('hasValue');
                    }, 0);
                }

                // add/update data-filter values
                // hover: firefox hack to make datalist available on first click
                $(document).on('hover click', '.InputfieldFileFieldFilter input', function (e) {

                    var target = e.target || e.srcElement,
                        field = $(target).closest('li.Inputfield');

                    if ($(target).is(':focus')) {
                        return false;
                    }

                    // close editor to append changes
                    field.find('.InputfieldImageEdit__close').trigger('click');
                    addFilterTargets(field);

                    // prevent closing up field on ajax-loaded tab or field or triggering file upload dialog
                    e.stopPropagation();
                    return false;
                });

                // click on close X
                $(document).on('click', '.InputfieldFileFieldFilter i', function (e) {

                    e = e || window.event;
                    var target = e.target || e.srcElement;

                    clearFilterbox($(target).closest('.InputfieldFileFieldFilter').find('input'));
                    return false;
                });

                // clear filterbox on ESC, remove focus on second ESC
                $(document).on('keydown', '.InputfieldFileFieldFilter input', function (e) {

                    e = e || window.event;
                    var target = e.target || e.srcElement;

                    if (e.keyCode === 27) { // ESC
                        if (!target.value) {
                            target.blur();  // if input is empty, remove focus
                        } else {
                            clearFilterbox($(target).closest('.InputfieldFileFieldFilter').find('input'));
                        }
                    }
                });

                // filter items
                $(document).on('input keypress keyup fieldchange', '.InputfieldFileFieldFilter input', debounce(function (e) {

                    var target = e.target || e.srcElement,
                        filter = target.value.toLowerCase(),
                        field = $(target).closest('li.Inputfield'),
                        items = field.find('[data-filter]'),
                        //count = 0,
                        length = filter.length;

                    if (!target.value) {
                        $(target).parent().removeClass('hasValue');
                        items.removeClass('hidden');
                        return true;
                    }

                    $(target).parent().addClass('hasValue');

                    // close edit field
                    field.find('.InputfieldImageEdit__close').trigger('click');

                    if (length > 0) {

                        var filter_tags = filter.split(" "); // Split user input by spaces

                        items.each(function () {

                            var $this = $(this),
                                matches = true,
                                itemFilters = $this.attr('data-filter');

                            if ((typeof itemFilters === typeof undefined || itemFilters === false)) {
                                return;
                            }

                            // Match each splitted string against the whole tags string
                            $.each(filter_tags, function (i, a_filter) {
                                if (itemFilters.toLowerCase().indexOf(a_filter) === -1) {
                                    matches = false;
                                }
                            });

                            if (matches) {
                                $this.removeClass('hidden');
                                //count++;
                            } else {
                                $this.addClass('hidden');
                            }
                        });

                    } else {
                        items.removeClass('hidden');
                        //count++;
                    }

                    if (items.filter('.hidden').length == items.length) {
                        // allow escape, backspace, delete, leftarrow keys only
                        if (e.keyCode == 27 || e.keyCode == 8 || e.keyCode == 37 || e.keyCode == 46) {
                            return true;
                        }
                        return false;
                    }
                }, 200));
            }
        }
    }
);

function setColWidths(tableSelector) {

    setTimeout(function () {

        // use selector instead jQuery object to handle ajax items
        var table = $(tableSelector),
            tab,
            isInsideHiddenTab = false,
            originalStyle;

        if (!table.length || table.find('th').length == 0) return false;

        if (table.parents('.WireTab').not(':visible').length) {
            tab = table.parents('.WireTab').first();
            isInsideHiddenTab = true;
        }

        if (isInsideHiddenTab) {
            originalStyle = tab.attr('style');
            tab.css({position: "absolute", visibility: "hidden", display: "block"})
        }

        table.find('th').each(function () {
            var el = $(this);
            el.css('width', el.outerWidth() + 'px');
        });

        if (isInsideHiddenTab) {
            tab.attr('style', originalStyle);
        }
        ;

    }, 200);
}
