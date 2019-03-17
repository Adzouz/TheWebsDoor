$(document).ready(function() {

	//if submit button is clicked
	$('#submit').click(function () {

		//Get the data from all the fields
		var name = $('input[name=name]');
		var email = $('input[name=email]');
		var subject = $('input[name=subject]');
		var comment = $('textarea[name=message]');
		var returnError = false;

		//Simple validation to make sure user entered something
		//Add your own error checking here with JS, but also do some error checking with PHP.
		//If error found, add hightlight class to the text field
		if (name.val()=='') {
			name.addClass('error');
			returnError = true;
		} else name.removeClass('error');

		if (email.val()=='') {
			email.addClass('error');
			returnError = true;
		} else email.removeClass('error');

		if (subject.val() == '') {
			subject.addClass('error');
			returnError = true;
		} else subject.removeClass('error');

		//E-mail address validation
		var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
		if(reg.test(email.val()) == false) {
			email.addClass('error');
			returnError = true;
		} else email.removeClass('error');

		if (comment.val()=='') {
			comment.addClass('error');
			returnError = true;
		} else comment.removeClass('error');

		// Highlight all error fields, then quit.
		if(returnError == true){
			return false;
		}
	});
});