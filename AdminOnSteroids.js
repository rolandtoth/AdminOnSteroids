// add "scrolled" body class
var addScrolledBodyClass = debounce(function () {
    var el = document.querySelector('body');
    posTop() > 20 ? el.classList.add('scrolled') : el.classList.remove('scrolled');
}, 120);

['scroll', 'resize', 'load'].forEach(function (e) {
    window.addEventListener(e, addScrolledBodyClass);
});

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


$(document).ready(function () {


    var AOSsettings = AOSsettings || (ProcessWire && ProcessWire.config && ProcessWire.config.AdminOnSteroids) ? JSON.parse(ProcessWire.config.AdminOnSteroids) : null;

    if (AOSsettings == null) {
        return false;
    }

    // AOS: enable/disable module checkbox click
    $('form[action*="AdminOnSteroids"] #Inputfield_enabled').on('change', function () {
        $('#wrap_Inputfield_enabledSubmodules, #Inputfield_tweaks').toggleClass('aos_disabled', $(this).attr('checked'))
    });


    if ($('.aos_adminLangSwitcher').length) {

        var langSwitcher = $('.aos_adminLangSwitcher');

        if ($('body').hasClass('AdminThemeReno')) {
            langSwitcher.prependTo('#topnav');
        } else {
            langSwitcher.appendTo('#topnav');
        }

        langSwitcher.removeAttr('style');

        langSwitcher.on('click', 'a', function () {
            var lang_id = $(this).attr('data-lang-id');
            document.cookie = 'aos_lang_id=' + lang_id  + ';expires=0;path=/';
        });
    }


    // FieldAndTemplateEditLinks
    if (AOSsettings.enabledSubmodules.indexOf('FieldAndTemplateEditLinks') !== -1) {
        $(document).on('click', '#ProcessPageEdit .Inputfield .aos_EditField', function () {
            var editFieldLink = $(this).parents('.Inputfield').eq(0).find('.aos_EditFieldLink');
            if (editFieldLink.length) {
                editFieldLink[0].click();
                return false;
            }
        });
        // workaround: add edit links to ajax-loaded fields
        $('.Inputfield').on('reloaded', function () {
            var field = $(this),
                label = field.find('label');

            if (!label.length) return false;

            if (label.find('span').length == 0) {
                var fieldName = label.parent().find('.InputfieldContent .aos_EditFieldLink').attr('data-field-name');

                if (!fieldName) return false;

                label.contents().eq(0).wrap('<span class="title">');
                field.find('span.title').append('<em class="aos_EditField">' + fieldName + ' <i class="fa fa-pencil"></i></em>');
            }
        });
    }


// HoverDropdown
    if (AOSsettings.enabledSubmodules.indexOf('HoverDropdown') !== -1) {

        $('.dropdown-toggle-click').removeClass('dropdown-toggle-click');

        // force align dropdown menus to right of parent button
        $('.pw-button-dropdown.dropdown-menu').attr('data-my', 'right top').attr('data-at', 'right bottom+1');
    }

// LongClickDuration
    if (AOSsettings.enabledSubmodules.indexOf('LongClickDuration') !== -1) {
        // set custom long click duration
        if (jQuery && jQuery.longclick) {
            if (AOSsettings.LongClickDuration) {
                jQuery.longclick.duration = parseInt(AOSsettings.LongClickDuration);
            }
        }
    }

// Tooltips
    if (AOSsettings.enabledSubmodules.indexOf('Tooltips') !== -1) {
        $(document).on('dblclick', 'html.tooltipDesc #content p.description, html.tooltipNotes #content p.notes', function () {
            $(this).toggleClass('tooltip-active');
        });
    }

// PageListThumbs
    if (AOSsettings.enabledSubmodules.indexOf('PageListThumbs') !== -1) {

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


// tabIndex
    if (AOSsettings.enabledSubmodules.indexOf('TabIndex') !== -1) {

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

// ModuleTweaks
    if (AOSsettings.enabledSubmodules.indexOf('ModuleTweaks') !== -1) {

        if (AOSsettings.ModuleTweaks.indexOf('moduleModal') !== -1) {

            $('#modules_form td > a')
                .addClass('pw-modal')
                .attr('data-autoclose', '#Inputfield_submit_save_module.needsReload, #Inputfield_submit_save_module_forceClose, #Inputfield_submit_save_module_forceCloseRefresh')
                .attr('data-buttons', '#Inputfield_submit_save_module, #Inputfield_submit_save_module_forceClose, #Inputfield_submit_save_module_forceCloseRefresh');

            // clone the Submit button (only if in iframe)
            var submitBtn = $('#ModuleEditForm button#Inputfield_submit_save_module');

            if (window.frameElement && submitBtn.length) {

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


        if (AOSsettings.ModuleTweaks.indexOf('moduleCompact') !== -1) {

            $("form#modules_form > .Inputfields > .Inputfield").each(function () {

                var tab = $(this),
                    tbody = tab.find("tbody:eq(0)");

                tab.find("tr").each(function () {
                    if (!$(this).children('th').length) {
                        $(this).appendTo(tbody);
                    }
                });
            });
        }
    }


// RenoTWeaks

    if (AOSsettings.enabledSubmodules.indexOf('RenoTweaks') !== -1 && $('body').hasClass('AdminThemeReno')) {

        var renoTweaksSettings = AOSsettings.RenoTweaks;

        function setupCheckbox(currentCheckbox) {

            var nextCheckbox = currentCheckbox.parent().parent('li').next('li').find('input');

            if (nextCheckbox.length) {

                if (window.getComputedStyle(nextCheckbox.get(0), null).getPropertyValue('margin-left') !== '0px') {

                    var parentCheckbox = getParentCheckbox(currentCheckbox);

                    var isChecked = parentCheckbox.is(':checked');
                    nextCheckbox.parent().parent('li').toggleClass('disabled', !isChecked);
                    // note: setting to disabled won't save the value
                }

                setupCheckbox(nextCheckbox);
            }
        }

        function getParentCheckbox(cb) {

            if (window.getComputedStyle(cb.get(0), null).getPropertyValue('margin-left') !== '0px') {
                cb = getParentCheckbox(cb.parent().parent('li').prev('li').find('input'));
            }

            return cb;
        }

        // js tweaks to form configuration page
        if ($('form[action*="AdminOnSteroids"]').length) {

            var RenoTweaksSelector = '#wrap_Inputfield_RenoTweaks';

            $(RenoTweaksSelector + ' input[type="checkbox"]').on('change', function () {
                setupCheckbox($(this));
            });

            // do not allow checking checkboxes if it's parent is set to disabled
            $(RenoTweaksSelector).on('click', 'li.disabled input[type="checkbox"]', function (e) {
                e.preventDefault();
                return false;
            });

            setupCheckbox($(RenoTweaksSelector + ' li:eq(0) input[type="checkbox"]'));
        }


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
                mainContent = document.querySelector('#main'),
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
    if ($('.NavItems').length) {

        var topNavElem,
            topNavHasItems = true;

        if ($('body').hasClass('AdminThemeReno')) {
            topNavElem = $('#main-nav li:eq(0) > ul');
            // non-superusers may not have items in main-nav
            if (!topNavElem.length) {
                topNavElem = $('#main-nav');
                topNavHasItems = false;
            }
        } else {
            topNavElem = $('#topnav li:eq(0) .dropdown-menu.topnav');
        }

        // remove active submenu highlight from Tree
        if ($('.AdminThemeReno .navItem > a.current').length) {
            $('#main-nav').find('a[data-icon="sitemap"]').find('i.fa-sitemap').remove();
            $('#main-nav').find('a.current').removeClass('current');
        }

        if (topNavHasItems) {
            $('.NavItems li').each(function () {
                topNavElem.append($(this));
            });
        } else {
            var firstNavItem = topNavElem.children('li').first();

            firstNavItem.append('<ul>');


            $('.NavItems li').each(function () {
                firstNavItem.children('ul').append($(this));
            });
        }

        $('.NavItems').remove();
    }

// NoAnims
    if (AOSsettings.enabledSubmodules.indexOf('NoAnims') !== -1) {
        $.fx.off = true;
    }

// PagePreviewBtn
    if (AOSsettings.enabledSubmodules.indexOf('PagePreviewBtn') !== -1) {

        var pageTitleSelector = ($('body').hasClass('AdminThemeDefault') ? '#breadcrumbs li.title' : '#headline #title');

        if ($(pageTitleSelector).length && $('a#_ProcessPageEditView').length) {

            var pageTitle = $(pageTitleSelector),
                pageViewUrl = $('a#_ProcessPageEditView').attr('href');

            if (pageTitle.children('.pageTitleLink').length == 0) {
                pageTitle.wrapInner('<span>').append('<a href="' + pageViewUrl + '" id="aos_PagePreviewBtn" class="' + AOSsettings.PagePreviewBtn + '" target="_blank"><i class="fa fa-external-link"></i></a>');
            }
        }
    }

    //PageListUnselect
    if (AOSsettings.enabledSubmodules.indexOf('PageListUnselect') !== -1) {

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
                titleElem = button.parent().find('.PageListSelectName .label_title');

            // try without .label_title (on pageSelected the span disappears)
            if (!titleElem.length) {
                titleElem = button.parent().find('.PageListSelectName');
            }

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

            return false;
        });
    }


// FileFieldTweaks
    if (AOSsettings.enabledSubmodules.indexOf('FileFieldTweaks') !== -1) {

        var FileFieldTweaksSettings = AOSsettings.FileFieldTweaks,
            $filterInput = $("<span class='InputfieldFileFieldFilter'><input placeholder='🔎' /><i class='fa fa-close'></i></span>"),
            filterFieldSelector = '.InputfieldImage.Inputfield:not(.filterbox_loaded), .InputfieldFile.Inputfield:not(.filterbox_loaded)',
            getItemSelector = function (field) {
                return field.hasClass('InputfieldImage') ? '.gridImage:not(.gridImagePlaceholder)' : '.InputfieldFileItem'
            };

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
                        searchStrings = [];

                    if (listItem.find('.InputfieldImageEdit__name').text() !== '') {
                        searchStrings.push(listItem.find('.InputfieldImageEdit__name').text());
                    }

                    if (listItem.find('.InputfieldFileName').length) {
                        searchStrings.push(listItem.find('.InputfieldFileName').text());
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
            $(document).on('input keypress keyup fieldchange', '.InputfieldFileFieldFilter input', function (e) {

                var target = e.target || e.srcElement,
                    filter = target.value.toLowerCase(),
                    field = $(target).closest('li.Inputfield'),
                    items = field.find('[data-filter]'),
                    count = 0,
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
                            count++;
                        } else {
                            $this.addClass('hidden');
                        }
                    });

                } else {
                    items.removeClass('hidden');
                    count++;
                }

                if (items.filter('.hidden').length == items.length) {
                    // allow escape, backspace, delete, leftarrow keys only
                    if (e.keyCode == 27 || e.keyCode == 8 || e.keyCode == 37 || e.keyCode == 46) {
                        return true;
                    }
                    return false;
                }
            });
        }
    }


    if (renoTweaksSettings && renoTweaksSettings.indexOf('stickyCKEBar') !== -1) {

        var editor_cke_height;

        if ($('.InputfieldCKEditor').length) {

            var $firstCKEditor = $('.InputfieldCKEditor').eq(0);

            var checkstickyCKEBar = debounce(function () {

                if (!$('html').hasClass('stckyckdtrtlbr')) {
                    return false;
                }

                if ($(document).width() < 960 || !$firstCKEditor) {
                    return false;
                }

                var cke_toolbar = $firstCKEditor.find('.cke_top'),
                    cke_contents = $firstCKEditor.find('.cke_contents');

                if (!cke_toolbar.length) {
                    return false;
                }

                var topOffset = $firstCKEditor.offset().top - posTop();
                var bottomOffset = $firstCKEditor.offset().top + $firstCKEditor.height() - posTop();

                if (topOffset < 70 && bottomOffset > 200) {
                    cke_toolbar.addClass('cke_top_fixed');
                    cke_contents.css('padding-top', editor_cke_height + "px");
                    $('html').addClass('stckyckdtrtlbr');
                } else {
                    cke_toolbar.removeClass('cke_top_fixed');
                    $('html').removeClass('stckyckdtrtlbr');
                    cke_contents.css('padding-top', "0px");
                }

            }, 0);

            $(window).on('scroll addstickyCKEBar', function () {
                checkstickyCKEBar();
            });

            CKEDITOR.on('instanceReady', function (evt) {

                var editor = evt.editor;

                editor_cke_height = $firstCKEditor.find('.cke_top').outerHeight();

                editor.on('selectionChange', function (e) {
                    // allow multlang editor toolbar support
                    if ('wrap_' + e.editor.name.indexOf($firstCKEditor.attr('id')) !== -1) {
                        $('html').addClass('stckyckdtrtlbr');
                        checkstickyCKEBar();
                    }
                });

                editor.on('blur', function (e) {
                    if ('wrap_' + e.editor.name.indexOf($firstCKEditor.attr('id')) !== -1) {
                        // isCKEfocused = false;
                        $firstCKEditor.find('.cke_top').removeClass('cke_top_fixed');
                        $firstCKEditor.find('.cke_contents').css('padding-top', "0px");
                        $('html').removeClass('stckyckdtrtlbr');
                    }
                });
            });
        }
    }
});
