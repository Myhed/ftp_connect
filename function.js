const ftpFunction = {
    statePage:0,
    TypeOfFiles: (allFiles) => {
        const container = $('#table');
        $pattern = /^\-[\w]+/g;
        if (allFiles[0].match($pattern)) {
            container.append(`
                 <tr border="1">
                     <td><img src='img/file.png' height='20'><a href="${allFiles[21]}">${allFiles[21]}</a></td>
                </tr>`);
        } else {
            container.append(`<tr><td><img src='img/dossier.png' height='20'><a href="http://localhost/ftp_connect/getRequest.php?folder=${allFiles[21]}">${allFiles[21]}</a></td>
           </tr> `);
        }
    }
}