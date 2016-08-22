#Changelog


### 0.5.3 (2016-08-22)

- fixed FieldEditLink not showing up with InputfieldCheckbox where label was empty (reported by ceberlin)



- FileFieldToolbar submodule renamed to FileFieldTweaks
- added to download link (icon) to FileFieldTweaks
- fixed z-index issue that caused Profile dropdown to be overlapped by Notification menu (reported by Juergen)



### 0.5.1 (2016-08-20)

- fix for flickering hoverSaveDropdown issue
- fix for main menu submenu gap in Default theme (reported by bernhard)
- fix for gap in Default theme under page tabs when Prev/Next Tabs module is installed (reported by ceberlin)
- other CSS fixes/improvements



### 0.5.0 (2016-08-19)

- added "centeredLogin" to (default) AdminTweaks



### 0.4.9 (2016-08-19)

- added "centeredLogin" to RenoTweaks: align login page items to center
- modalModuleEdit: align action buttons to center in the modal
- modalModuleEdit: fix ctrl+s overlay added to parent document instead of modal's body
- animated compactModuleList settings icon (cog)



### 0.4.8 (2016-08-18)

- support for ctrl+s in modals
- added "Submit + Reload" button for modalModuleEdit
- added translatable strings for Save, Save + Exit, Save + Reload
- fix for malfunctional field edit links (reported by szabesz)



### 0.4.7 (2016-08-17)

- added "Settings" for PagelistThumbs with options right-aligned thumbs and edit page on thumb click
- PagelistThumbs uses the first image if supplied field is a multi-image field
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

- modalModuleEdit: added ESC close and secondary Submit button for submit+exit
- RenoTweaks: optional inline mode for sidebar items



### 0.4.2 (2016-08-10)

- modalModuleEdit option to ModalTweaks: edit modules in a modal dialog
- compactModuleList module names are "full-cell" sized for better clickability
- breadcrumbs ctrl+click fix for Default admin theme



### 0.4.1 (2016-08-10)

- workaround to use panel mode for repeaters and other fixes for InputfieldURLChecker
- added "Enable module" toggle
- layout improvements for sticky and compact headers (RenoTweak)
- miniScrollbar now works with stickyHeader (previously only with compactHeader)
- more general solution for HoverSaveDropdown



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
- added support for System Notifications module for stickyHeader (requested by szabesz)
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

- New tweak compactModuleList: remove table headers and category titles from the module list page
- New section created for module-related tweaks (currently contains compactModuleList and collapsedModuleInfos)



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

- new submodule NoAnims: disable all admin animations
- possible fix for module repository update showing "Requires 0.0.0 >= 0" (reported by matjazp)
- CSS fixes



### 0.2.2 (2016-06-20)

- Hotkeys submodule: currently only with ctrl+s to save page, even from within CKEditor
- CSS fixes



### 0.2.1 (2016-06-20)

- sticky admin tabs when compact sticky header is enabled
- stickyCKEditorToolbar fix for multilanguage fields
- module submitted to modules directory
- CSS fixes



### 0.2.0 (2016-06-15)

- new AsmTweak: Move delete button to the left
- AsmTweaks fixes



### 0.1.9 (2016-06-11)

- added first asmSelect tweak: collapseAsmSections



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
- new submodule: add preview link next to page title (PagePreviewLink). Target can be set to new tab/modal/panel.
- new RenoTweak: sticky CKEditor toolbar (available only if sticky header is on)
- module configuration page updates



### 0.1.0 (2016-05-30)

- new RenoTweak: AlwaysShowSearch
- new RenoTweak: stickyHeaderCompact
- HoverSaveDropdown supports "Save module", "Publish" and "Save unpublished" buttons
- module configuration page tweaks



### 0.0.9 (2016-05-29)

- FocusInputOnLangTabSwitch submodule: ctrl+click on a language tab will activate all the language tabs of the same language
- SuperUser check moved to PHP instead PHP+JavaScript



### 0.0.8 (2016-05-28)

- new tweak: HoverSaveDropdown



### 0.0.7 (2016-05-28)

- new Reno tweak: singleClickSidebarHeaders
- few CSS tweaks on the module's own admin page
- load module CSS on ready() to make module CSS tweaks available right after install



### 0.0.6 (2016-05-27)

- new tweaks: LoadCollapsedModuleInfos and fixScrollbarJump (Reno)
- revised default tweaks



### 0.0.5 (2016-05-27)

- added Reno tweaks hideSidebarQuickLinks and oneLineSidebarItems
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