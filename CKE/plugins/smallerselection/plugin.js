/**
 * @file Smaller Selection plugin for CKEditor
 * Copyright (C) 2012 Alfonso Martínez de Lizarrondo
 * Available under the GPL/LGPL/MPL
 * Fixes http://dev.ckeditor.com/ticket/8690
 * version 0.1.1 24/05/2016
 * Sponsored by: Netmedia.org
 */

/* globals CKEDITOR */

CKEDITOR.plugins.add( 'smallerselection', {
	init : function( editor ) {
		var trimSelection = function( event ) {
			var sel = editor.getSelection(),
				range = sel && sel.getRanges()[ 0 ],
				custom = false;

			if ( !range || range.collapsed )
				return;

			// If it's selecting different nodes, adjust to cover only one node (if possible?)
			if ( range.startContainer && range.endContainer && !range.startContainer.equals( range.endContainer) &&
				range.startContainer.type == CKEDITOR.NODE_TEXT ) {
				var start = range.startContainer,
					startOffset = range.startOffset,
					end = range.endContainer,
					endOffset = range.endOffset,
					startText = start.getText();

				// Move forward the start if it's at the end of a text node
				if ( startOffset == startText.length ) {
					start = start.getNextSourceNode( false, CKEDITOR.NODE_TEXT );
					startOffset = 0;
				}

				// Move back the end if it's at the start of a text node
				if ( end.type == CKEDITOR.NODE_TEXT && endOffset == 0 ) {
					end = end.getPreviousSourceNode( false, CKEDITOR.NODE_TEXT );
					endOffset = end.getText().length;
				}

				// IE might put as end container a node instead of a text node sometimes
				if ( end.type == CKEDITOR.NODE_ELEMENT ) {
					// get the node
					end = end.getChild( endOffset );
					// move back to the end of a text node
					end = end.getPreviousSourceNode( true, CKEDITOR.NODE_TEXT );
					endOffset = end.getText().length;
				}

				// If we have modified some of the anchors nodes:
				if ( !range.startContainer.equals( start ) || !range.endContainer.equals( end ) ) {
					range.startContainer = start;
					range.endContainer = end;
					range.startOffset = startOffset;
					range.endOffset = endOffset;
					custom = true;
				}
			}

			// Trim right
			if ( range.endContainer.type == CKEDITOR.NODE_TEXT && range.endOffset > 0 && range.endContainer.getText().substr( range.endOffset - 1 , 1 ) == ' ' ) {
				range.endOffset -= 1;
				custom = true;
			}

			if ( custom )
				range.select();
		};

		editor.on( 'contentDom', function() {
			// Try to adjust text selection by double click to not include trailing space
			editor.document.on( 'dblclick', trimSelection );

			editor.document.on( 'mouseup', trimSelection );
		});
	}
} );

