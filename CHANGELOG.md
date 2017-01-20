#Changelog


### 1.2.3 (2016-01-20)

- Hotkeys: focus filterbox on alt+s



### 1.2.2 (2016-01-18)

- title change case button improvements



### 1.2.1 (2016-01-17)

- Misc: option to move empty trash confirmation checkbox above trash items



### 1.2.0 (2016-01-13)

- Hotkeys: add alt+d to open page tree panel (requested by gmclelland)
- a few icon changes for icon-only page list actions



### 1.1.9 (2016-01-12)

- expand field placement select (if there's only one select)



### 1.1.8 (2016-01-09)

- add SVG background to show width divisions on Column width slider (asmTweaks)
- fixed non-functional Lister show extra actions toggle (reported by gmclelland)



### 1.1.7 (2016-12-29)

- asmTweaks: show field width percentages in template editor fields asmList + allow clicking on them to open edit the field at the Input tab (idea by bernhard)
- possible fix for case changer incorrect positioning (reported by gmclelland)



### 1.1.6 (2016-12-28)

- fix: ensure visibility of search box when focusing with alt+d (reported by gmclelland)



### 1.1.5 (2016-12-24)

- PageListUnselect: add trigger on unselect to allow dependent fields to update (reported by adrian)



### 1.1.4 (2016-12-23)

- AOS module config page UI tweaks (role asmSelect appearance, enabledSubmodules boxes)
- ckeStyles url fix (custom asset paths)



### 1.1.3 (2016-12-22)

- Use "title" attribute instead animation for icon-only pagelist actions to show text
- allow datatables filter on module pages
- hide quicklinks menu when hovering other sidebar items (Reno theme)



### 1.1.2 (2016-12-21)

- Custom nav items: submenus feature



### 1.1.1 (2016-12-20)

- fix for custom assets not loading if PW is in a subdirectory



### 1.1.0 (2016-12-19)

- unnecessary dump removal (reported by lesaff)



### 1.0.9 (2016-12-14)

- PageListTweaks: ability to format unix timestamps in pagelists
- PageListTweaks: using %field.property% will output the value in the user's language (if available)
- PageListTweaks: always show extra actions
- fixed language translator filterbox not appearing
- possible fix for unclickable select dropdowns in ProDevTools API Explorer (reported by Robin S.)



### 1.0.8 (2016-12-08)

- PageListTweaks: ability to add markup to "List of fields to display in the admin Page List"
- always use 48px pagelist thumbnails to avoid too many variations



### 1.0.7 (2016-11-29)

- new tweak: use middle mouse click/ctrl+click to View/Edit page in pagelist (PageListTweaks)
- removed custom styling for the pagelist template edit action for the Default theme



### 1.0.6 (2016-11-28)

- fix for "Always show pagelist actions" on pagelist items with children (reported by adrian)
- add documentation to auto-loaded assets (Asset Paths)
- second attempt to fix for missing pagelist IDs
- second attempt to fix topnav third-level menu subpixel issue
- PHP notice fix when adding page template and page id classes to body



### 1.0.5 (2016-11-25)

- new tweak for Misc: add toggle button to change case of Page title field
- new options for PageListTweaks: Icon-only pagelist actions / Always show pagelist actions / Make active pagelist items bold
- show Lister actions only on hovering on the first table cell instead on full row
- renamed PageListUnselect to pListUnselect
- pListUnselect: do not append page ID if pListID is enabled after page selection
- InputfieldURLChecker: do not add to regular autocomplete field, only to edit link modal
- CKEaddons: if MagicLine plugin is enabled, remove it from PW's removed plugins
- CKEplugins: added Content Templates + path to custom templates.js file
- CKEplugins: CodeMirror update
- CKEaddon keystrokes: changed cltr+u to ctrl+hift+u
- Hotkeys: on focusing the search box (alt+d) trigger the autocomplete with previously set keyword
- add extra clases to admin body (by Robin S)
- fix for missing pagelist IDs (reported by adrian)
- added workaround for the subpixel issue in topnav third menu items (Default theme) 
- pagelist template edit action: fix missing action buttons (reported by adrian)
- removed the "#" prefix from pagelist template edit links (and made the action link texts smaller)
- PageListThumbs display fixes
- do not align modal buttons to center



### 1.0.4 (2016-11-14)

- CKEaddons "keystrokes" plugin: add hotkeys alt+n, alt+b for numbered/bulleted lists, plus ctrl+u for source mode (non-dialog)
- new CKEaddons plugin: "Keep TextSelection" (works only with non-dialog source mode)
- possible fix for "$this when not in object context" (reported by Noboru)
- CSS fix for fieldEditLinks for non-ProcessPageEdit pages (repored by bernhard)



### 1.0.3 (2016-11-12)

- use only CSS instead of a html tag to dislay page IDs on pagelists
- fix JavaScript error when not on module config page



### 1.0.2 (2016-11-10)

- new tweak "Remove notices on first ESC keypress": (Hotkeys)
- fix for template edit pagelist action active even if FieldAndTemplateEditLinks submodule is disabled (reported by matjazp)



### 1.0.1 (2016-11-10)

- fix for undefined index (ListerTweaks, reported by Macrura)
- possible improvements to e.metaKey



### 1.0.0 (2016-11-09)

- moved AdminLangSwitcher, noAnim, HoverDropdown, LangTabHotkeySwitcher, AdminColumns, AutosizeTextareas, TabIndex submodules into Misc submodule
- moved PageListUnselect submodule into PageListTweaks submodule
- added e.metaKey besides e.ctrlKey (suggested by adrian)
- separate CSS/JS for AOS configuration page (suggested by matjazp)
- do not load module CSS/JS when module is disabled
- flatModules: make "Add new module" section visible when clicking on "Add new" from sidebar/top menu (reported by adrian)
- force loading of longclick.js for moduleModal (reported by gmclelland)
- fix for invisible AsmList items on drag (reported by adrian)
- added hash navigation for module config page



### 0.9.99 (2016-11-08)

- RenoTweak: fixed position of branding if sticky sidebar is on but sticky header is not
- autofocus filterboxes only on module/template/field/translator list pages
- do not add filter box for InputfieldTable (ProFields)
- filter box: always show search icon
- removed tap shift to focus main search (Hotkeys)



### 0.9.98 (2016-11-07)

- CSS fixes for RenoTweaks sidebar (autohide, noticeLeftX)
- removed "One-line sidebar menus" from RenoTweaks



### 0.9.97 (2016-11-06)

- ListerTweaks colummns: exclude ListerPro
- added auto-close, auto-width tweaks to quicklinks (RenoTweaks)
- fixed disappearing uninstalled modules from the module list
- do not add template edit action if module is disabled (reported by adrian)
- improvements to autohide sidebar + quicklinks



### 0.9.96 (2016-11-06)

- show pagelist action buttons on hovering lister rows (requested by adrian)
- ListerTweaks: option to disable template edit action (requested by szabesz)
- fix: add TemplateEditLink to the end of pagelist actions if no extra actions exist (reported by adrian)



### 0.9.95 (2016-11-06)

- hide submodule config jumplink if submodule is disabled
- preview some tweaks "real-time" on AOS config page (checkboxes only)



### 0.9.94 (2016-11-06)

- browser compability fixes for AOS submodule jumplinks (reported by Robin S)
- Delete pagelist action didn't worked in Lister (reported by adrian)
- fix for template edit link not positioned as last action before Extras in Lister pagelists
- removed the two-column layout for submodule options
- Perfect Scrollbar updated to 0.6.14



### 0.9.93 (2016-11-05)

- added TOC to readme, link to github readme (suggested by bernhard)
- submodule info links to github replaced by jumplinks to submodule options (suggested by bernhard)



### 0.9.92 (2016-11-05)

- upgrade CSS to support classes without "pw-" prefix (PW 3.0.40+, reported by matjazp)



### 0.9.91 (2016-11-04)

- fix for duplicated modules in flat module list (reported by bernhard)
- hide unnecessary table headers in flat module list (reported by matjazp)
- fix for not able to enter space or tab to codemirror editors (reported by matjazp)



### 0.9.9 (2016-11-01)

- determine lister type by url instead id



### 0.9.8 (2016-10-31)

- moduleFilter: include module classname in filter for better results (eg. finds "InputfieldPageName" even if module name is "Page Name")
- "Add new" button: hide the moduleFilter and the module list + show minus sign icon when active
- "Add new" button: fix minor jump on first hover (reported by gmclelland)



### 0.9.7 (2016-10-31)

- added "Add new" button to the header when tab-less module list is enabled



### 0.9.6 (2016-10-31)

- fixed class "hasWireTabs" removed from all admin pages rather than only Modules page (reported by Robin S)



### 0.9.5 (2016-10-30)

- ModuleTweaks: added "Do not distribute modules into tabs" feature (show flattened modules list)



### 0.9.4 (2016-10-29)

- InputfieldURLChecker: fix overlapping icons with FieldtypeAssistedURL (reported by gmclelland)
- set default ListerTWeak fields to "[DEFAULTS]"
- dtFilter: navigate paginated results using ctrl+right and ctrl+left
- moduleFilter: use the same styling as other filterboxes (full-row with background)
- moduleFilter: use ctrl+left, ctrl+righ tno navigate between tabs having matches
- compact module list improvements
- added links to GitHub documentation to submodules
- do not export empty settings to settings.php
- ModuleTweaks: "Set browser title to module name"




### 0.9.3 (2016-10-28)

- Misc: new tweak "Add filter box to Language Translator"



### 0.9.2 (2016-10-27)

- PHP version syntax error (reported by gmclelland)



### 0.9.1 (2016-10-27)

- new submodule ListerTweaks: set default Lister columns (Find and Users listers)
- set browser title to "AdminOnSteroids" with JavaScript (avoid renaming "Modules" in the sidebar/topnav) 
- dtFilter: use "!" as first or last character for inverted search (eg. "basic-page!")
- dtFilter: added counter
- dtFilter: full width panel
- dfFilter: only show filter box if there is more than one item
- Hotkeys: trigger OK button on CKEditor edit source dialog if opened instead the main Save button



### 0.9.0 (2016-10-25)

- even more filter box improvements



### 0.8.9 (2016-10-25)

- improvements to filter boxes
- disable content jump when body height changes



### 0.8.8 (2016-10-24)

- new tweak: "Add filter box to AdminDataTables" (Misc submodule)
- hide empty sections when using module filter if compactModuleList is not enabled (reported by matjazp)
- Enter key triggers a click event on first match module/datatable filter boxes (if applicable)
- use debounce for filter boxes
- add page title 'AdminOnSteroids' to module config page



### 0.8.7 (2016-10-24)

- new tweak: filter box for module list (ModuleTweaks)



### 0.8.6 (2016-10-24)

- fix double shift for Hotkeys



### 0.8.5 (2016-10-23)

- new CKEditor plugins: Auto Link, Auto Save, Table Cells Selection
- new tweak: focus search on alt+d or double shift (Hotkeys submodule, requested by gmclelland)



### 0.8.4 (2016-10-23)

- prevent overlapping the main page title and header buttons
- force white text color on tooltips to avoid illegible texts
- add right padding to hover dropdown menus to avoid text reaching the dropdown's side (Reno Theme)



### 0.8.3 (2016-10-22)

- fix for IUC_forceHttp field save message issue (reported by matjazp)
- Misc: option to open Home link (View site in Default admin theme) in new tab in topnav



### 0.8.2 (2016-10-20)

- array to string conversion fix for InputfieldURLChecker (reported by Toutouwai)



### 0.8.1 (2016-10-17)

- fix for missing longclick action for pagelist item templateEditLink (reported by matjazp)



### 0.8.0 (2016-10-15)

- AdminTweaks: new tweak "Show pagelist actions on full row hover" (suggested by adrian)



### 0.7.9 (2016-10-14)

- PageListTweaks: Wipe button renamed to Delete + UX improvements



### 0.7.8 (2016-10-14)

- new submodule: Misc
- new tweak: add "Check All/Remove All" button to field deletion confirmation page
- ModuleTweaks: allow editing modules in modal only on long-click instead simple click
- PageListTweaks: add Wipe button to delete page (bypass Trash, SuperUser only)
- asmTweaks: edit field in new tab on middle click (no template context)
- moved 'Center login form' tweak to Misc (from AdminTweaks and RenoTweaks)



### 0.7.7 (2016-10-13)

- FieldtypeAssistedURL updates
- allow middle mouse click on FieldEditLinks
- pageListIDs: added support for PagelistSelect field
- Hotkeys: better implementation of ctrl+s in CKEditor: fixes hotkey not working after modifying content in the source dialog



### 0.7.6 (2016-10-10)

- allow relative urls in InputfieldURLChecker (requested by gmclelland)
- InputfieldURLChecker: support for FieldtypeAssistedURL
- InputfieldURLChecker: removed support to open url in panel
- PageListTweaks, "Show page IDs": only visible to superusers



### 0.7.5 (2016-10-09)

- grouped several AdminTweaks and RenoTweaks items into a new submodule "PageListTweaks"
- added new tweak "Show page IDs in pagelists" to PageListTweaks
- moved AdminOnSteroids.scss into the "src" subfolder



### 0.7.4 (2016-10-07)

- fix: keep the correct order of CKE toolbars when multiple CKEditor fields are present
- fix: make CKE plugin Auto Grow autosize field on activating an admin tab



### 0.7.3 (2016-10-06)

- fix for ajax-loaded PageListSelect fields not showing up correctly (reported by gmclelland)



### 0.7.2 (2016-10-03)

- fix for CKEditor overlay covering CKEditor dialogs in certain cases (reported by Macrura)



### 0.7.1 (2016-10-03)

- pagelist template edit links: moved to a pagelist action instead of a tooltip
- few CKEditor CSS fixes



### 0.7.0 (2016-09-29)

- fix: do not show template edit links on pagelist when user is non-superuser (reported by gmclelland)



### 0.6.9 (2016-09-25)

- fix for hard-coded admin path for pagelist templateEditLinks (reported by gmclelland)



### 0.6.8 (2016-09-23)

- added template edit links to the main pagelist items
- CKE plugins dialog CSS improvements
 
 

### 0.6.7 (2016-09-21)

- new option to FileFieldTweaks: show image titles in image select dialog
- custom paths for admin.css, admin.js and CKEaddons assets
- AdminTweaks: remove max-width constraint from modals
- AdminTweaks & RenoTweaks: added tweak "Highlight pagelist rows on hover"
- fix for templateEditLink not showing up (default theme)
- removed ScrollFix submodule



### 0.6.6 (2016-09-16)

- added hook AdminOnSteroids::modifyConfigData to enable or disable submodules or tweaks
- added helper method AdminOnSteroids::disableSubmodule to disable a submodule
- new helper method AdminOnSteroids::disableTweak to disable a tweak
- new CKEaddon plugins: oEmbed, showBlocks, CodeMirror
- CKEaddons: use "/site/templates/cke.js" file for custom config (if exists)
- CKEaddons: use "/site/templates/cke.css" file for custom styles (if exists)
- use asmSelect for selecting CKEaddons plugins in module config (enables ordering)
- CKEaddons plugins that add buttons are marked with an asterisk
- JS fix for compact header save button and search field overlap (RenoTweaks)
- various LightWire skin CSS fixes (CKEaddons)



### 0.6.5 (2016-09-15)

- new RenoTweak "hoverTopSubmenus": show topnav submenus on hover instead click
- use slider for LongClickDuration instead plain text input
- do not load submodule JS/CSS files on login page



### 0.6.4 (2016-09-14)

- possibility to set admin columns inside tabs using FieldsetTabOpen's Note field
- AdminColumns: skip column generation if aos_column_break is put inside a tab
- do not add module JS and JS config to login page



### 0.6.3 (2016-09-13)

- new submodule: AdminColumns
- various fixes/improvements to CKEaddons
- z-index fixes for the Maximize CKEditor plugin
- minor fixes to better compatibility with Dark Admin theme



### 0.6.2 (2016-09-10)

support for inline CKE fields (CKEaddons)
fix LightWire skin missing context menu icons (CKEaddons)
added 'Find' and 'Maximize' plugins for CKEaddons
added 'Set wider main content' for (default) AdminTweaks
submodule options 2 columns layout for default theme above 1479px screen width
fix missing pagelist icon set in template (PageListThumbs)
several fixes for truncated long page titles
timestamp for main module CSS and JavaScript file to prevent caching issues



### 0.6.1 (2016-09-08)

- new submodule: CKEaddons



### 0.6.0 (2016-09-07)

- fix modal class issue (reported by bernhard)
- several improvements/bugfix for enabling/disabling AOS



### 0.5.9 (2016-09-06)

- add 'restrict by roles' feature to all submodules
- removed 'SuperUser only' from DeselectRadios and Tooltips
- truncate long titles in fixed header to avoid cut (Reno theme only)
- fix overlapping icons in compact module list (reported by adrian)
- fix z-index issue with CKEditor after switching language tabs



### 0.5.8 (2016-09-03)

- added AdminLangSwitcher tweak
- fix z-index issue with DateTimePicker



### 0.5.7 (2016-09-01)

- fix missing AdminThemeDefault html class
- added asterisk suffix to NavItems_pages visible to SuperUsers only



### 0.5.6 (2016-08-31)


- add InputfieldPageListSelectMultipleSortable asmSelect items to AsmTweaks "move close button to left"
- better highlight of active items in NavItems_pages
- use regex html to add html classes (should fix no html class issue with default theme)



### 0.5.5 (2016-08-31)

- module settings restore is optional (disabled by default)
- JS workaround for field edit links for ajax-loaded fields
- syntax error fix (thanks to TomasKostadinov)



### 0.5.4 (2016-08-30)

- module settings are exported to settings.php on uninstall and restored on install
- load admin.js and admin.css from /site/templates/ directory if exist
- new tweak "NavItems" (experimental): add pages to main nav or sidebar (depending on theme)
- HTML classes added by AOS are added by PHP instead JavaScript: faster and eliminates initial page jump so the loader is no longer needed
- loader removed
- added "cog" icon to footer to jump to AOS settings
- fix: keep sidebar menu colors for non-inline mode (Reno theme)
- module CSS classnames were abbreviated



### 0.5.3 (2016-08-22)

- fixed FieldEditLink not showing up with InputfieldCheckbox where label was empty (reported by ceberlin)



- FileFieldToolbar submodule renamed to FileFieldTweaks
- added to download link (icon) to FileFieldTweaks
- fixed z-index issue that caused Profile dropdown to be overlapped by Notification menu (reported by Juergen)



### 0.5.1 (2016-08-20)

- fix for flickering HoverDropdown issue
- fix for main menu submenu gap in Default theme (reported by bernhard)
- fix for gap in Default theme under page tabs when Prev/Next Tabs module is installed (reported by ceberlin)
- other CSS fixes/improvements



### 0.5.0 (2016-08-19)

- added "centerLogin" to (default) AdminTweaks



### 0.4.9 (2016-08-19)

- added "centerLogin" to RenoTweaks: align login page items to center
- moduleModal: align action buttons to center in the modal
- moduleModal: fix ctrl+s overlay added to parent document instead of modal's body
- animated moduleCompact settings icon (cog)



### 0.4.8 (2016-08-18)

- support for ctrl+s in modals
- added "Submit + Reload" button for moduleModal
- added translatable strings for Save, Save + Exit, Save + Reload
- fix for malfunctional field edit links (reported by szabesz)



### 0.4.7 (2016-08-17)

- added "Settings" for PageListThumbs with options right-aligned thumbs and edit page on thumb click
- PageListThumbs uses the first image if supplied field is a multi-image field
- fix InputfieldURLChecker malfunction with ajax-loaded fields
- PageListUnselect improvements



### 0.4.6 (2016-08-16)

- new PageListUnselect submodule: rewrite of Bernhard Baumrock's PageListSelectUnselectButton module



### 0.4.5 (2016-08-16)

- FieldAndTemplateEditLinks: active only when hovering on element text (not full row)
- Added AOS enabled/disabled toggle to the footer (only for SuperUsers)
- fixed overlapped footer in Reno theme



### 0.4.4 (2016-08-15)

- FieldEditLinks renamed to FieldAndTemplateEditLinks and allows editing of page template by clicking on the tooltip that appears on hovering on the page title
- field and template edit links appears in tooltips
- fix default configdata issues on install



### 0.4.3 (2016-08-11)

- moduleModal: added ESC close and secondary Submit button for submit+exit
- RenoTweaks: optional inline mode for sidebar items



### 0.4.2 (2016-08-10)

- moduleModal option to ModalTweaks: edit modules in a modal dialog
- moduleCompact module names are "full-cell" sized for better clickability
- breadcrumbs ctrl+click fix for Default admin theme



### 0.4.1 (2016-08-10)

- workaround to use panel mode for repeaters and other fixes for InputfieldURLChecker
- added "Enable module" toggle
- layout improvements for sticky and compact headers (RenoTweak)
- miniScrollbar now works with headSticky (previously only with compactHeader)
- more general solution for HoverDropdown



### 0.4.0 (2016-08-09)

- added InputfieldURLChecker as submodule
- order submodules alphabetically



### 0.3.9 (2016-08-08)

- redesigned settings page
- use smaller thumbnails if narrow pagelist items is checked (RenoTweaks)
- skip commented lines in pagelist thumbnails (lines starting with "//")
- fix early return in pagelist thumbs



### 0.3.8 (2016-08-08)

- added 'FieldEditLinks' tweak: allows editing fields by ctrl-clicking on field labels in Page editor (or by clicking on field name that slides in)
- added support for System Notifications module for headSticky (requested by szabesz)
- added 'Only for SuperUsers' setting for Tooltips
- fix sidebar quicklinks menu (flash menu) visibility (reported by Mike Rockett)
- set module requirements to PW version 2.8 (suggested by Mike Rockett)
- better visibility for sticky header dropdowns
- various z-index fixes (panels, dropdowns, tracy debugger panels, etc)



### 0.3.7 (2016-08-05)

- modal dialog z-index issue fix



### 0.3.6 (2016-08-04)

- added "Pagelist enhancements" tweak with pagelist thumbnail feature
- added "narrow pagelist items" tweak to RenoTweaks
- fix z-index issue with FieldtypeLeafletMapMarker (reported by Juergen)



### 0.3.5 (2016-07-23)

- Add long-click and ctrl+click actions to breadcrumbs (Hotkeys submodule)
- Add 'Add new template' page support for Hotkeys save



### 0.3.4 (2016-07-19)

- CSS fixes



### 0.3.3 (2016-07-18)

- option to use miniScrollbar for sidebar or main content



### 0.3.2 (2016-07-13)

- remove initial FOUC with a (fake) loader



### 0.3.1 (2016-07-13)

- more compact module list



### 0.3.0 (2016-07-12)

- force align dropdown menus to right of parent button
- make tabindex start from 1 instead 0
- Tooltips: fix for field notes overlay style not appearing & other styling improvements
- miniScrollbar: increase wheel speed (was slow in Firefox)



### 0.2.9 (2016-07-07)

- New tweak moduleCompact: remove table headers and category titles from the module list page
- New section created for module-related tweaks (currently contains moduleCompact and collapsedModuleInfos)



### 0.2.8 (2016-07-07)

- fix autosize textarea updating in wiretabs (and possibly elsewhere too)
- Tooltips z-index fix (reported by Juergen)
- Hotkeys fixes



### 0.2.7 (2016-07-06)

- new tweak Tooltips: hide field descriptions and notes to icons (requested by grimezy et al)



### 0.2.6 (2016-07-05)

- option to add sequential tabindex to inputs to allow jumping to inputs using TAB)
- added "Add new page" page to the supported hotkey save pages



