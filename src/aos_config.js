function getParentCheckbox(cb) {
    if (window.getComputedStyle(cb.get(0), null).getPropertyValue('margin-left') !== '0px') {
        cb = getParentCheckbox(cb.parent().parent('li').prev('li').find('input'));
    }
    return cb;
}

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

function checkAOSstate(el) {
    $('#wrap_Inputfield_enabledSubmodules, #Inputfield_tweaks, #wrap_Inputfield_restore, #Inputfield_AssetPaths').toggleClass('aos_disabled', !el.is(':checked'));
}

$(window).load(function () {

    if ($('form[action*="AdminOnSteroids"] #Inputfield_enabled').length) {

        var el = $('form[action*="AdminOnSteroids"] #Inputfield_enabled');

        el.on('change', function () {
            checkAOSstate(el);
        });

        checkAOSstate(el);
    }

    if (window.ace && $('#InputfieldAceExtended_FieldOverrides_editor').length) {
        var cke_customizations_editor = ace.edit("InputfieldAceExtended_FieldOverrides_editor");
        cke_customizations_editor.setOption("maxLines", 80);
        cke_customizations_editor.$blockScrolling = Infinity;
        // cke_customizations_editor.setOption("minLines", 2);
    }

    //$('.asmList').sortable('option', 'grid', [20, 10]);
    //$('.asmList').sortable('option', 'axis', null);
    //$('.asmList').sortable('refresh');
});



