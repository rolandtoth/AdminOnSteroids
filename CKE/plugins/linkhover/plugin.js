/*
* Link Hover plugin
*
* @author Robin Sallis: https://github.com/Toutouwai/linkhover
* @version 0.0.1
*/

CKEDITOR.plugins.add('linkhover', {
	init: function(editor) {
		editor.on('contentDom', function() {
			var editable = editor.editable();
			var old_title = false;
			editable.attachListener(editable, 'mouseover', function(e){
				var target = e.data.getTarget();
				if(target.is('a')) {
					old_title = target.getAttribute('title') || false;
					target.setAttribute('title', target.getAttribute('href'));
				}
			} );
			editable.attachListener(editable, 'mouseout', function(e){
				var target = e.data.getTarget();
				if(target.is('a')) {
					if(old_title) {
						target.setAttribute('title', old_title);
					} else {
						target.removeAttribute('title');
					}
				}
			});
		});
	}
});
