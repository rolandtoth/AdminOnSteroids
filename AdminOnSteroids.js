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

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}


$(document).ready(function () {

    var AOSsettings = AOSsettings || (ProcessWire && ProcessWire.config && ProcessWire.config.AdminOnSteroids) ? JSON.parse(ProcessWire.config.AdminOnSteroids) : null,
        bodyClasses = [],
        htmlClasses = [];

    if (AOSsettings == null) {
        return false;
    }

    // AOS: enable/disable module checkbox click
    $('form[action*="AdminOnSteroids"] #Inputfield_enabled').on('change', function () {
        $('#wrap_Inputfield_enabledSubmodules, #Inputfield_tweaks').toggleClass('aos_disabled', $(this).attr('checked'))
    });

    $(document).on('click', '#ProcessPageEdit .Inputfield > label', function (e) {
        if (e.ctrlKey) {
            var editFieldLink = $(this).parent().find('.aos_editurl');
            if (editFieldLink.length) {
                editFieldLink[0].click();
                return false;
            }
        }
    });

    // edit field
    $(document).on('click', '#ProcessPageEdit .Inputfield > label span', function () {
        var editFieldLink = $(this).parent().parent().find('.aos_editurl');
        if (editFieldLink.length) {
            editFieldLink[0].click();
            return false;
        }
    });


    // HoverSaveDropdown
    // note: copies do not need to modify
    if (AOSsettings.enabledSubmodules.indexOf('HoverSaveDropdown') !== -1) {

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

        if (AOSsettings.Tooltips.indexOf('description') !== -1 || AOSsettings.Tooltips.indexOf('notes') !== -1) {
            htmlClasses.push('aos_tooltips');
        }

        if (AOSsettings.Tooltips.indexOf('description') !== -1) {
            htmlClasses.push('aos_tooltipsDesc');
        }

        if (AOSsettings.Tooltips.indexOf('notes') !== -1) {
            htmlClasses.push('aos_tooltipsNotes');
        }

        if (AOSsettings.Tooltips.indexOf('overlayStyle') !== -1) {
            htmlClasses.push('aos_tooltipsOverlay');
        }

        $(document).on('dblclick', '.aos_tooltipsDesc #content p.description, .aos_tooltipsNotes #content p.notes', function () {
            $(this).toggleClass('tooltip-active');
        });
    }

// fixScrollbarJump
    if (AOSsettings.enabledSubmodules.indexOf('fixScrollbarJump') !== -1) {
        htmlClasses.push('aos_fixScrollbarJump');
    }

// PageListThumbs
    if (AOSsettings.enabledSubmodules.indexOf('PageListThumbs') !== -1) {
        htmlClasses.push('aos_PageListThumbs');
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
        $(document).on('reloaded', '.Inputfield', function () {
            aos_updateTabIndices();
        });

        // profield table
        $(document).on('click', 'a.InputfieldTableAddRow', function () {
            aos_updateTabIndices();
        });
    }


// FileFieldToolbar
    if (AOSsettings.enabledSubmodules.indexOf('FileFieldToolbar') !== -1) {

        htmlClasses.push('aos_fileFieldToolbar');

        if (AOSsettings.FileFieldToolbar.indexOf('filterbox') !== -1) {
            htmlClasses.push('aos_filterbox');
        }
    }

// ModuleTweaks
    if (AOSsettings.enabledSubmodules.indexOf('ModuleTweaks') !== -1) {

        if (AOSsettings.ModuleTweaks.indexOf('modalModuleEdit') !== -1) {

            $('#modules_form td > a')
                .addClass('pw-modal')
                .attr('data-autoclose', '#Inputfield_submit_save_module.needsReload')
                .attr('data-buttons', '#Inputfield_submit_save_module');

            $('#modules_form td > a').on('pw-modal-closed', function (event, ui) {
                if ($('body').hasClass('needsReload')) {
                    location.reload();
                }
            });

            $('#ModuleEditForm button#Inputfield_submit_save_module').click(function () {
                var button = $(this);

                if (window.frameElement) {
                    if ($('input#uninstall').is(':checked')) {
                        // add this class to make the modal auto-close
                        button.addClass('needsReload');
                        // add class to parent frame to check for reload
                        $('body', window.parent.document).addClass('needsReload');
                    }
                }
            });

            htmlClasses.push('aos_modalModuleEdit');
        }


        if (AOSsettings.ModuleTweaks.indexOf('compactModuleList') !== -1) {

            $("form#modules_form > .Inputfields > .Inputfield").each(function () {

                var tab = $(this),
                    tbody = tab.find("tbody:eq(0)");

                tab.find("tr").each(function () {
                    if (!$(this).children('th').length) {
                        $(this).appendTo(tbody);
                    }
                });
            });

            htmlClasses.push('aos_compactModuleList');
        }
    }


// Default admin theme tweaks
    if (AOSsettings.enabledSubmodules.indexOf('AdminTweaks') !== -1 && $('body').hasClass('AdminThemeDefault')) {

        var adminTweaksSettings = AOSsettings.AdminTweaks;

        if (adminTweaksSettings.indexOf('stickyHeader') !== -1) {
            bodyClasses.push('aos_stickyHeader');
        }

        $('body').addClass(bodyClasses.join(" "));
    }


    // RenoTWeaks

    if (AOSsettings.enabledSubmodules.indexOf('RenoTweaks') !== -1 && $('body').hasClass('AdminThemeReno')) {

        var renoTweaksSettings = AOSsettings.RenoTweaks;

        // $('#sidebar').on('longclick', 'a.has-quicklinks', function (e) {
        //     $(this).children('.quicklink-open').trigger('mouseenter');
        //         return false;
        // });


        function setupCheckbox(currentCheckbox) {

            var nextCheckbox = currentCheckbox.parent().parent('li').next('li').find('input');

            if (nextCheckbox.length) {

                if (window.getComputedStyle(nextCheckbox.get(0), null).getPropertyValue('margin-left') !== '0px') {

                    var parentCheckbox = getParentCheckbox(currentCheckbox);

                    // console.log(parentCheckbox.next('span').text());

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
        if (renoTweaksSettings.indexOf('singleClickSidebarHeaders') !== -1 && renoTweaksSettings.indexOf('alwaysVisibleSidebarItems') !== -1) {

            $('#sidebar > #main-nav > li > a').on('click', function () {
                window.location.href = $(this).attr('href');
                return false;
            });
        }

        if (renoTweaksSettings.indexOf('alwaysShowSearch') !== -1) {
            htmlClasses.push('aos_alwaysShowSearch');
        }

        if (renoTweaksSettings.indexOf('compactPageList') !== -1) {
            htmlClasses.push('aos_compactPageList');
        }

        if (renoTweaksSettings.indexOf('stickyHeader') !== -1) {
            htmlClasses.push('aos_stickyHeader');
            if (renoTweaksSettings.indexOf('stickyHeaderCompact') !== -1) {
                htmlClasses.push('aos_stickyHeaderCompact');
            }
        }

        if (renoTweaksSettings.indexOf('stickySidebar') !== -1) {
            htmlClasses.push('aos_stickySidebar');
        }

        if (renoTweaksSettings.indexOf('autoHideSidebar') !== -1) {
            htmlClasses.push('aos_autoHideSidebar');
        }

        if (renoTweaksSettings.indexOf('alwaysVisibleSidebarItems') !== -1) {
            htmlClasses.push('aos_alwaysVisibleSidebarItems');
        }

        if (renoTweaksSettings.indexOf('hideSidebarQuickLinks') !== -1) {
            htmlClasses.push('aos_hideSidebarQuickLinks');
        }

        if (renoTweaksSettings.indexOf('oneLineSidebarSubmenus') !== -1) {
            htmlClasses.push('aos_oneLineSidebarSubmenus');
        }

        if (renoTweaksSettings.indexOf('headButtonNextToTitle') !== -1) {
            htmlClasses.push('aos_headButtonNextToTitle');
        }

        // class added dynamically
        //if (renoTweaksSettings.indexOf('stickyCKEditorToolbar') !== -1) {
        //    htmlClasses.push('aos_stickyCKEditorToolbar');
        //}

        if (renoTweaksSettings.indexOf('closeNoticeButtonToLeft') !== -1) {
            htmlClasses.push('aos_closeNoticeButtonToLeft');
        }

        // miniScrollbar
        if (window.Ps) {

            var sidebarNav = document.querySelector('#main-nav'),
            // var sidebarNav = document.querySelector('#sidebar'),
            //     mainContent = document.querySelector('#main'),
                mainContent = document.querySelector('#content'),
                PsSettings = {
                    wheelSpeed: 2,
                    theme: 'pw-scrollbar',
                    suppressScrollX: true,
                    wheelPropagation: false
                };

            if (sidebarNav && renoTweaksSettings.indexOf('miniScrollbarSidebar') !== -1) {
                Ps.initialize(sidebarNav, PsSettings);
            }

            if (mainContent && renoTweaksSettings.indexOf('miniScrollbarMain') !== -1) {
                console.log('ps');
                Ps.initialize(mainContent, PsSettings);
            }
        }
    }


// DeselectRadios
    if (AOSsettings.enabledSubmodules.indexOf('DeselectRadios') !== -1) {
        htmlClasses.push('aos_deselectRadios');
    }

// NoAnims
    if (AOSsettings.enabledSubmodules.indexOf('NoAnims') !== -1) {
        $.fx.off = true;
        htmlClasses.push('aos_noAnims');
    }

// AsmTweaks
    if (AOSsettings.enabledSubmodules.indexOf('AsmTweaks') !== -1) {

        if (AOSsettings.AsmTweaks.indexOf('collapseAsmSections') !== -1) {
            htmlClasses.push('aos_collapseAsmSections');
        }

        if (AOSsettings.AsmTweaks.indexOf('leftAsmDelete') !== -1) {
            htmlClasses.push('aos_leftAsmDelete');
        }
    }

// PagePreviewLink
    if (AOSsettings.enabledSubmodules.indexOf('PagePreviewLink') !== -1) {

        htmlClasses.push('aos_PagePreviewLink');

        var pageTitleSelector = ($('body').hasClass('AdminThemeDefault') ? '#breadcrumbs li.title' : '#headline #title');

        if ($(pageTitleSelector).length && $('a#_ProcessPageEditView').length) {

            var pageTitle = $(pageTitleSelector),
                pageViewUrl = $('a#_ProcessPageEditView').attr('href');

            if (pageTitle.children('.pageTitleLink').length == 0) {
                pageTitle.append('<a href="' + pageViewUrl + '" id="aos_PagePreviewLink" class="' + AOSsettings.PagePreviewLink + '" target="_blank"><i class="fa fa-external-link"></i></a>');
            }
        }
    }

    $('html').addClass(htmlClasses.join(" "));


// FileFieldToolbar

    if (AOSsettings.enabledSubmodules.indexOf('FileFieldToolbar') !== -1) {

        var FileFieldToolbarSettings = AOSsettings.FileFieldToolbar,
            $filterInput = $("<span class='InputfieldFileFieldFilter'><input placeholder='🔎' /><i class='fa fa-close'></i></span>"),
            filterFieldSelector = '.InputfieldImage.Inputfield:not(.filterbox_loaded), .InputfieldFile.Inputfield:not(.filterbox_loaded)',
            getItemSelector = function (field) {
                return field.hasClass('InputfieldImage') ? '.gridImage:not(.gridImagePlaceholder)' : '.InputfieldFileItem'
            };

        if (FileFieldToolbarSettings.indexOf('filterbox') !== -1) {

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

                    // console.log(listItem.find('.InputfieldFileName').text());

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
                    // var firstItem = item[0];

                    // item.shift();

                    // options += '<option value="' + firstItem + '">' + item.join(" • ") + '</option>';
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
                // $(document).on('hover', '.InputfieldFileFieldFilter input', function (e) {
                // $(document).on('click focus', '.InputfieldFileFieldFilter input', function (e) {
                // $(document).on('hover', '.InputfieldFileFieldFilter input', function (e) {

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
            // $(document).on('keypress keyup fieldchange', '.InputfieldFileFieldFilter input', function (e) {
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
                //if (field.find('.InputfieldImageEdit--active').length) {
                field.find('.InputfieldImageEdit__close').trigger('click');
                //}

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


    if (renoTweaksSettings && renoTweaksSettings.indexOf('stickyCKEditorToolbar') !== -1) {

        var editor_cke_height;
        // isCKEfocused = false;

        // if ($('.aos_stickyCKEditorToolbar .InputfieldCKEditor').length) {
        if ($('.InputfieldCKEditor').length) {

            var $firstCKEditor = $('.InputfieldCKEditor').eq(0);

            var checkstickyCKEditorToolbar = debounce(function () {

                if (!$('html').hasClass('aos_stickyCKEditorToolbar')) {
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
                // var editor_cke_height = cke_toolbar.outerHeight();

                if (topOffset < 70 && bottomOffset > 200) {
                    cke_toolbar.addClass('cke_top_fixed');
                    cke_contents.css('padding-top', editor_cke_height + "px");
                    $('html').addClass('aos_stickyCKEditorToolbar');
                } else {
                    // if (!isCKEfocused || bottomOffset < 70) {
                    // if (!isCKEfocused) {
                    cke_toolbar.removeClass('cke_top_fixed');
                    $('html').removeClass('aos_stickyCKEditorToolbar');
                    cke_contents.css('padding-top', "0px");
                    // }
                }

            }, 0);

            $(window).on('scroll addstickyCKEditorToolbar', function () {
                checkstickyCKEditorToolbar();
            });

            CKEDITOR.on('instanceReady', function (evt) {

                var editor = evt.editor;

                editor_cke_height = $firstCKEditor.find('.cke_top').outerHeight();

                // editor.on('focus', function (e) {
                //     if ('wrap_' + e.editor.name == $firstCKEditor.attr('id')) {
                //         $('html').addClass('aos_stickyCKEditorToolbar');
                //         checkstickyCKEditorToolbar();
                //     }
                // });

                editor.on('selectionChange', function (e) {
                    //if ('wrap_' + e.editor.name == $firstCKEditor.attr('id')) {
                    // allow multlang editor toolbar support
                    if ('wrap_' + e.editor.name.indexOf($firstCKEditor.attr('id')) !== -1) {
                        $('html').addClass('aos_stickyCKEditorToolbar');
                        checkstickyCKEditorToolbar();
                        // isCKEfocused = true;
                    }
                });

                // editor.on('change', function (e) {
                //     if ('wrap_' + e.editor.name == $firstCKEditor.attr('id')) {
                //         $('html').addClass('aos_stickyCKEditorToolbar');
                //         checkstickyCKEditorToolbar();
                //     }
                // });

                editor.on('blur', function (e) {
                    if ('wrap_' + e.editor.name.indexOf($firstCKEditor.attr('id')) !== -1) {
                        // isCKEfocused = false;
                        $firstCKEditor.find('.cke_top').removeClass('cke_top_fixed');
                        $firstCKEditor.find('.cke_contents').css('padding-top', "0px");
                        $('html').removeClass('aos_stickyCKEditorToolbar');
                    }
                });
            });
        }
    }

});


// add "scrolled" body class

var addScrolledBodyClass = debounce(function () {
    var el = document.querySelector('body');
    posTop() > 20 ? el.classList.add('scrolled') : el.classList.remove('scrolled');
}, 120);

['scroll', 'resize', 'load'].forEach(function (e) {
    // window.addEventListener(e, addScrolledBodyClass, false);
    window.addEventListener(e, addScrolledBodyClass);
});


function posTop() {
    return typeof window.pageYOffset != 'undefined' ? window.pageYOffset : document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop ? document.body.scrollTop : 0;
}