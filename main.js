$(function(){
	const name = $('#name');
	const password = $('#password');
	const form = $('form');

	form.submit(function(){
		var valName = name.val();
		var valPass = password.val();	
		$.ajax({
			method:"POST",
			url:"http://localhost/ftp-connect/connected.php",
			data:{ name:valName,password:valPass},
			success:function(html){
					html = JSON.parse(html);
					if(!html.err){
						html.Dossier_perso.forEach(function(rawListsFolder){
							var detailsListArray=rawListsFolder.split(" ")
						})
					}
				}
			})

		return false;
	})
})