$(document).ready(function () {

        // initialize syntax highlight and autosize/autogrow for CKEditor customization textarea
        if (window.CodeMirror) {

            var fieldOverrides_textarea = document.getElementById('Inputfield_FieldOverrides');

            if (fieldOverrides_textarea) {
                CodeMirror.fromTextArea(fieldOverrides_textarea, {
                    lineNumbers: true,
                    mode: 'properties',
                    theme: 'twilight',
                    viewportMargin: Infinity,
                    indentAuto: true,
                    lineWrapping: true
                });
                // minHeight: .CodeMirror-scroll min-height in CSS
            }
        }

        // apply AOS tweaks real-time
        var html = $('html'),
            isRenoTheme = !!(html.hasClass('AdminThemeReno')),
            isDefaultTheme = !!(html.hasClass('AdminThemeDefault'));

        $(document).on('click', '#Inputfield_tweaks input[type="checkbox"]', function () {

            var checkbox = $(this),
                currentId = checkbox.attr('id'),
                idArray = currentId.split('_');

            if (currentId.indexOf('AdminTweaks') !== -1 && isRenoTheme ||
                currentId.indexOf('RenoTweaks') !== -1 && isDefaultTheme
            ) return true;

            html.toggleClass(idArray[idArray.length - 1]);
        });

        // AOS LongClick slider (module options page)
        var $longClickElem = $("#Inputfield_LongClickDuration");

        if ($longClickElem.length) {

            var longClickMin = 600,
                longClickMax = 3000,
                longClickUnit = ' ms',
                longClickStep = 100,
                $longClickSlider = $("<div id='longClickSlider'></div>"),
                columnWidthVal = parseInt($longClickElem.val());

            function sliderTooltip(ui) {
                var curValue = (ui && ui.value) || $longClickElem.val(); // current value (when sliding) or initial value (at start)
                var tooltip = '<div class="sliderTooltip"><div class="sliderTooltip-inner ui-button"><span>' + curValue + '</span>' + longClickUnit + '</div><div class="sliderTooltip-arrow"></div></div>';

                $('.ui-slider-handle').html(tooltip); //attach tooltip to the slider handle
            }

            $longClickElem.val(columnWidthVal);
            $longClickElem.after($longClickSlider);
            $longClickSlider.slider({
                range: 'min',
                step: longClickStep,
                min: longClickMin,
                max: longClickMax,
                value: parseInt($longClickElem.val()),
                slide: function (e, ui) {
                    var val = ui.value;
                    $longClickElem.val(val);
                    sliderTooltip(ui);
                },
                create: function (e, ui) {
                    sliderTooltip(ui);
                }
            });

            // update the slider if the columnWidth field is changed manually
            $longClickElem.change(function () {
                var val = parseInt($(this).val());
                if (val > longClickMax) val = longClickMax;
                if (val < longClickMin) val = longClickMin;
                if (val % longClickStep != 0) val = Math.round(val / 100) * 100;
                $(this).val(val);
                $longClickSlider.slider('option', 'value', val);
                sliderTooltip();
            });
        }


        // config jumplinks
        if ($('.Inputfield_enabledSubmodules').length) {

            var configLink = '<a class="configLink" title="Configure"><i class="fa fa-cog"></a>';

            $('#wrap_Inputfield_enabledSubmodules input[id^="Inputfield_enabledSubmodules_"]').each(function () {

                var input = $(this),
                    submoduleName = input.attr('id').replace('Inputfield_enabledSubmodules_', ''),
                    target = '#wrap_Inputfield_' + submoduleName;


                if (!$(target).length) {
                    target = '#Inputfield_' + submoduleName;
                }

                if (!$(target).length) return true;

                configLink = $(configLink).clone().attr('href', target);

                input.next('span').after(configLink);
            });
        }


        // move role asmSelect to submodules section
        //$('#Inputfield_enabledSubmodules_AdminLangSwitcher + span').after($('#wrap_Inputfield_AdminLangSwitcherRoles'));
        $('#wrap_Inputfield_enabledSubmodules .InputfieldCheckboxesStacked li span').each(function () {
            var obj = $(this),
                current = obj.parent().children('input').attr('id').replace('enabledSubmodules_', '');

            obj.after($('#wrap_' + current + 'Roles'));
        });


    // assetPaths: add buttons to check 404 response

            if ($('#Inputfield_AssetPaths').length) {

                var assetCheckBtnText = 'Check',
                    $assetCheckBtn = $('<button id="asset-check-button">' + assetCheckBtnText + '</button>');


                $('#Inputfield_AssetPaths').on('focus', 'input', function () {
                    $assetCheckBtn.html(assetCheckBtnText);
                    $assetCheckBtn.removeClass();
                    $(this).parents('.Inputfield').first().find('label').append($assetCheckBtn);
                });


                // add button to the first visible opened inputfield
                var $visibleAssetInput = $('#Inputfield_AssetPaths .Inputfield:not(.InputfieldStateCollapsed)');
                if ($visibleAssetInput.length) {
                    $visibleAssetInput.first().find('label').append($assetCheckBtn);
                }

                function UrlExists(url, cb) {
                    $.ajax({
                        url: url,
                        // dataType: 'text',
                        type: 'HEAD',
                        cache: false,
                        complete: function (xhr) {
                            if (typeof cb === 'function')
                                cb.apply(this, [xhr.status]);
                        }
                    });
                }

                function showResult(result) {

                    var icon, className;

                    if(result === true) {
                        icon = 'check';
                        className = 'success';
                    } else if(result === false) {
                        icon = 'exclamation-triangle';
                        className = 'error';
                    } else if (result === 'forbidden') {
                        icon = 'question-circle';
                        className = 'forbidden';
                    }

                    $assetCheckBtn.html(assetCheckBtnText);
                    $assetCheckBtn.addClass(className);

                    $assetCheckBtn.html(assetCheckBtnText + '<i class="fa fa-' + icon + '">');
                }

                $assetCheckBtn.on('click', function () {
                    var $input = $(this).parents('.Inputfield').first().find('input'),
                        url = $input.val();

                    if (!url || url.length === 0) {
                        $input.focus();
                        return false;
                    }
                    ;

                    $assetCheckBtn.html(assetCheckBtnText);
                    $assetCheckBtn.removeClass();

                    var rootUrl = window.location.origin + ProcessWire.config.urls.root,
                        baseUrl = url.indexOf('http') === -1 ? rootUrl : '';

                    url = (url[0] === '/') ? url.substr(1) : url;
                    url = (baseUrl + url).trim();

                    UrlExists(url, function (status) {
                        if (status === 200) {
                            showResult(true);
                        }
                        else if (status === 403) {
                            showResult('forbidden');
                        }
                        else {
                            showResult(false);
                        }
                    });

                    return false;
                });
            }


        // js tweaks to form configuration page
        //if ($('form[action*="AdminOnSteroids"]').length) {

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
        //}

        /**
         * Add placeholder to asmSelect
         * Selector: http://stackoverflow.com/questions/10641258/jquery-select-data-attributes-that-arent-empty#answer-23944081
         */
        $(function () {
            $('select[data-asm-placeholder!=""][data-asm-placeholder]').each(function () {

                var placeholder = $(this).data('asmPlaceholder');

                if (placeholder) {
                    $(this).parent().find('.asmSelect option:first').attr({
                        'selected': true,
                        'disabled': true
                    }).text(placeholder);
                }
            });
        });
    }
);
