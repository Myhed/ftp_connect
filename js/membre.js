$('document').ready(function() {
    var self = this;
    var data = [];
    self.data = data;

    if (window.localStorage.length > 0) {


        var html = localStorage.getItem('Dossier_persos');
        html = JSON.parse(html);

        html.Dossier_persos.map(function(allContentMainFolder) {
                allContentMainFolder = allContentMainFolder.split(" ");
                return allContentMainFolder;
            })
            .forEach(typeFile => {
                ftpFunction.TypeOfFiles(typeFile, localStorage.getItem('oldFolder'));
            })

        $('#deconnexion').on('click', function(e) {
            ftpFunction.disconnect();
            e.preventDefault();
        })
    } else {
        window.location = "http://localhost/ftp_connect/index.php"
    }
    console.log(window.localStorage);
    $('.lien').on('click', function(e) {
        const url = this.getAttribute('href');
        const pattern = /[\w\/\.]+$/gi
        const oldFolder = url.match(pattern);
        if (!self.data[0]) {
            self.data.push(oldFolder[0]);
        }
        $.ajax({
            method: 'GET',
            url: url,
        }).done(q => {
            localStorage.removeItem('Dossier_persos');
            localStorage.setItem('Dossier_persos', q);
            var k = localStorage.getItem('Dossier_persos');
            k = JSON.parse(k);

            localStorage.setItem('oldFolder', self.data[0]);

            window.location = "membre.php"

        })
        e.preventDefault();
    })
    console.log(data);

})