Admin On Steroids
========================

Various admin utilities to enhance ProcessWire admin.


## Install

1. Install the module as usual (see help [here](http://modules.processwire.com/install-uninstall/)).

1. Enable or disable submodules and tweak their settings.

1. Save the module to apply settings.

To uninstall follow the uninstall instructions on the link above.


## Submodules


###AutosizeTextareas

*Autosize textareas according to content*

Adds auto-grow functionality to fit textarea to its content. The submodule has no settings to configure.



###DeselectRadios

*Enable clearing checked radio buttons*

Once checked, a radio button can't be cleared. This submodule removes this limitation.

By default required fields can't be deselected but it can be enabled tweaking the submodule's settings.

####Settings

- **Only for SuperUsers**: disable the feature for non-SuperUsers
- **Allow also for required fields**: enable unchecking for required fields too



###FocusInputOnLangTabSwitch

*Focus input on switching language tabs*

Saves an extra click to activate text input, textarea or CKEditor when switching on language tabs.

####Settings

- **Focus**: activates the target input so the previous cursor position is restored.
- **Move cursor to the end**: sets the cursor to the end of the input's content
- **Select all**: selects all content of the target input
- **Do nothing**: disables setting focus for the current field type

Settings can be configured separately for CKEditor settings.



###LangTabHotkeySwitcher

*Switch language tabs on ctrl+arrow keys*

Enables switching language tabs on multilanguage fields using ctrl+right, ctrl+left hotkeys. Also adds ctrl+up, ctrl+down hotkeys to collapse/expand language fields. The latter doesn't work on CKEditor fields.



###LongClickDuration

*Custom long-click action duration*

Long-clicking on Edit or View links on the Page tree opens a modal to edit/view the page. The default value is 600 milliseconds which you can modify here. Note that you can add only greater value than the default.
