$(document).ready(function() {

	$(":file").filestyle({
		input : false
	});

	$(document).click(function(event) {

		if (!$(event.target).closest('#tag-dropdown1').length) {
			if ($('#tag-dropdown1').is(":visible")) {
				$('#tag-dropdown1').hide();
			}
		}

		if (event.target.id == "edit-tag")
			return;
		if (!$(event.target).closest('#manage-dropdown1').length) {
			if ($('#manage-dropdown1').is(":visible")) {
				$('#manage-dropdown1').hide();
				$("#manage-src").val("");
			}
		}
	});
}); 