# Changelog

### 2.0.21 (2020-06-06)

- remove blocking cke overlay z-index, npm audit fixes
 


### 2.0.20 (2019-09-09)

- rename module enable/disable toggle GET param to avoid possible conflict with the new toggle fieldtype (reported by dragan)
- fix hotkey label typo for toggle filterbox (reported by gmclelland, #112)



### 2.0.19 (2019-08-12)

- add parenthesis to ternary operator for PHP 7.4 (#111, reported by tiefenb)



### 2.0.18 (2019-06-23)

- lodash dependency update



### 2.0.17 (2019-06-15)

- fix sticky header z-index issue on Uikit theme (reported by szabesz)
- new CKEditor plugins: Color Button, Color Dialog, Table Resize, Table Tools, Table Tools Toolbar



### 2.0.16 (2019-03-25)

- fix hidden text for hidden pagelist items (possibly a webkit bug) (reported by @adrianbj and MilenKo)
- fix PHP notice when $editedPage is not available (InputfieldURLChecker)



### 2.0.15 (2019-03-07)

- Misc: new "addFieldWrapAttributes" tweak that adds data-attributes to field wrappers containing field name, id, type, etc
- fix for a small jump when hovering on a paginated pagelist under the Children tab (reported by matjazp)
- added JumpLinks module's save button to the supported ctrl+s save buttons (suggested by Tomka)



### 2.0.14 (2019-03-02)

- new AsmTweaks tweak: show field types after name (for Fields asmSelect)
- fix for select2 JavaScript error on manual trigger



### 2.0.13 (2019-02-20)

- Misc: remove "Move empty trash confirmation checkbox above trash items" because latest ProcessWire versions doesn't need this tweak anymore (suggested by Robin S)



### 2.0.12 (2019-02-20)

- RestrictTreeDropdown: hide primary nav submenu if empty (reported by Robin S)



### 2.0.11 (2019-01-24)

- remove overlay: overflow on html tag to avoid unwanted styling issues (reportd by @adrianbj)
- disable filterbox if table has "nofilterbox" class (PR #103 by bernhard)



### 2.0.10 (2018-12-28)

- improvements to tweak "Add links to Language Translator to edit current textdomain file in other languages": do not add links for non-existing textdomains, add intro text, do not hide them in modal view



### 2.0.9 (2018-12-27)

- translatorModal: add modal classes via PHP instead JavaScript
- use "continue 2" within a switch in FieldOverrides (reported by @adrianbj)



### 2.0.8 (2018-12-26)

- new tweak to open Language Translator in a modal window (Misc)
- fix JS error caused by CKEaddons on certain pages



### 2.0.7 (2018-12-20)

- AdminThemeUikit: fix selected roles list in module config page not wrapping (reported by jmartsch)
- scroll to target sections in module config page
- do not add titleCaseToggle if the input has data-no-titlecasetoggle attribute
- exclude various inputs on module config page from adding titleCaseToggle



### 2.0.6 (2018-12-19)

- AdminThemeUikit: fix invisible roles select list on the module config page (reported by jmartsch)
- AdminThemeUikit: fix sticky top menu height issue on latest PW (reported by @adrianbj)
- fix case toggle encoding issue



### 2.0.5 (2018-10-28)

- fix for field edit links not clickable when Repeater field set to "Items always open" (reported by Robin S)
- fix for AdminThemeUikit fixed nav menu dropdown positioning (reported by MilenKo)



### 2.0.4 (2018-09-10)

- top header button was overlapped by h1 title on smaller screen sizes (reported by Pete)
- CodeMirror (CKEaddons): set white font color for the default dark theme (reported by Pete)
- CodeMirror (CKEaddons): force line wrapping, use larger font size and the same font-family as the admin



### 2.0.3 (2018-08-25)

- remove select2 sort (requested by Robin S)
- linting notice fixes



### 2.0.2 (2018-08-09)

- ckeLinkFiles: prevent Js error if config.CkeLinkFiles is not available
- fix downloadAsset button z-index (reported by matjazp)



### 2.0.1 (2018-08-03)

- case changer: update to work with Batch Child Editor module's title fields



### 2.0.0 (2018-08-02)

- case changer: enable also for text fields and image/file field descriptions, trigger change, update for repeaters/ajax fields



### 1.9.9 (2018-07-24)

- added asmCounter (asmTweaks)
- fixed asmSelect items wrong position on move
- fixed z-index issue: InputfieldURLChecker and checkAllCheckboxes vs AdminThemeUikit sticky header
- fixed z-index issue: repeater field vs field edit link
- fixed repeater field edit links pointed to wrong urls
- fixed pagelist unselect buttons causing notes field wrong positioning (reported by Robin S, #99)



### 1.9.8 (2018-07-10)

- NavItems: faster and less error-prone way to pass markup to JavaScript
- fix: styling issue on horizontal checkboxlists (checkAllCheckboxes)
- fix: z-index issue after page moved in Page List #97 (reported by Robin S)



### 1.9.7 (2018-06-12)

- add Skip trash checkbox only to pages that are trashable (reported by Robin S)



### 1.9.6 (2018-06-04)

- fix field edit link added twice for multi-select page reference fields (reported by Robin S)
- eliminate spacing issue in Uikit theme caused by field edit link DOM position



### 1.9.5 (2018-06-04)

- fix inline pagelist items if "Always show pagelist actions" was checked (reported by ottogal)
- Delete and Trash action (non-superusers): skip confirmation if ctrl key is pressed
- new Skip Trash? checkbox on page edit Delete tab (SuperUsers only, requested by Robin S)
- fix NavItems causing JS error on "Find Files to Translate" page Search box
- hotkey save: do not add blocking overlay until html5 required attribute requirements are not resolved (reported by Robin S, #95)
- asmSelect searchbox: allow wider dropdown
- AdminThemeUikit, percentage-based widths ON: move AsmSelect placeholder and maxlimit fields after Required field to avoid layout issues
- add namespace and FileCompiler=0 to bypass PW's FileCompiler (slow compile on Win localhost, may need modules refresh)



### 1.9.4 (2018-05-23)

- new: extra columns on Fields setup page showing description, notes, id and inputfield class (Misc)
- skip autosizing textareas having "noAutosize" classname (requested by bernhard)
- add cache busting string to assetPaths (requested by Robin S)
- check if $_SERVER['HTTP_REFERER'] exists before redirect (reported by Robin S)
- fix 1px title field misalignment caused by case-toggle button (reported by Robin S)



### 1.9.3 (2018-05-05)

- pagelist markup: switch to $datetime api var (allows relative datetime strings too)
- pagelist markup: add %createdUser% and %modifiedUser% tokens
- pagelistUnselect: fix Uikit theme spacing issue (reported by Robin S)
- CKEditor plugin Link Files Menu: apply fix from Robin S from his original module (ajax response not working for non-superusers)



### 1.9.2 (2018-04-26)

- put miniScrollbars over page content
- checkAllCheckboxes: skip tags with data-no-checkall-checkboxes="1" attribute
- use SVG for filterbox icon


### 1.9.1 (2018-04-25)

- new: sticky action (PageListTweaks)
- miniScrollbars: removed JS lib (RenoTweaks), added CSS-based solution to Misc (Chrome only)
- z-index fix to avoid TracyDebugger panel overlaps
- fixed language switcher issue with non-existing lang_id (by theo)



### 1.9.0 (2018-04-10)

- fix for additional adminDataTable filterbox after PageTable reload (reported by szabesz)
- remove CSS rule that made impossible to resize ListerPro columns (reported by szabesz)
- make TracyDebugger panels appear above sticky headers and AOS submodule blocks (reported by @adrianbj)



### 1.8.9 (2018-04-04)

- prevNextLinks: template level sort order fix (by Robin S)



### 1.8.8 (2018-04-03)

- prevNextLinks: do not load all siblings (by @adrianbj)



### 1.8.7 (2018-03-30)

- fieldOverrides: fix restricting to load on page edit screen only
- prevNextLinks: enable also for User and Role edit screens
- Field edit links: fix restricting to load on page edit screen only
- attempt to fix Js error when inserting CSS rule with Js
- fix PHP warning on multilanguage check



### 1.8.6 (2018-03-20)

- new CKEditor plugin "Open Link"
- new CKEditor plugin "Smaller Selection"
- new CKEditor plugin "WordCount"
- CKEditor custom CSS: do not override CSS set in field settings with CSS set in AssetPaths (load both)



### 1.8.5 (2018-03-19)

- new CKEditor plugin "Link Files Menu" (by Robin S, multilang by tpr)
- CKEditor maximize plugin + LightWire skin: fix disappearing toolbar icons



### 1.8.4 (2018-03-15)

- new CKEditor plugin "Link Hover" (by Robin S)
- added workaround for button spacing #89 (by gmclelland)
- pagelist Delete action: allow for pages in Trash too
- multilanguage PHP notice fix



### 1.8.3 (2018-03-13)

- checkAllCheckboxes improvements
- fix aos enable toggle markup issue (reported by theo)
- module config: fix dependent checkboxes


### 1.8.2 (2018-03-12)

- Misc: new checkAllCheckboxes: button to check all checkboxes (appears on hover) (requested by @adrianbj)



### 1.8.1 (2018-03-12)

- new: input mask for Inputfield (Misc)
- bottom save button hover menu positioning fix (reported by Robin S)



### 1.8.0 (2018-03-04)

- asmSearchBox: keeping option list open is now optional (requested by @adrianbj)
- asmPlaceholder: keep existing placeholders when used with asmSearchBox



### 1.7.9 (2018-03-03)

- title case changer fixes (reported by @adrianbj)



### 1.7.8 (2018-03-01)

- asmSearchBox: keep scroll position after select (by Karl_T)
- asmSearchBox: option to keep search term after select



### 1.7.7 (2018-02-28)

- asmTweaks: added searchable asmSelect fields using Select2.js (suggested by Karl_T)
- asmTweaks: added asmSelect max limit (JavaScript only)
- asmTweaks: added placeholder feature
- fix filterbox disappearing when PageTable field content is refreshed (reported by szabesz)
- Uikit theme: fix uikit min-height control issue
- added Content Templates CKE plugin dependencies
- added Mathjax plugin to CKEaddons



### 1.7.6 (2018-01-24)

- AdminThemeUikit: fix ctrl-click on breadcrumbs
- AdminThemeUikit: add navItems to Page menu
- move tweak "Place header button next to the main title" to Misc (available for all 3 admin themes)
- breadcrumb editurl: fix double directory in url on subdirectory installs
- InputfieldFileFieldFilter positioning fix in AdminThemeUikit (reported by gmclelland)



### 1.7.5 (2018-01-22)

- filterbox fix for Find page (Lister) (reported by gmclelland)
- filterbox: clear only current instance on ESC
- change to string versioning



### 1.7.4 (2018-01-18)

- logsHelperTweaks: expand Helpers field on Logs page and use radios instead select for Actions (Misc)
- AdminThemeUikit filterbox fixes + design update
- better fix for IUC button vertical positioning (works inside repeaters too)
- fix AdminThemeUikit pagelistUnselect button misplacement (reported by Robin S)
- AdminThemeUikit support for h1 templateEditLink
- fix for non-reachable h1 templateEditLink
- aos_column_break: remove extra fieldset gutter and background color (AdminThemeUikit), increase gutter width



### 1.7.3 (2018-01-16)

- disable filename truncation: support icons besides fa-file-image-o
- sticky cke toolbar: add support for AdminThemeUikit fixed/compact header



### 1.7.2 (2018-01-12)

- fix remove notice hotkey enabled check (by Robin S)



### 1.7.1 (2018-01-10)

- fix field edit links inside repeaters (by Robin S)
- disable Filename Truncation does not work when field is required #84 (report & fix by gingebaker)
- InputfieldURLChecker improvements (triggered by gmclelland)
- fix modules list cog icon placement in Uikit theme (+ make them sharper)
- fix enable/disable AOS link alignment when module is in disabled state
- fix noFilenameTruncate: too broad CSS selector that may conflict with others (reported by Robin S)
- remove forced zero border radius from pagelist action buttons (reported by @adrianbj)



### 1.7.0 (2017-12-12)

- fix suppressing the "required" icon in the template editor (reported by Robin S)



### 1.6.9 (2017-12-12)

- PR merge: Different size buttons when editing a page #80 (by gmclelland)



### 1.6.8 (2017-12-02)

- moduleModal fix for Uikit theme (reported by jmartsch)
- alt+d search box fix for Uikit theme (reported by jmartsch)
- footer aos switcher alignment fix (reported by gmclelland)



### 1.6.7.2 (2017-11-19)

- ctrl+s save fix by Robin S



### 1.6.71 (2017-11-14)

- prevNextLinks: keep page sort order



### 1.6.7 (2017-11-13)

- new tweak 'prevNextLinks' to Misc, based on Macrura's 'PrevNextTabs' module (thanks!)



### 1.6.6 (2017-11-07)

- UikitTweaks: login page sticky header and centerLogin adjustments (reported by @adrianbj)



### 1.6.5 (2017-11-06)

- new submodule: UikitTweaks
- UikitTweaks: sticky header
- UikitTweaks: compact (smaller) header
- add config links to Profile page admin theme radios (Misc)



### 1.6.4 (2017-10-28)

- various fixes for FieldOverrides
- wiki: distribute submodule docs to pages



### 1.6.3 (2017-10-26)

- pListFullRowHover: moved to PageListTweaks, available also for AdminThemeUikit
- add top margin between header and page content for AdminThemeDefault (suggested by gmclelland)
- fix AOS config page submodule box heights (by gmclelland)
- minor AdminThemeUikit CSS tweaks



### 1.6.2 (2017-10-25)

- added branding logo for AssetPaths
- fix display issues with InputfieldCheckbox borders and tooltips (by gmclelland)
- fix tooltip doesn't work correctly with InputfieldCheckbox (by gmclelland)
- fix file/image field input filter height with AdminThemeUikit (by gmclelland)
- fix image fields size information overlaps download icon (by gmclelland)
- fix CKEditor error caused by missing oEmbed dependency
- fix invalid image urls in aos.css from last refactor
- Hotkeys ctrl+s: trigger "Save Unpublished" instead "Save" to keep the unpublished state (requested by szabesz)
- module config page style updates for AdminThemeUikit
- module config page: use jump to hash instead scroll (submodule "cog" icon click)
- ListerTweaks optimizations (by Robin S)
- do not apply default settings on module install (suggested by Macrura)
- do not set LightWire skin by default for CKEditor (suggested by Macrura)
- do not set any plugin by default for CKEditor (suggested by Macrura)



### 1.6.1 (2017-10-04)

- fix missing CKEaddons configuration panel (reported by Rudy)
- ListerTweaks: if asmSelects are left empty, do not add default fields
- AdminThemeUikit: fix language switcher placement
- AdminThemeUikit: fix footer AOS enable/disable link position (reported by gmclelland)
- AdminThemeUikit: fix search box focus on alt+d (reported by gmclelland)
- AdminThemeUikit: fix page tree panel on alt+o (reported by gmclelland)
- AdminThemeUikit: fix missing save overlay on ctrl+s (reported by gmclelland)



### 1.6.0 (2017-10-02)

- fix templateEditLinks added to inline CKEditor content (reported by donatasben)



### 1.5.9 (2017-10-01)

- CKEditor customization tweak refactored to FieldOverrides submodule and is enabled for all field types
- enhance FieldOverrides config textarea by InputfieldAceExtended/CodeMirror JS (idea by Robin S)
- FieldOverrides: prepend field-overrides.ini file if exists (configurable in AssetPaths, idea by Robin S)
- use sticky CKEditor toolbar only above desktop screen width
- enable full row hover actions in the Tree panel too (reported by @adrianbj)
- added pagelist action icon "Empty Trash" for icon-only pagelist items (PageListTweaks)



### 1.5.8 (2017-09-23)

- CKEaddons: feature to set CKEditor toolbar items per field or user properties (based on code of Robin S)
- centerLogin fix for Forgot password module (requested by szabesz)
- fix hideNewDropdown hiding the entire topnav in the default theme
- update package.json to use uglify and to contain *_config.css/js assets too
- reorganize module assets to styles/scripts/images subdirectories



### 1.5.7 (2017-09-18)

- pageListTweaks: add Trash action for non-SuperUsers (merging module of Robin S)
- centerLogin fix for RenoTweaks (reported by Sam C)
- do not add NavItems for login page
- minor pageListTweaks improvements



### 1.5.6 (2017-09-14)

- PageListThumbs: always add edit link (no longer optional) + CSS fixes
- PageListCounter: fix counters when moving a page in the page tree
- fix page tree jump when entering page move mode



### 1.5.5 (2017-09-07)

- fix moveAssets, downloadAssets and filefield delete button overlaps (reported by lesaff)



### 1.5.4 (2017-09-05)

- rewrite sticky CKE toolbar feature to use position: sticky and moved to Misc
- enable prefix "!" for navItem pages group to show for superusers only
- fix: langTabHotkeySwitcher couldn't be enabled (Misc)
- fix gridImage title positioning with moveAssets buttons enabled



### 1.5.3 (2017-08-29)

- fix for a few file compiler issues and typos (thanks to @adrianbj)
- filterbox broken layout regression fix



### 1.5.2 (2017-08-28)

- new submodule: AddNewChildFirst based on Add New Child Reverse module by horst (re-thought by abdus/@adrianbj)
- merged PR #49 "Consistent UI and AdminThemeUikit compatibility" by jmartsch
- added: asmSelect NavItems can also be grouped into a submenu
- fix for missing submodule role selectors



### 1.5.1 (2017-08-15)

- fixed move up/down and delete icon overlap on File fields (reported by bernhard, lesaff, szabesz)
- CodeMirror CKE plugin update and word wrap fix



### 1.5.0 (2017-07-10)

- Misc: add new page: uncheck `Active?` for non-default language names (thanks to Tomka)
- Misc: hide the `Add new` dropdown button from above the main pagelist



### 1.4.9 (2017-07-03)

- fixed issue with edit link for fieldsets (reported by Robin S)
- fixed missing download link for SVGs (reported by Karl_T)
- noFilenameTruncate improvements (thanks to Robin S)
- removed Table Cells Celection CKEditor plugin (latest stock CKEditor has similar feature)
- added Token Replacement CKEditor plugin



### 1.4.8 (2017-06-15)

- fix for template edit links appearing next to Set Password fields (reported by Robin S)



### 1.4.7 (2017-06-12)

- fix for editedPage bug causing issues in repeater fields (thanks to Robin S)
- added iconsFilter (merging module of Robin S)
- new "Refresh" page list action (PageListTweaks)
- better CSS positioning of pagelist unselect restore button
- more foolproof pageListID replacement



### 1.4.6 (2017-05-23)

- show template edit link even if page is not allowed to be moved (reported by gmclelland #40)
- add pageListIDs only once per page (suggested by horst #45)



### 1.4.5 (2017-05-18)

- no longer use file_exists() for assetPaths



### 1.4.4 (2017-05-14)

- added package.json with npm tasks (jmartsch PR #44)



### 1.4.3 (2017-05-07)

- pageListIcons: allow adding additional classes to icons and minor updates



### 1.4.2 (2017-05-01)

- new submodule: RestrictTreeDropdown (merging module of Robin S)
- new submodule: PageListIcons
- added "Force showing system templates" tweak to Misc (snippets and suggestion by Robin S)
- word-wrap issue fix for non-truncated file field names (suggested by Robin S)
- fix for templateEditLink on Page template selector if changing page template is disabled (see #40)
- fix for PageListThumbs not appearing if tree was initially collapsed



### 1.4.1 (2017-03-31)

- new: links to edit translations for current textdomain file in other languages (Misc)
- added 'Indent Block' CKEditor plugin
- recalculate splitter height on window resize
- active sidebar menu item fix for NavItems



### 1.4.0 (2017-03-29)

- merge PR #41 from tobaco



### 1.3.9 (2017-03-23)

- tweaks to adminColumns splitter



### 1.3.8 (2017-03-23)

- fix JS error caused by adminColumns (reported by @adrianbj)



### 1.3.7 (2017-03-23)

- make CKEditor plugins work in ajax-loaded fields and repeaters (reported by Zeka)
- added draggable splitter to adminColumns using Split.js



### 1.3.6 (2017-03-21)

- add workaround for ctrl+s in maximized CKEditor (Maximize plugin, Hotkeys)
- better support for ctrl+s in modals
- add pagelist ID to the end of the page title even if a template icon is present



### 1.3.5 (2017-03-19)

- FieldAndTemplateEditLinks: added edit button after page edit Settings tab "Template" dropdown (requested by gmclelland)



### 1.3.4 (2017-03-18)

- FileFieldTweaks: new option to disable filename truncation for File fields



### 1.3.3 (2017-03-16)

- Added "Code Snippet" plugin to CKEaddons



### 1.3.2 (2017-03-12)

- Changed icons for the move to first/last buttons (FileFileTweaks) and now they trigger the leave confirmation dialog after re-order
- Filelist filterbox also searches in filename titles (useful if displayed filename is truncated)



### 1.3.1 (2017-03-11)

- Add move to first/last buttons (FileFieldTweaks, requested by matjazp)



### 1.3.0 (2017-03-11)

- AdminTweaks: added an option to align the top menu to left (idea & request by Robin S)
- PagelistIDs: fixed issues with latest PW versions (reported by @adrianbj)



### 1.2.9 (2017-03-02)

- NavItems: modified to fix JS error when used with Tracy Debugger
- Module settings page: fix scroll to target (reported by Robin S)



### 1.2.8 (2017-02-27)

- added alt+shift+b, alt+shift+n for bulleted/numbered list properties dialog (Hotkeys)



### 1.2.7 (2017-02-22)

- removed localization references from CKE plugin.js files to avoid JS errors



### 1.2.6 (2017-02-20)

- added counters to pagelist items (PageListTweaks)



### 1.2.5 (2017-02-15)

- fix submodule state check (reported by Macrura)



### 1.2.4 (2017-02-07)

- translator filter box: show hidden translations on search
- use "templates/admin/" folder for default admin asset paths (requested by Zeka)
- fix IUC button not added to URL fields (InputfieldURLCheckber)
- all submodule JS files merged to main JS
- reduced number of module files and overall size, eg. removing CKE plugin localization files
- documentation moved to GitHub Wiki



### 1.2.3 (2017-01-20)

- Hotkeys: focus filterbox on alt+s



### 1.2.2 (2017-01-18)

- title change case button improvements



### 1.2.1 (2017-01-17)

- Misc: option to move empty trash confirmation checkbox above trash items



### 1.2.0 (2017-01-13)

- Hotkeys: add alt+d to open page tree panel (requested by gmclelland)
- a few icon changes for icon-only page list actions



### 1.1.9 (2017-01-12)

- expand field placement select (if there's only one select)



### 1.1.8 (2017-01-09)

- add SVG background to show width divisions on Column width slider (asmTweaks)
- fixed non-functional Lister show extra actions toggle (reported by gmclelland)



### 1.1.7 (2016-12-29)

- asmTweaks: show field width percentages in template editor fields asmList + allow clicking on them to open edit the field at the Input tab (idea by bernhard)
- possible fix for case changer incorrect positioning (reported by gmclelland)



### 1.1.6 (2016-12-28)

- fix: ensure visibility of search box when focusing with alt+d (reported by gmclelland)



### 1.1.5 (2016-12-24)

- PageListUnselect: add trigger on unselect to allow dependent fields to update (reported by @adrianbj)



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

- fix for "Always show pagelist actions" on pagelist items with children (reported by @adrianbj)
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
- fix for missing pagelist IDs (reported by @adrianbj)
- added workaround for the subpixel issue in topnav third menu items (Default theme) 
- pagelist template edit action: fix missing action buttons (reported by @adrianbj)
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
- added e.metaKey besides e.ctrlKey (suggested by @adrianbj)
- separate CSS/JS for AOS configuration page (suggested by matjazp)
- do not load module CSS/JS when module is disabled
- flatModules: make "Add new module" section visible when clicking on "Add new" from sidebar/top menu (reported by @adrianbj)
- force loading of longclick.js for moduleModal (reported by gmclelland)
- fix for invisible AsmList items on drag (reported by @adrianbj)
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
- do not add template edit action if module is disabled (reported by @adrianbj)
- improvements to autohide sidebar + quicklinks



### 0.9.96 (2016-11-06)

- show pagelist action buttons on hovering lister rows (requested by @adrianbj)
- ListerTweaks: option to disable template edit action (requested by szabesz)
- fix: add TemplateEditLink to the end of pagelist actions if no extra actions exist (reported by @adrianbj)



### 0.9.95 (2016-11-06)

- hide submodule config jumplink if submodule is disabled
- preview some tweaks "real-time" on AOS config page (checkboxes only)



### 0.9.94 (2016-11-06)

- browser compability fixes for AOS submodule jumplinks (reported by Robin S)
- Delete pagelist action didn't worked in Lister (reported by @adrianbj)
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

- array to string conversion fix for InputfieldURLChecker (reported by Robin S)



### 0.8.1 (2016-10-17)

- fix for missing longclick action for pagelist item templateEditLink (reported by matjazp)



### 0.8.0 (2016-10-15)

- AdminTweaks: new tweak "Show pagelist actions on full row hover" (suggested by @adrianbj)



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
- fix overlapping icons in compact module list (reported by @adrianbj)
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