### 0.2.5 (2016-06-28)

- new RenoTweak: miniScrollbar for main content and sidebar (using perfect-scrollbar.js)
- added Language Translator page to the supported hotkey save pages



### 0.2.4 (2016-06-26)

- remove ctrl+click feature to activate all language tabs of the same language (core feature from ProcessWire 3.023)
- FireFox fix for clearing filterbox



### 0.2.3 (2016-06-25)

- new submodule noAnim: disable all admin animations
- possible fix for module repository update showing "Requires 0.0.0 >= 0" (reported by matjazp)
- CSS fixes



### 0.2.2 (2016-06-20)

- Hotkeys submodule: currently only with ctrl+s to save page, even from within CKEditor
- CSS fixes



### 0.2.1 (2016-06-20)

- sticky admin tabs when compact sticky header is enabled
- stickyCKEBar fix for multilanguage fields
- module submitted to modules directory
- CSS fixes



### 0.2.0 (2016-06-15)

- new AsmTweak: Move delete button to the left
- AsmTweaks fixes



### 0.1.9 (2016-06-11)

- added first asmSelect tweak: asmCollapse



### 0.1.7 (2016-06-07)

- Use field render hook on LoadCollapsedModuleInfos instead JavaScript (suggested by matjazp)



### 0.1.6 (2016-06-07)

