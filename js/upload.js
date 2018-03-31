$(function(){
	let path;
	$('form').submit(function(){
		const file = $('input[name=file]').val()
		var formData = new FormData($(this)[0]);
		$.ajax({
			   url: 'upload.php',
    		   data:formData,
               cache: false,
               contentType: false,
               processData: false,
               method: 'POST',
               type: 'POST',
               dataType:'json'
		}).done(res => {
			const namesFolders = res.split('/').filter((nameFolder) => {
				return nameFolder !== "";
			});
			if(namesFolders.length >=2){
				path = namesFolders.reduce((acc,nameFolder) => {
				acc += '/'+nameFolder;
				return acc; 
				},'');
			}else{
				path = namesFolders[0];
			}
			return path;
		}).done(path => {
		 ftpFunction.getRequest(`http://localhost/ftp_connect/getRequest.php?folder=${path}`)
            .done(uploadFolder => {
                localStorage.removeItem('Dossier_persos');
                localStorage.setItem('Dossier_persos',uploadFolder);
                console.log(localStorage.getItem('Dossier_persos'));
                window.location='membre.php';
           })
		});
		return false;
	});

	
});