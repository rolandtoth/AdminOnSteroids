Admin On Steroids
========================

Various admin hacks to enhance ProcessWire admin.


## Install

1. Install the module as usual (see help [here](http://modules.processwire.com/install-uninstall/)).

1. Enable or disable submodules and tweak their settings.


To uninstall follow the uninstall instructions on the link above.


## Submodules



###AutosizeTextareas

*Autosize textareas according to content*

Adds auto-grow functionality to fit textarea to its content. The submodule has no settings to configure.



###HoverSaveDropdown

*Show save dropdown on hover instead on click*

Hovering on the Save button in the page editor shows the dropdown menu instantly instead on click.



###DeselectRadios

*Enable clearing checked radio buttons*

Once checked, a radio button can't be cleared. This submodule removes this limitation.

By default required fields can't be deselected but it can be enabled tweaking the submodule's settings.



###AsmTweaks

*asmSelect tweaks*

####Settings

- **Collapse fieldset/tab items on double click**: collapse or expand children items when double-clicking on the starting or ending asmSelect fieldset/tab item.
- **Move delete button to the left**: moves the delete icon to the beginning of the bar, making easier to delete items on wide screens.



###FileFieldToolbar

*Add filter box and sort buttons to file fields*

####Settings

- **filterbox**: add a text input next to field label to filter images (or files). If there's no match typing is not allowed. You can clear the input clicking on the "X" button on the right or using the Escape key. The filter box is visible only if there are at least 2 items to filter (changed dynamically on uploading items).



###PagePreviewLink

*Add preview link next to page title*

When enabled, an "eye" icon will be added next to the page title that links to the front-end target of the edited page. The target can be set to new tab/modal/panel.



###Hotkeys

*Hotkey tweaks*

####Settings

- **Save on ctrl+s**: save current page, even from within CKEditor. Works on various pages, eg. when editing Templates, Fieds, Roles, etc. Also disables the default browser Save as dialog even if there's no submit button on the page.



###FocusInputOnLangTabSwitch

*Focus input on switching language tabs*

Saves an extra click to activate text input, textarea or CKEditor when switching on language tabs.

####Settings

- **Focus**: activates the target input so the previous cursor position is restored
- **Move cursor to the end**: sets the cursor to the end of the input's content
- **Select all**: selects all content of the target input
- **Do nothing**: disables setting focus for the current field type

Settings can be configured separately for CKEditor settings.

**Bonus**: ctrl+clicking on a language tab will activate all the language tabs of the same language on current page. This can be handy for quickly checking content of other languages.



###LangTabHotkeySwitcher

*Switch language tabs on ctrl+arrow keys*

Enables switching language tabs on multilanguage fields using ctrl+right, ctrl+left hotkeys. Also adds ctrl+up, ctrl+down hotkeys to collapse/expand language fields. The latter doesn't work on CKEditor fields.



###LoadCollapsedModuleInfos

*Load module info fields collapsed*

When entering a module page in the admin the info field may occupy much of the screen. Checking this tweak will load them collapsed so more of their configuration fields will be visible.



###Prevent page jump when the scrollbar appears

*Prevent page jump when scrollbar appears*

Disable page jump and elements repositioning when the height of the page changes and the scrollbar appears or disappears.



###LongClickDuration

*Custom long-click action duration*

Long-clicking on Edit or View links on the Page tree opens a modal to edit/view the page. The default value is 600 milliseconds which you can modify here. Note that you can add only greater value than the default.



###AdminTweaks

*Apply default admin theme tweaks*

A few usability mods targetting the default admin theme.

- **Make header sticky**: stick the header to the top of the browser window so it stays in place when scrolling down



###RenoTweaks

*Apply Reno theme tweaks*

A few usability mods targetting the Reno admin theme.

- **Sticky header**: stick the header to the top of the browser window so it stays in place when scrolling down
- **Compact sticky header**: hide the masthead to save vertical space. Search field and top naviation links are moved to the header, plus the main form tabs are set to fixed position (sticky). Available only if sticky header is on.
- **Sticky CKEditor toolbar**: stick the CKEditor toolbar below the sticky header to make it always available. Currently works with only the first CKEditor on the page and is available only if sticky header is on. The toolbar is set to sticky only if the editor is focused. Clicking outside the editor or if the editor goes offscreen on page scroll will hide the toolbar.
- **Sticky sidebar**: stick the sidebar to the top to make it always visible
- **Autohide sidebar on left**: auto hide the sidebar so it's accessible by moving the mouse to the left side of the screen
- **Always show sidebar items (disable accordion)**: make sidebar submenus more compact and do not hide them
- **Single click sidebar headers**: by default the sidebar header links need double-click to open the corresponding menu page because single click is used by the accordion. This tweak will remove this limitation. It's available only if "Always show sidebar items" tweak is on.
- **Always show search field**: make the search field always available
- **Place header button next to the main title**: moves the top (cloned) main button next to the title to make it easier to reach
- **Hide sidebar quick links (flash icons)**: this will hide the quicklink icons from the sidebar. Use this if you don't use this feature and/or you would like to make easier to click on submenu items
- **One-line sidebar submenus (only with autoHideSidebar)**: if AutoHideSidebar setting is on, using this will force the sidebar submenu items to be in one row (the sidebar width will grow)
- **Move notice close buttons to the left**: put the close button of the notice message to the left for easier access