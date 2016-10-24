CKEDITOR.plugins.add('ckeditortablecellsselection', {
    init: function (editor) {

        var pluginDirectory = this.path;

        //add custom css
        editor.addContentsCss(pluginDirectory + 'styles/tablecellsselection.css');

        //add custom script
        CKEDITOR.scriptLoader.load(pluginDirectory + 'js/tablecellsselection.js');


        //editor.ui.addToolbarGroup('tables',0);//todo: what sens if we cand add it dinamic at runtime (used predefined or user config)

        //---------- Handlers
        //--- LOAD
        /*editor.on('loaded',function(event){
         console.log('loaded');
         });*/

         /*editor.on('instanceReady',function(event) {
             console.log('instanceReady');
         });*/

/*         //--- SNAPSHOT
         editor.on('getSnapshot',function(event){
         console.log('getSnapshot');

         });

         //todo: set tableCellsSelection here for undo/redo (delete on change)
         editor.on('loadSnapshot',function(event){
         console.log('loadSnapshot');
         });

         editor.on('lockSnapshot',function(event){
         console.log('lockSnapshot');
         });

         editor.on('saveSnapshot',function(event){
         console.log('saveSnapshot');
         });

         editor.on('unlockSnapshot',function(event){
         console.log('unlockSnapshot');
         });

         editor.on('updateSnapshot',function(event){
         console.log('updateSnapshot');
         });

         //--- MODE
         editor.on('beforeModeUnload',function(event){
         console.log('beforeModeUnload');
         });

         editor.on('beforeSetMode',function(event){
         console.log('beforeSetMode');
         });

         editor.on('mode',function(event){
         console.log('mode');
         });
         */


        //--- CONTENT DOM
        editor.on('contentDom', function (event) {
            //console.log('contentDom');
            initTablesSelection(event.editor);
        });

        editor.on('contentDomUnload', function (event) {
            //console.log('contentDomUnload');
            var document = event.editor.document;
            if (!document) return;
            destroyTablesSelection($(document.$));
        });

        /*editor.on('contentDomInvalidated',function(event){
         console.log('contentDomInvalidated');
         });*/

        //--- CHANGE
        //on change make all tables selectable (tableCellsSelection-jquery-plugin support multiple initialization on same DOM-node)
        editor.on('change', function (event) {
            //console.log('change');
            initTablesSelection(event.editor);
        });


        //--- INSERT
        /*editor.on('insertHtml',function(event){
         console.log('insertHtml');
         });

         editor.on('afterInsertHtml',function(event){
         console.log('afterInsertHtml');
         });

         editor.on('insertElement',function(event){
         console.log('insertElement');
         });

         editor.on('insertText',function(event){
         console.log('insertText');
         });


         //--- COPY/PASTE
         editor.on('paste',function(event){
         console.log('afterPaste');
         });

         editor.on('afterPaste',function(event){
         console.log('afterPaste');
         });
         */

        //--- DATA
        //From magicline-ckeditor-plugin
        // Thanks to that, an editor never yields data polluted by the box.
        // Listen with very high priority, so line will be removed before other
        // listeners will see it.
        //при получении данных - удаляем классы добавленные jquery-плагином для эмуляции выделения ячеек
        //todo: сделать тоже самое при getSnapshot, по идее тогда не будут сохраняться выделения для undo
        editor.on('beforeGetData', function (event) {
            //console.log('beforeGetData');
            var document = event.editor.document;
            if (!document) return;

            var $document = $(document.$);
            //чистим DOM от добавленных классов и других служебных изменений
            $().tableCellsSelection('removeDocumentHtmlChanges', $document);

            editor.once('getData', function () {
                $().tableCellsSelection('addDocumentHtmlChanges', $document);
            }, null, null, 1000);
        }, null, null, 0);

        /*editor.on('getData',function(event){
         console.log('getData');
         });

         editor.on('dataFiltered',function(event){
         console.log('dataFiltered');
         });

         editor.on('dataReady',function(event){
         console.log('dataReady');
         });

         editor.on('setData',function(event){
         console.log('setData');
         });
         */

        //--- FORMAT
        /*editor.on('toDataFormat',function(event){
         console.log('toDataFormat');
         });

         editor.on('toHtml',function(event){
         console.log('toHtml');
         });

         //--- FOCUS/BLUR
         editor.on('blur',function(event){
         console.log('blur');
         });

         editor.on('focus',function(event){
         console.log('focus');
         });

         //--- SELECTION
         editor.on('selectionChange',function(event){
         console.log('selectionChange');
         });
         */

        //todo: проверить нет ли повторного навешивания обработчика событий при редактировании и undo/redo
        function initTablesSelection(editor) {
            $document = $(editor.document.$);
            var $tables = $document.find('table');

            //инициализируем таблицы
            if ($tables.length > 0) $tables.tableCellsSelection();

            //и вешаем обработчик
            //this.$table.off('copy');
            /*var eventName = 'selectionchange.cellsselector';
            $tables.on(eventName,onTableCellSelectionChange);

            function onTableCellSelectionChange(event){
                editor.fire( 'selectionChange', {
                    selection: editor.getSelection(),
                    path: editor.elementPath()
                });
            }*/
        }


        function destroyTablesSelection($document) {
            var $tables = $document.find('table');
            if ($tables.length > 0) $tables.tableCellsSelection('destroy');
        }

        //Overwrite tabletools-plugin commands
        addCmd('cellMerge', createDef({
            allowedContent: 'td[colspan,rowspan]',
            requiredContent: 'td[colspan,rowspan]',
            exec: function (editor) {
                //replace tabletools>mergeCells() to mergeCellsByPlugin()
                placeCursorInCell(mergeCellsByPlugin(editor.getSelection()), true);
            }
        }));


        /* overwrite tabletools context menu items */
        // If the "menu" plugin is loaded
        if (editor.getMenuItem) {

            var tableCellMenuItem = editor.getMenuItem('tablecell');
            var prevGetItemsFunction = tableCellMenuItem.getItems;
            tableCellMenuItem.getItems = function () {
                //получаем предыдущие значения
                var ret = prevGetItemsFunction();

                var selection = editor.getSelection(),
                    cells = getSelectedCellsByTableCellsSelectionPlugin(selection);
                //заменяем необходимые на свои
                ret.tablecell_merge = mergeCellsByPlugin(selection, null, true) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED;//объединение ячеек
                ret.tablecell_properties = cells.length > 0 ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED;
                return ret;
            };
        }

        //---------- Helpers

        /*full copy of tabletools>mergeCells() except:
         - replace getSelectedCells() to getSelectedCellsByTableCellsSelectionPlugin();
         */
        function mergeCellsByPlugin(selection, mergeDirection, isDetect) {
            //var cells = getSelectedCells( selection );
            var cells = getSelectedCellsByTableCellsSelectionPlugin(selection);
            // Invalid merge request if:
            // 1. In batch mode despite that less than two selected.
            // 2. In solo mode while not exactly only one selected.
            // 3. Cells distributed in different table groups (e.g. from both thead and tbody).
            var commonAncestor;
            if (( mergeDirection ? cells.length != 1 : cells.length < 2 ) || ( commonAncestor = selection.getCommonAncestor() ) && commonAncestor.type == CKEDITOR.NODE_ELEMENT && commonAncestor.is('table'))
                return false;

            var cell,
                firstCell = cells[0],
                table = firstCell.getAscendant('table'),
                map = CKEDITOR.tools.buildTableMap(table),
                mapHeight = map.length,
                mapWidth = map[0].length,
                startRow = firstCell.getParent().$.rowIndex,
                startColumn = cellInRow(map, startRow, firstCell);

            if (mergeDirection) {
                var targetCell;
                try {
                    var rowspan = parseInt(firstCell.getAttribute('rowspan'), 10) || 1;
                    var colspan = parseInt(firstCell.getAttribute('colspan'), 10) || 1;

                    targetCell = map[mergeDirection == 'up' ? ( startRow - rowspan ) : mergeDirection == 'down' ? ( startRow + rowspan ) : startRow][
                        mergeDirection == 'left' ?
                            ( startColumn - colspan ) :
                            mergeDirection == 'right' ? ( startColumn + colspan ) : startColumn];

                } catch (er) {
                    return false;
                }

                // 1. No cell could be merged.
                // 2. Same cell actually.
                if (!targetCell || firstCell.$ == targetCell)
                    return false;

                // Sort in map order regardless of the DOM sequence.
                cells[( mergeDirection == 'up' || mergeDirection == 'left' ) ? 'unshift' : 'push'](new CKEDITOR.dom.element(targetCell));
            }

            // Start from here are merging way ignorance (merge up/right, batch merge).
            var doc = firstCell.getDocument(),
                lastRowIndex = startRow,
                totalRowSpan = 0,
                totalColSpan = 0,
            // Use a documentFragment as buffer when appending cell contents.
                frag = !isDetect && new CKEDITOR.dom.documentFragment(doc),
                dimension = 0;

            for (var i = 0; i < cells.length; i++) {
                cell = cells[i];

                var tr = cell.getParent(),
                    cellFirstChild = cell.getFirst(),
                    colSpan = cell.$.colSpan,
                    rowSpan = cell.$.rowSpan,
                    rowIndex = tr.$.rowIndex,
                    colIndex = cellInRow(map, rowIndex, cell);

                // Accumulated the actual places taken by all selected cells.
                dimension += colSpan * rowSpan;
                // Accumulated the maximum virtual spans from column and row.
                totalColSpan = Math.max(totalColSpan, colIndex - startColumn + colSpan);
                totalRowSpan = Math.max(totalRowSpan, rowIndex - startRow + rowSpan);

                if (!isDetect) {
                    // Trim all cell fillers and check to remove empty cells.
                    if (trimCell(cell), cell.getChildren().count()) {
                        // Merge vertically cells as two separated paragraphs.
                        if (rowIndex != lastRowIndex && cellFirstChild && !( cellFirstChild.isBlockBoundary && cellFirstChild.isBlockBoundary({br: 1}) )) {
                            var last = frag.getLast(CKEDITOR.dom.walker.whitespaces(true));
                            if (last && !( last.is && last.is('br') ))
                                frag.append('br');
                        }

                        cell.moveChildren(frag);
                    }
                    i ? cell.remove() : cell.setHtml('');
                }
                lastRowIndex = rowIndex;
            }

            if (!isDetect) {
                frag.moveChildren(firstCell);

                firstCell.appendBogus();

                if (totalColSpan >= mapWidth)
                    firstCell.removeAttribute('rowSpan');
                else
                    firstCell.$.rowSpan = totalRowSpan;

                if (totalRowSpan >= mapHeight)
                    firstCell.removeAttribute('colSpan');
                else
                    firstCell.$.colSpan = totalColSpan;

                // Swip empty <tr> left at the end of table due to the merging.
                var trs = new CKEDITOR.dom.nodeList(table.$.rows),
                    count = trs.count();

                for (i = count - 1; i >= 0; i--) {
                    var tailTr = trs.getItem(i);
                    if (!tailTr.$.cells.length) {
                        tailTr.remove();
                        count++;
                        continue;
                    }
                }

                return firstCell;
            }
            // Be able to merge cells only if actual dimension of selected
            // cells equals to the caculated rectangle.
            else {
                return ( totalRowSpan * totalColSpan ) == dimension;
            }
        }

        //---------- Helpers > plugin
        /**
         * Return selected cells by tableCellsSelection-jquery-plugin
         *
         * @param selection
         * @returns {Array}
         */
        function getSelectedCellsByTableCellsSelectionPlugin(selection) {
            var ranges = selection.getRanges();
            var range = ranges[0];
            var startNode = range.getCommonAncestor();
            var table = startNode.getAscendant('table', true);
            var $selectedCells = $(table.$).tableCellsSelection('selectedCells');

            var ret = [];
            //jquery to ckeditor.dom.element[]
            for (var i = 0; i < $selectedCells.length; i++) {
                ret[i] = new CKEDITOR.dom.element($selectedCells[i]);
            }
            return ret;
        }


        //---------- Helpers > Imported
        //from other plugins

        //---------- Helpers > Imported > tabletools plugin
        function createDef(def) {
            return CKEDITOR.tools.extend(def || {}, {
                contextSensitive: 1,
                refresh: function (editor, path) {
                    this.setState(path.contains({
                        td: 1,
                        th: 1
                    }, 1) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED);
                }
            });
        }

        function addCmd(name, def) {
            var cmd = editor.addCommand(name, def);
            editor.addFeature(cmd);
        }


        // Remove filler at end and empty spaces around the cell content.
        function trimCell(cell) {
            var bogus = cell.getBogus();
            bogus && bogus.remove();
            cell.trim();
        }


        function placeCursorInCell(cell, placeAtEnd) {
            var docInner = cell.getDocument(),
                docOuter = CKEDITOR.document;

            // Fixing "Unspecified error" thrown in IE10 by resetting
            // selection the dirty and shameful way (#10308).
            // We can not apply this hack to IE8 because
            // it causes error (#11058).
            if (CKEDITOR.env.ie && CKEDITOR.env.version == 10) {
                docOuter.focus();
                docInner.focus();
            }

            var range = new CKEDITOR.dom.range(docInner);
            if (!range['moveToElementEdit' + ( placeAtEnd ? 'End' : 'Start' )](cell)) {
                range.selectNodeContents(cell);
                range.collapse(placeAtEnd ? false : true);
            }
            range.select(true);
        }


        function cellInRow(tableMap, rowIndex, cell) {
            var oRow = tableMap[rowIndex];
            if (typeof cell == 'undefined')
                return oRow;

            for (var c = 0; oRow && c < oRow.length; c++) {
                if (cell.is && oRow[c] == cell.$)
                    return c;
                else if (c == cell)
                    return new CKEDITOR.dom.element(oRow[c]);
            }
            return cell.is ? -1 : null;
        }
    }
});