AdminOnSteroids
========================

Various ProcessWire admin tweaks to boost productivity. 

See more at

 - [AdminOnSteroids on ProcessWire forums](https://processwire.com/talk/topic/13389-adminonsteroids/)
 - [AdminOnSteroids on ProcessWire Modules Directory](http://modules.processwire.com/modules/admin-on-steroids/)



## Install

1. Install the module as usual (see help [here](http://modules.processwire.com/install-uninstall/)).

1. Enable or disable submodules and tweak their settings.


## Uninstall

Follow the uninstall instructions on the link above.

**Restore settings on next install**

Check this checkbox at the bottom of the module to create a file "settings.php" in the module's directory on uninstall containing module data. This file will be imported on next install so you can continue where you have left off.

Additionally you can copy this file to other ProcessWire installations to use the same settings. Make sure to copy the file before installing the module.

Note: the module has to be saved first if you change this feature to take effect. The file also needs to be writable.


## Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Enable module](#enable-module)
- [Submodules](#submodules)
  - [AdminTweaks](#admintweaks)
  - [AsmTweaks](#asmtweaks)
  - [CKEaddons](#ckeaddons)
  - [DeselectRadios](#deselectradios)
  - [FieldAndTemplateEditLinks](#fieldandtemplateeditlinks)
  - [FileFieldTweaks](#filefieldtweaks)
  - [FocusInputOnLangTabSwitch](#focusinputonlangtabswitch)
  - [Hotkeys](#hotkeys)
  - [InputfieldURLChecker](#inputfieldurlchecker)
  - [ListerTweaks](#listertweaks)
  - [LongClickDuration](#longclickduration)
  - [Misc](#misc)
  - [ModuleTweaks](#moduletweaks)
  - [NavItems](#navitems)
  - [PageListThumbs](#pagelistthumbs)
  - [PageListTweaks](#pagelisttweaks)
  - [PagePreviewBtn](#pagepreviewbtn)
  - [RenoTweaks](#renotweaks)
  - [Tooltips](#tooltips)
- [Add custom CSS or JavaScript to the admin](#add-custom-css-or-javascript-to-the-admin)
- [Extra classes added to "body" tag](#extra-classes-added-to-body-tag)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


## Enable module

Checkbox to toggle enable/disable state of the module.

There's another way to do this: there's a link in the bottom of the footer "AdminOnSteroids enabled" (on any admin page).
Clicking on this link will also enable/disable the module (and reloads the current page). Available only for SuperUsers.


## Submodules

This section provides an overview of the available submodules. Each can be enabled or disabled by toggling their checkboxes in the submodule's "panel".

If a submodule is configurable, its panel has a "cog" icon in the bottom-right corner. Clicking on it the page scrolls down to its options.

*Available submodules (v0.8.3):*

![Submodules](https://github.com/rolandtoth/adminonsteroids/raw/master/img/aos-submodules.png "Submodules")

**Restrict submodules by role**

Each submodule has a dropdown "Roles" where you can restrict them by roles. You can find it in the top-right corner in the Submodules section, next to each item's title.
By default each submodule is available for all roles. Adding a role will restrict the submodule to users having that role.


*Roles dropdown:*

![Roles](https://github.com/rolandtoth/adminonsteroids/raw/master/img/aos-roles.png "Roles")

Notes:

- restrictions are not applied to SuperUsers
- some submodule is available as SuperUser-only and the roles dropdown is not available for them


**Disable submodule or tweak from code**

Besides the option to restrict submodules by roles it is possible to use the `AdminOnSteroids::modifyConfigData` hook to disable a submodule or a tweak inside a submodule.

This is more flexible because you can use custom conditions, eg. remove the sticky header only if the user's name is 'BigBoss' or the page you edit has the 'news' template.

The hook has two arguments that you can use:

- the module's entire config data
- the edited Page (or false if it's not applicable)

There are two helper methods you can use:

- `AdminOnSteroids::disableSubmodule` to disable a submodule. Parameters: submodule name, config array
- `AdminOnSteroids::disableTweak` to disable a tweak. Parameters: submodule name, tweak name, config array

Example:

```
wire()->addHookAfter('AdminOnSteroids::modifyConfigData', function (HookEvent $event) {

    $data       = $event->arguments[0];
    $editedPage = $event->arguments[1];

    // disable submodule/tweak by template name
    if ($editedPage && $editedPage->template->name == 'news') {

        // disable submodule
        $data = \AdminOnSteroids::disableSubmodule('NavItems', $data);
        $data = \AdminOnSteroids::disableSubmodule('PageListThumbs', $data);

        // remove tweak from submodule
        $data = \AdminOnSteroids::disableTweak('Tooltips', 'tooltipOverlay', $data);
        $data = \AdminOnSteroids::disableTweak('FileFieldTweaks', 'filterbox', $data);
    }

    // disable submodule/tweak by role name
    if ($this->user->hasRole('editor')) {

        // disable submodule
        $data = \AdminOnSteroids::disableSubmodule('Tooltips', $data);

        // remove tweak from submodule
        $data = \AdminOnSteroids::disableTweak('RenoTweaks', 'headSticky', $data);
        $data = \AdminOnSteroids::disableTweak('RenoTweaks', 'sbSticky', $data);
    }

    $event->return = $data;
});
```

The best place to add the hook is "init.php" but it may work elsewhere too.

You can enable a submodule simply by adding the submodule's name to the enabledSubmodules array (inside the hook):

```
$configData['enabledSubmodules'][] = 'RenoTweaks';
```


### AdminTweaks

*Apply default admin theme tweaks*

A few usability mods targetting the default admin theme.

- **Make header sticky**: stick the header to the top of the browser window so it stays in place when scrolling down
- **Set wider main content**: sets the max-width of the main content from 1200px to 1600px
- **Show pagelist actions on full row hover**: makes pagelist actions visible on hovering anywhere in the pagelist, not only on the page title



### AsmTweaks

*asmSelect tweaks*

- **Collapse fieldset/tab items on double click**: collapse or expand children items when double-clicking on the starting or ending asmSelect fieldset/tab item.
- **Move delete button to the left**: moves the delete icon to the beginning of the bar, making easier to delete items on wide screens.
- **Edit field in new tab on middle click (no template context)**: when editing a template clicking on fields in the asmField opens up the field for editing in a modal, using the current template as the context. If this tweak is enabled you can use the middle mouse button to open the field edit page without the template context.
- **Template editor: add clickable field width percentages and display divisions on width slider**: this tweak will add inputfield width percentage to the right side of asmList items. Clicking on it will bring up the field edit modal opened at the Input tab where you can edit the field's width easily. The "Column width" slider of fields will get a background SVG showing the main divisions (20,30,...,90). 

*asmSelect field after enabling AsmTweaks:*

![AsmTweaks](https://github.com/rolandtoth/adminonsteroids/raw/master/img/aos-asmtweaks.png "AsmTweaks")

*Template editor width divisions:*

![Width divisions](https://github.com/rolandtoth/adminonsteroids/raw/master/img/aos-width-divisions.png "Width divisions")



### CKEaddons

*Autoload CKEditor plugins and skins*

**Plugins**

You can select from these plugins to add to CKEditor enabled fields:

- [Auto Grow](http://ckeditor.com/addon/autogrow)
- [Auto Link](http://ckeditor.com/addon/autolink)
- [Auto Save](http://ckeditor.com/addon/autosave)
- [CodeMirror](http://ckeditor.com/addon/codemirror) (available when viewing editor Source)
- [Div](http://ckeditor.com/addon/div) (adds a toolbar button)
- [Find](http://ckeditor.com/addon/find) (adds toolbar buttons)
- [Justify](http://ckeditor.com/addon/justify) (adds text-align toolbar buttons)
- [Keep TextSelection](http://ckeditor.com/addon/textselection) - thanks **Robin S**!
- [Keystrokes](https://processwire.com/talk/topic/12768-anyone-successfully-added-ckeditor-shortcut-keys/?do=findComment&comment=116190)
- [Magic Line](http://ckeditor.com/addon/magicline)
- [Maximize](http://ckeditor.com/addon/maximize) (unavailable in inline mode)
- [Media (oEmbed)](http://ckeditor.com/addon/oembed) (adds a toolbar button)
- [Show Blocks](http://ckeditor.com/addon/showblocks) (adds a toolbar button)
- [Table Cells Selection](http://ckeditor.com/addon/ckeditortablecellsselection)

If a plugin adds toolbar items then they will be added to the beginning of the toolbar.
The order of the asmField items determine the order of the toolbar buttons.

The oEmbed plugin requires the "HTML purifier" to be turned off for the CKEditor field to work, otherwise iframes will be removed on saving the page.

The Keep TextSelection plugin currently doesn't work with the dialog source mode but only with the "default" source mode. You'll have to add this command "Source" to your field's toolbar configuration manually, or you can use ctrl+u if you have enabled the Keystrokes plugin from the list.

*CKEaddons configuration section:*

![CKEaddons](https://github.com/rolandtoth/adminonsteroids/raw/master/img/aos-ckeaddons.png "CKEaddons")

**Skin**

Here you can choose from the default and [LightWire](http://modules.processwire.com/modules/editor-skin-lightwire/) skins. The LightWire skin is made by **nico**.

Note that the setting "Enabled fields" has no effect on the skin.

*CKEditor field toolbar with extra plugins and LightWire skin:*

![CKEaddons-editor](https://github.com/rolandtoth/adminonsteroids/raw/master/img/aos-ckeaddons-editor.png "CKEaddons-editor")

**Enabled fields**

By default all CKEditor fields will load the plugins you enable.
Here you can restrict the submodule to selected fields only.

**Custom config and style**


You can set custom path to CSS and JavaScript files in the "Asset paths" section in the module (at bottom of the page).
Paths should be relative to the site root, eg.

`
site/templates/scripts/cke.js
`

You can use the "CKE/sample-cke.js" file from the module's directory to start with.
Options entered to the field's "Custom Config Options" will be preserved (and they have priority).

Similarly you can enter a custom path to a CSS file and that will be used if the file exists, and if there's nothing set in the field's "Custom Editor CSS File" setting (Input tab).



### DeselectRadios

*Enable clearing checked radio buttons*

Once checked, a radio button can't be cleared. This submodule removes this limitation.

By default required fields can't be deselected but it can be enabled tweaking the submodule's settings.



### FieldAndTemplateEditLinks

*Add shortcut links to templates and fields (SuperUser only)*

When enabled, hovering on a field's label in the page edit screen will show the field's name in a toolip.
Clicking on this tooltip will open the field edit page in a new window, modal or panel (depending on module settings).

When using the default theme, the template edit link appears on hovering the last breadcrumb element.

**Template edit links in the main pagelist**

A new pagelist action is added to the items as the last item if the submodule is enabled.
Note that this template edit link doesn't respect the target you've set in the module settings, clicking on them always load the template edit page in the same page (you can use the middle mouse button to open in a new tab). Long-click can be used to open it in a modal window.

*Template edit link when hovering on a page title:*

![TemplateEditLink](https://github.com/rolandtoth/adminonsteroids/raw/master/img/aos-templateeditlink.png "TemplateEditLink")

*Template edit link on pagelist:*

![TemplateEditLinkPagelist](https://github.com/rolandtoth/adminonsteroids/raw/master/img/aos-templateeditlink-pagelist.png "TemplateEditLinkPagelist")

*Edit link on field hover:*

![FieldEditLink](https://github.com/rolandtoth/adminonsteroids/raw/master/img/aos-fieldeditlink.png "FieldEditLink")



### FileFieldTweaks

*File and image field enhancements*

- **Filter box**: add a text input next to field label to filter images (or files). If there's no match typing is not allowed. You can clear the input clicking on the "X" button on the right or using the Escape key. The filter box is visible only if there are at least 2 items to filter (changed dynamically on uploading items).
- **Add asset download link**: adds download links (icons) to image or file assets. In case of images, the icon is located to the right of the Edit buttons after you click on an image. The original image will be available for download. For file fields the icon is appended to the fields' label. Note: the download link uses the "download" HTML5 attribute which is not available n IE - in this case the link will open in a new tab/window.
- **Show image titles in image select dialog**: by default when inserting an image to a CKEditor field the image select dialog shows images without titles. Check this to add titles to the images. If there's no title (which you can enter to the "description" field for images) the text "Untitled" will be shown. Under the title the name and extension of the image is shown.

*Filter box and download asset link:*

![FilefieldTweaks](https://github.com/rolandtoth/adminonsteroids/raw/master/img/aos-filefieldtweaks.png "FilefieldTweaks")

*Show image titles in the image select dialog:*

![ShowImageTitles](https://github.com/rolandtoth/adminonsteroids/raw/master/img/aos-filefieldtweaks-imagetitles.png "ShowImageTitles")



### FocusInputOnLangTabSwitch

*Focus input on switching language tabs*

Saves an extra click to activate text input, textarea or CKEditor when switching on language tabs.

- **Focus**: activates the target input so the previous cursor position is restored
- **Move cursor to the end**: sets the cursor to the end of the input's content
- **Select all**: selects all content of the target input
- **Do nothing**: disables setting focus for the current field type

Settings can be configured separately for CKEditor fields.



### Hotkeys

*Hotkey tweaks*

- **Save on ctrl+s**: save current page, even from within CKEditor. Works on various pages, eg. when editing Templates, Fieds, Roles, etc. Also disables the default browser Save as dialog even if there's no submit button on the page.
- **Add long-click and ctrl+click actions to breadcrumbs**: if enabled, long-click on a breadcrumb item will open the corresponding front-end page in a new tab/window, and holding the Ctrl key when clicking on them will navigate to their edit screen.
- **Focus search on alt+d**: focuses the top search field on alt+d hotkey. Use ESC to remove focus.
- **Remove notices on first ESC keypress**: if the very first keypress when a page loads in the admin is ESC, it will remove system notice messages (if any). This is a quick way to close them without clicking on the notice close button.
- **Open page tree panel on alt+o**: opens/closes the page tree panel on alt+o hotkey if enabled (works from within CKEditor too).
- **Focus filterbox on alt+s**: focus filterbox on alt+s hotkey (if filterboxes are enabled in the module).

*Overlay and flashing save icon after hitting ctrl+s:*

![Hotkeys](https://github.com/rolandtoth/adminonsteroids/raw/master/img/aos-hotkeys-save-overlay.png "Hotkeys")



### InputfieldURLChecker

*Add button or hotkey to FieldtypeURL to check URL*

Enhance URL fields with a button to check typed url. It can open the URL in a new window, panel or modal. Comes with hotkey modes too.

- **Mode**: button and/or hotkey modes. The button mode has an additional setting to place it in the left or right side of the field.
- **Open URL in...**: URLs can be opened in a new tab (default), or in a modal. **Note**: modal mode will fail if the target website doesn't allow embedding.
- **Force HTTP prefix**: if checked, links will always have "http://" prefix, even if the field itself doesn't contain it. This ensures opening external links instead of relative ones. However, if the URL starts with "/" then it is treated as an internal URL and no prefix will be prepended.
- **Enabled templates and Enabled fields**: here you can set templates and/or fields where the module will be enabled. If none selected, module will be active on all templates and all URL type fields. Note: if used, the module will be disabled on all non-listed fields/templates.

Note: for button modes you can use the middle mouse button to open the URL in a new browser tab.

*Test link button added to an URL field:*

![InputfieldURLChecker](https://github.com/rolandtoth/adminonsteroids/raw/master/img/aos-inputfieldurlchecker.png "InputfieldURLChecker")



### ListerTweaks

*Lister enhancements*

This submodule lets you set the default columns in the Find and Users listers.

- **Find lister columns**: here you can select the fields for the Find lister (found under the Pages section in the sidebar/topnav).
- **Users lister columns**: here you can select the fields for the Users lister (found under the Access section in the sidebar/topnav).
- **Lister options**:
  - Show action buttons on hover: action buttons will appear on hovering on lister rows (instead on click)
  - Hide template edit action: by default if you enable the FieldAndTemplateEditLinks submodule listers will also have an extra template edit action button. Here you can disable it.

**[DEFAULTS] field**

There is a special field called [DEFAULTS] which is a placeholder for the default fields, eg. 'name, email, roles' in case of the Users lister. You can add fields before or after this special field to add extra columns easily. The module will automatically set this field if you remove all fields and on install.

Lister bookmarks are not affected by these settings.

Note: the "Columns" tab in the listers may not show the correct fields for the asmSelect field.



### LongClickDuration

*Custom long-click action duration*

Long-clicking on Edit or View links on the Page tree opens a modal to edit/view the page. The default value is 600 milliseconds which you can modify here. Note that you can add only greater value than the default.



### Misc

*Miscellaneous tweaks*

- **noAnim**: Disable all CSS and JavaScript animations in the admin to make things feel more snappy.

- **Add helper buttons to batch field add/remove confirmation pages**: when selecting fields for deletion, the confirmation page will show an extra button "Check All". This can be used to check/uncheck all items for deletion. The same "Check all" button is available for the abandoned translations too. Additionally, when adding a field to multiple templates, this tweak will add a button next to the active "Add field before/after field ..." dropdown to update all dropdowns with the currently selected value (if applicable). Eg. after selecting "After body" in on dropdown you can update all other dropdowns to "After body". Furthermore, if there's only one select box it will be expanded to make it easier to select an item.
- **Center login form**: align login page items to center
- **Open Home/View site in new tab (topnav)**: clicking on the "Home" in the top-right corner will open in a new tab
- **Add filter box to AdminDataTables**: adds a search-as-you-type filter box to various tables in the admin, eg. Fields, Templates, Logs, Users, Roles etc (where AdminDataTables are used). Only one filter box is added per page even if there are more tables (eg. when Fields are grouped using tags). You can use the enter key to open the first item (only if it has a link). To clear the filter box use the ESC key or click on the "X" button. *Hint*: use the exclamation mark ("!") character to invert the results. For example, if you search for "English" in the Users lister and then typing an exclamation mark the lister will show users not having "English". You can add the "!" before or after the keyword: both "!English" and "English!" will work.
- **Add filter box to Language Translator**: adds a filter box the Language Translator page.
- **Add "aos_column_break" field to create admin columns*: this tweak installs a field named "aos_column_break" that you can add your templates to have a 2-column layout. The field's position in the template field list determines the columns: fields before it will go to the left column, fields after to the right. Just drag the aos_column_break field to a position where you need the break.
- **Show save dropdown on hover instead on click**: hovering on the Save button in the page editor shows the dropdown menu instantly instead on click.
- **Switch language tabs on ctrl+arrow keys**: nables switching language tabs on multilanguage fields using ctrl+right, ctrl+left hotkeys. Also adds ctrl+up, ctrl+down hotkeys to collapse/expand language fields. The latter doesn't work on CKEditor fields.
 **Autosize textareas according to content**: adds auto-grow functionality to fit textarea to its content. The submodule has no settings to configure. Note: CKEditor fields are not supported - use the CKEaddons submodule (v0.6.1+) and enable the [Auto Grow](http://ckeditor.com/addon/autogrow) plugin to autosize CKEditors.
- **Add sequential tabindex to fields**: enables jumping to next input in the admin with TAB key (or backwards with shift+TAB). By default the TAB key jumps to the next input on second or third trigger only (depending on whether there are language tabs or other buttons in the field wrap), this tweak fixes it.
- **Add toggle button to change case of Page title field**: adds a button to the right side of the title field which allows looping through cases of the text (original, sentence case, capitalize, uppercase, lowercase). Changing the default language title will change the main page title too.
- **Add language switcher to the admin**: this tweak will add a dropdown to the main navigation that allows changing the admin language. Page names, the admin interface will be loaded in the selected language, and the page edit screen will also load the language in that language. The language switcher uses a cookie so the language will be remembered even though the user's profile is actually not saved. Note that in the Default theme it's added to the end of the top menu items while in Reno it's the first.
- **Move empty trash confirmation checkbox above trash items**: moves the confirmation checkbox on the "Empty trash" page to the top, making it easier to check if there are many items in the trash.

*Admin language switcher:*

![AdminLangSwitcher](https://github.com/rolandtoth/adminonsteroids/raw/master/img/aos-adminlangswitcher.png "AdminLangSwitcher")

*Hovering on the Save button when HoverDropdown is enabled:*

![HoverDropdown](https://github.com/rolandtoth/adminonsteroids/raw/master/img/aos-hoversavedropdown.png "HoverDropdown")

*Admin columns example:*

![AdminColumns](https://github.com/rolandtoth/adminonsteroids/raw/master/img/aos-admincolumns.png "AdminColumns")

Putting the "aos_column_break" field inside a tab is not allowed. See how to add columns to tabs below.

**Column widths**

By default the left column is 67% wide and the right is 33%. If you need custom column widths, edit the field's "Column Width" setting under the "Input tab". For example, setting a 55% width will result in a 55/45 left/right percentages. You can override the default width globally or per template as usual. Setting a 100% width (that is, using the default) will result in the module's default 67/33 values.

Note: the "aos_column_break" field will not be removed on module uninstall. However, the field won't show up in the page edit page (only on the template field list). You can of course remove it manually if you wish.

**Columns inside tabs**

You can't add the "aos_column_break" field inside tabs but there's a workaround if you need this feature.
Edit the "FieldSetTabOpen" field in question (this is the starting tab field) and enter this into it's "Notes" field:

```
colbreak_myfield
```

This will produce a column break after the field "myfield".

To specify custom width, use this:

```
colbreak_myfield:60
```

You can set the Note's value at editing the field and/or in template context to override the default.

Note: use the default language input for the Notes if you have a multilanguage setup.

**Paginated AdminDatatables and filterbox**

Filter boxes can't filter items of paginated tables that are not loaded (eg. items on page 2 will not show up on page 1 when filtering).

However, you can navigate paginated tables using ctrl+right and ctrl+left hotkeys. This will load the previous/next set of results with keeping the current filter keyword.

*Extra Check All/Remove all button on confirmation page:*

![RemoveAllFields](https://github.com/rolandtoth/adminonsteroids/raw/master/img/aos-remove-all-fields.png "RemoveAllFields"

*Centered login page:*

![CenterLogin](https://github.com/rolandtoth/adminonsteroids/raw/master/img/aos-centerlogin.png "CenterLogin")

*Filter boxes on various places:*

![FilterboxFields](https://github.com/rolandtoth/adminonsteroids/raw/master/img/aos-dtfilter-fields.png "FilterboxFields")

![FilterboxBCE](https://github.com/rolandtoth/adminonsteroids/raw/master/img/aos-dtfilter-bce.png "FilterboxBCE")

![FilterboxPermissions](https://github.com/rolandtoth/adminonsteroids/raw/master/img/aos-dtfilter-permissions.png "FilterboxPermissions")

![FilterboxTranslator](https://github.com/rolandtoth/adminonsteroids/raw/master/img/aos-filterbox-translator.png "FilterboxTranslator")



### ModuleTweaks

*Module related tweaks (SuperUser only)*

- **Compact module list**: remove table headers (except the first) and category titles from the module list page. Items remain sortable by clicking on the table header. Module settings icons are placed after module titles, and install/delete buttons are placed to the far right.
- **Do not distribute modules into tabs**: if enabled, the module list will show up as one table instead separate tables under tabs ("Site, Configure, Core, etc). This makes easier to find a module, especially when module filter is ON (see below). This setting also removes table headers and category titles. The "Add new module" tab's content is placed to the bottom of the page, plus there's an "Add new" button in the header to show/hide the add new section on the top of the module list.
- **Load module info fields collapsed**: when entering a module page in the admin the info field may occupy much of the screen. Checking this tweak will load them collapsed so more of their configuration fields will be visible.
- **Edit modules in modal on long-click**: long-clicking on a module on the Modules page loads the module in a modal. When uninstalling a module, the dialog closes and the Modules page reloads.
- **Add filter box to module list**: adds an input field to filter modules. If there's a match the corresponding module tabs will get a dot after their name. You can search for any text inside the module's row, not only for the module title. Hitting enter will go to the first matching module on the list. You can use the ctrl+right and ctrl+left hotkeys to navigate between tabs having matches.
- **Set browser title to module name**: if checked, sets the title of the browser tab to the module's name on module config pages (instead the general "Modules").

*Screenshot of compact module list:*

![CompactModuleList](https://github.com/rolandtoth/adminonsteroids/raw/master/img/aos-compactmodulelist.png "CompactModuleList")

*Filtering modules - "Site" and "Configure" tabs have matching items:*

![ModuleFilter](https://github.com/rolandtoth/adminonsteroids/raw/master/img/aos-modulefilter.png "ModuleFilter")

*AdminDataTable filter using on single table:*

![AdminDataTableSingle](https://github.com/rolandtoth/adminonsteroids/raw/master/img/aos-dtfilter-permissions.png "AdminDataTableSingle")

*AdminDataTable filter using on multiple tables (filtering tagged Fields, using keywords "body" AND "email":*

![AdminDataTableMulti](https://github.com/rolandtoth/adminonsteroids/raw/master/img/aos-dtfilter-fields.png "AdminDataTableMulti")



### NavItems

*Add pages to navigation*

Enables adding pages and appending them in the sidebar (Reno theme) or the top navigaton (Default theme).
Items will be appended to the "Pages" section.

Clicking on a custom nav item will load a page list containing its children.
There's an "Edit" icon to the right of the items that opens the page for editing.
This is available only if the user has proper rights and for items selected from the tree.

**Additional items**

If you need to add items that are unavailable from the pages tree you can add them here.
Use the syntax "Title: url" where "url" needs to be relative to the admin.

Example:
```
Translator: setup/language-translator/edit/?language_id=1066&textdomain=site--templates--_strings-php
// commented out item
// "!" indicates visible only for SuperUsers
! AdminOnSteroids: module/edit?name=AdminOnSteroids
```

If the title starts with "!" then it will be visible only for SuperUsers.
These items will have an asterisk (*) suffix to indicate visibility.

Note that this feature is primarily for adding non-admin pages to the navigation.
Some of the pages under the "Admin" page may not work correctly.

*Custom navigation items after item "Recent":*

![NavItems](https://github.com/rolandtoth/adminonsteroids/raw/master/img/aos-navitems.png "NavItems")

**Submenus**

From v1.1.2 it is possible to add submenus to custom nav items. To add one you enclose items with a start and end tag:

```
-- ! Modules: module/
AdminOnSteroids: module/edit?name=AdminOnSteroids
Tracy Debugger: module/edit?name=TracyDebugger
--
```

The start tag is `--` followed by the menu title, and optionally a link. Use `--` for the end tag.

The `!` character for setting access to superuser-only works here too. The only difference is that the asterisk character won't be added to the submenu title. In this case the entire submenu with its sub-items will be skipped for non-superusers.


### PageListThumbs

*Pagelist thumbnails*

Add thumbnails to the main pagelist.

- **Style**: appearance of the thumbnail image (circle, square or default rectangle)
- **Source**: list of "fieldname: selector" pairs to set which page field to use for the thumbnail and what condition has the page meet to show it. The first matching field-selector pair will be used. If there's no match, no thumbnail will be displayed. You can comment out items by adding "//" to the beginning of the lines, these will be skipped. If a multi-image field is supplied, its first image will be used.


Example:

```
featured_image: template=wine|basic-page, children.count=0, parent!=1
featured_image: parent=1018
hero_image
```

This example will use image field "featured_image" for pages using "wine" and "basic-page" templates that has no child pages and which parent is not "Home".
The second line also uses "featured_image" field, but for pages having the page with id of 1018 as parent.
The third line uses no selector (filter), so any pages not matching the first two lines will use the "hero_image" field for thumbnail.
Pages having no "hero_image" field or there's no image uploaded will show no thumbnail.


**Settings**
- *Align thumbs to right*: place thumbnails to the right of the pagelist
- *Edit page on thumb click*: allows opening the page for editing instead toggling the open/close state of the item

Tip: to use smaller thumbs, set "Use narrow pagelist rows" (RenoTweaks). The Default theme always gets the smaller thumb size (32px vs 48px).

*Right-aligned pagelist thumbs (with narrow pagelist rows ON):*

![PageListThumbs](https://github.com/rolandtoth/adminonsteroids/raw/master/img/aos-pagelistthumbs.png "PageListThumbs")



### PageListTweaks

*Pagelist related tweaks*

- **Highlight rows on hover**: adds a slight background color on the hovered row. Works in pagelists and data tables (eg. Finder, modules list, etc). In pagelists an opened state item gets bold and a darker underline. 
- **Show page IDs**: adds the page ID after each page name in a superscript (visible for superusers only)
- **Add Delete button to delete page permanently**: adds a new extra action to pagelist items called "Delete". Clicking on this will show a confirmation link and clicking on this the page will be permanently deleted (bypassing the Trash). The feature is disabled on pages having child pages and it's visible for superusers only.
- **Add unselect/restore buttons to PageListSelect**: a rewrite of Bernhard Baumrock's PageListSelectUnselectButton module which allows clearing of PageListSelect field value using a dedicated button. Additionally, this tweak adds a "restore" functionality too. Note that if there is no previous value to restore, the restore button will not show up. Many thanks for Bernhard for the idea and help!
- **Icon-only pagelist actions**: hide pagelist action texts and use icons instead. The action text is shown as a title attribute. This setting also replaces Lister actions with icons.
- **Use middle mouse click/ctrl+click to View/Edit page**: if enabled, middle-mouse click on pagelist item name will open the corresponding page in a new tab (frontend). Holding down the ctrl key on middle-mouse click will open the page for editing (also in a new tab). Besides regular pagelists Lister items are also supported. Both actions fire only if the View or Edit links ar available on the item. Some browsers may ask for a permission to open a new tab.
- **Make active pagelist items bold**: when a pagelist item is clicked (opened) then it becomes bold to make it move visible.
- **Always show pagelist actions**: show all (non-extra) pagelist items by default (non only on hover)
- **Always show extra actions**: do not hide extra actions.
- **Allow markup tokens for "List of fields to display"**: enables adding custom markup to pagelist fields displayed. See details below.

####Allow markup tokens for "List of fields to display"

Go to "Admin -> Setup -> Templates -> Advanced (tab) -> List of fields to display in the admin Page List" to enter fields and markup tokens. Surround fields with "[tag][/tag]".
 
 
You can use any tag, however it is recommended to use "em" as it doesn't conflict with existing pagelist tags, and the module has some built-in styles for them too, including a separator dot.

```
{title} [em.company][b]{company_ref.title}[/b][/em] [em][i]images: {images.count}[/i][/em]
```
 
**Using classes**
 
Use "[tag.className]" if you need to add a CSS class to add your own styling. Adding multiple classes is possible using additional dots, eg. "[tag className.anotherClassName]". ProcessWire strips slashes so you have to use double underscores if you need them. For example, adding a fontawesome icon is possible like this - this will output "<i class="fa fa-plane"></i>":
 
 ```
[i.fa.fa__plane][/i]
```

**Multi-language field properties**

Displaying labels on multilanguage installs is possible using "%field.property%" syntax (ProcessWire by default shows property only in the default language). In this case AdminOnSteroids will try to load the property in the current language and falls back to the default language. Here is how to display the "images" field label (followed by the images count):

```
{%images.label%}: {images.count}
```
 
**Date filter**
 
This tweak adds a "date" filter to output human readable dates for date fields without output format set.

Using the following syntax - only "|date" is required, the date format is optional, defaults to "%Y-%m-%d". See PHP's strftime function for the available placeholders.

**Empty values**

To avoid empty values (eg. showing "images:" followed by no value) the module will add the "Ø" (slashed zero) character. This makes it easier to see that the field in question is empty ("images: Ø").
 
```
({date_created}|date:%Y/%m/%d)
```
 
If this tweak is disabled, the module will remove the markup tokens and date filters and show the original content.
 
*Pagelist markup:*

![PageListMarkup](https://github.com/rolandtoth/adminonsteroids/raw/master/img/aos-pagelistmarkup.png "PageListMarkup")


*Pagelist unselect in action:*

![PageListUnselect](https://github.com/rolandtoth/adminonsteroids/raw/master/img/aos-pagelistunselect.png "PageListUnselect")

*PageListTweaks:*

![PageListTweaks](https://github.com/rolandtoth/adminonsteroids/raw/master/img/aos-pagelisttweaks.png "PageListTweaks")



### PagePreviewBtn

*Add preview link next to page title*

When enabled, an "eye" icon will be added next to the page title that links to the front-end target of the edited page. The target can be set to new tab/modal/panel.

*Page preview button after page title:*

![PagePreviewBtn](https://github.com/rolandtoth/adminonsteroids/raw/master/img/aos-pagepreviewbtn.png "PagePreviewBtn")



### RenoTweaks

*Apply Reno theme tweaks*

A few usability mods targetting the Reno admin theme.

- **Sticky header**: stick the header to the top of the browser window so it stays in place when scrolling down
- **Compact sticky header**: hide the masthead to save vertical space. Search field and top naviation links are moved to the header, plus the main form tabs are set to fixed position (sticky). Available only if sticky header is on.
- **Sticky CKEditor toolbar**: stick the CKEditor toolbar below the sticky header to make it always available. Currently works with only the first CKEditor on the page and is available only if sticky header is on. The toolbar is set to sticky only if the editor is focused. Clicking outside the editor or if the editor goes offscreen on page scroll will hide the toolbar.
- **Use mini scrollbar for sidebar**: if enabled, the default browser scrollbar will be replaced with non-obtrusive scrollbar that is visible only on hovering the scroll area.
- **Use mini scrollbar for main content**: same as above, for the main content area.
- **Sticky sidebar**: stick the sidebar to the top to make it always visible
- **Autohide sidebar on left**: auto hide the sidebar so it's accessible by moving the mouse to the left side of the screen
- **Always show sidebar items (disable accordion)**: make sidebar submenus more compact and do not hide them
- **Inline sidebar items instead of stacking**: check this if you would like sidebar items to appear next to each other and not in full row. This results in a much lower sidebar if you have many items in it.
- **Single click sidebar headers**: by default the sidebar header links need double-click to open the corresponding menu page because single click is used by the accordion. This tweak will remove this limitation. It's available only if "Always show sidebar items" tweak is on.
- **Always show search field**: make the search field always available
- **Place header button next to the main title**: moves the top (cloned) main button next to the title to make it easier to reach
- **Hide sidebar quick links (flash icons)**: this will hide the quicklink icons from the sidebar. Use this if you don't use this feature and/or you would like to make easier to click on submenu items
- **Use narrow pagelist rows**: reduce the space between the main pagelist rows to save space
- **Move notice close buttons to the left**: put the close button of the notice message to the left for easier access

*Admin screenshot with sticky/compact header and various other RenoTweaks enabled:*

![RenoTweaks](https://github.com/rolandtoth/adminonsteroids/raw/master/img/aos-renotweaks.png "RenoTweaks")


### Tooltips

*Hide field descriptions and notes to tooltips*

Hide field descriptions and notes to an icon and show them on hover in a tooltip. To freeze the tooltip, double click on the icons.

- **Enable for field descriptions**: allow moving field description to an icon
- **Enable for field notes**: allow moving field notes to an icon
- **Use overlay style**: when checked, the tooltip will cover the entire area of the field. This eliminates the z-index issues of the traditional tooltip style (other page elements may partly cover the tooltip).

*Description tooltip:*

![Tooltips](https://github.com/rolandtoth/adminonsteroids/raw/master/img/aos-tooltips.png "Tooltips")


## Add custom CSS or JavaScript to the admin

At the bottom of the module's settings page there is a section "Asset paths" where you can set a path for a custom admin CSS and admin JavaScript.
The module will automatically load these files if they exist so you can add custom style or script to the admin.

*Paths to custom assets:*

![AssetPaths](https://github.com/rolandtoth/adminonsteroids/raw/master/img/aos-assetpaths.png "AssetPaths")

### Auto-loaded files

There are special files which will be loaded by the module if they exist (no need to manually set their paths above):

- /site/templates/**admin.css**: CSS file loaded for the entire admin
- /site/templates/**admin.js**: JavaScript file loaded for the entire admin
- /site/templates/**cke.js**: JavaScript file loaded for CKEditor fields
- /site/templates/**cke.css**: CSS file loaded for CKEditor fields
- /site/templates/**templates.js**: fallback for the CKEditor "templates" plugin templates


## Extra classes added to "body" tag

The modules adds a few extra classes (user roles, edited page information, etc) to the "body" to make it easier targeting admin pages through CSS and JavaScript. Idea and implementation borrowed from Robin S - thanks!