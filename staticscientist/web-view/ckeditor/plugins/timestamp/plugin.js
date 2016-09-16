CKEDITOR.plugins.add('timestamp', {
	icons : 'timestamp',
	init : function (editor) {
		//Plugin logic goes here.

	 	editor.addCommand('insertTimestamp', {
			exec : function (editor) {
				var now = new Date();
				editor.insertHtml('The current date and time is: <em>' + now.toString() + '</em>');
				//editor.insertHtml('');
			}
		}); 
		
		//editor.addCommand( 'insertTimestamp', new CKEDITOR.dialogCommand( 'abbrDialog' ) );

		editor.ui.addButton('Timestamp', {
			type: 'button',
			id: 'browse',
			label : 'Insert Timestamp',
			command : 'insertTimestamp',
			toolbar : 'insert'
		});
	}
});