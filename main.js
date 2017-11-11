$(function(){
	const name = $('#name');
	const password = $('#password');
	const form = $('form');
	const body = $('body');
	
	form.submit(function(){

		var valName = name.val();
		var valPass = password.val();	
		$.ajax({
			method:"POST",
			url:"http://localhost/ftp_connect/connected.php",
			data:{ name:valName,password:valPass},
			success:function(html){
					html = JSON.parse(html);
					if(!html.err){
						const typeOfFile = html.Dossier_perso
						.map(function(item){
							item = item.split(" ");
							return item;
						})
						.forEach(typeFile =>{
							$pattern = /^\-[\w]+/g;

							if(typeFile[0].match($pattern)){
								body.append(`<img src='img/file.png' height='20'>${typeFile[21]}<br>`);
							}else{
								body.append(`<a href="?folder=${typeFile[21]}"><img src='img/dossier.png' height='20'>${typeFile[21]}</a><br>`);
							}
						})
					}
					
				}
			})

		return false;
	})
})