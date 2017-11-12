$(function () {
	const name = $('#name');
	const password = $('#password');
	const form = $('form');
	const err = $('#err');
	err.fadeOut();
	form.submit(function () {
		var valName = name.val();
		var valPass = password.val();
		$.ajax({
			method: "POST",
			url: "http://localhost/ftp_connect/postRequest.php",
			data: { name: valName, password: valPass },
			beforeSend:function(xhr){

				xhr.overrideMimeType( "text/plain; charset=x-user-defined" );
			}
		})
		.done(html => {

			html = JSON.parse(html);
			if (!html.err) {
				html.Dossier_perso
					.map(function (allContentMainFolder) {
						allContentMainFolder = allContentMainFolder.split(" ");
						return allContentMainFolder;
					})
					.forEach(typeFile => {
						ftpFunction.TypeOfFiles(typeFile)
						form.remove();
					})
			}else{
				err.html("")
				err.css({
					"width":450,
					"padding":"6"
				})
				err.append(`${html.err}`);
				err.fadeIn();
			}
		})

		return false;
	})

})