- datalist for filterbox
- filtered field height fix (reported by matjazp)



### 0.1.5 (2016-06-06)

- extend filterbox to work with File fieldtype besides Image fields
- fix for default theme sticky header (reported by horst)
- module required version set to ProcessWire 3.0



### 0.1.4 (2016-06-04)

- show filterbox dynamically: show only if there's at least 2 items, hide otherways



### 0.1.3 (2016-06-03)

- filterbox: works with ajax-loaded fields/tabs
- filterbox: image src is also available for filter
- filterbox: hide input on closed field
- filterbox: added unicode "search" icon character as placeholder (may be removed if not supported in other OSes, tested on Win)
- filterbox: css animation to hide elements
- other filterbox improvements



### 0.1.2 (2016-06-03)

- new submodule: Add filter box and sort buttons to file fields (FileFieldToolbar). Currently only "filterbox" is available.
- new submodule: add preview link next to page title (PagePreviewBtn). Target can be set to new tab/modal/panel.
- new RenoTweak: sticky CKEditor toolbar (available only if sticky header is on)
- module configuration page updates



### 0.1.0 (2016-05-30)

- new RenoTweak: AlwaysShowSearch
- new RenoTweak: headStickyCompact
- HoverDropdown supports "Save module", "Publish" and "Save unpublished" buttons
- module configuration page tweaks



### 0.0.9 (2016-05-29)

- FocusInputOnLangTabSwitch submodule: ctrl+click on a language tab will activate all the language tabs of the same language
- SuperUser check moved to PHP instead PHP+JavaScript



### 0.0.8 (2016-05-28)

- new tweak: HoverDropdown



### 0.0.7 (2016-05-28)

- new Reno tweak: sbSingleClickHeads
- few CSS tweaks on the module's own admin page
- load module CSS on ready() to make module CSS tweaks available right after install



### 0.0.6 (2016-05-27)

- new tweaks: LoadCollapsedModuleInfos and ScrollFix (Reno)
- revised default tweaks



### 0.0.5 (2016-05-27)

- added Reno tweaks sbQuickLinksHide and sbItemsRow
- various bugfixes



### 0.0.4 (2016-05-27)

- added default admin theme tweaks
- various bugfixes



### 0.0.3 (2016-05-27)

- added Reno admin theme tweaks



### 0.0.2 (2016-05-26)

- added AdminLongClickDuration feature



### 0.0.1 (2016-05-25)

- initial release