const ftpFunction = {
    statePage: 0,
    TypeOfFiles: (allFiles, paramUrl = null) => {
        const container = $('#table');
        const paramUrlExist = paramUrl ? paramUrl + '/' : '';
        $pattern = /^\-[\w]+/g;
        if (allFiles[0].match($pattern)) {
            container.append(`
                 <tr border="1">
                     <td><img src='img/file.png' height='20'><a href="${allFiles[21]}">${allFiles[21]}</a></td>
                </tr>`);
        } else {
            container.append(`<tr><td><img src='img/dossier.png' height='20'><a href="http://localhost/ftp_connect/getRequest.php?folder=${paramUrlExist}${allFiles[21]}" class="lien">${allFiles[21]}</a></td>
           </tr> `);
        }
    },

    disconnect: () => {

        $.ajax({
            method: 'GET',
            url: 'http://localhost/ftp_connect/deconnexion.php',
            dataType: 'json'
        }).done((htmls) => {
            if (htmls.disconnected) {
                console.log(window.localStorage);
                localStorage.removeItem('Dossier_persos');
                localStorage.removeItem('oldFolder');
                window.location = "http://localhost/ftp_connect/index.php"
            }
        }).fail(error => {

            console.error(error);
        })
    },

    changeDirectory: () => {




    }

}