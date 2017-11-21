$('document').ready(function () {

    if (window.localStorage.length > 0) { //Si le localStorage n'est pas vide alors l'utilisateur est connecter 
        ftpFunction.filAriane()//fil d'ariane navigation pour l'utilisateur
        //Le localStorage n'est pas fixe il peut changer
        var html = localStorage.getItem('Dossier_persos'); //On récupère les dossiers du client dans le local Storage
        html = JSON.parse(html); // On parse le contenu qui était en json
        html.Dossier_persos.map(function (allContentMainFolder) { //On parcours tous son dossier persos
            allContentMainFolder = allContentMainFolder.split(" ");
            return allContentMainFolder;
        }).forEach(typeFile => {
            ftpFunction.TypeOfFiles(typeFile, localStorage.getItem('oldFolder')); /** @function  */
        })

        //Quand l'utilisateur click sur deconnexion il supprime les variable du localStorage et le redirige
        $('#deconnexion').on('click', function (e) {
            ftpFunction
                .disconnect()
                .done((disconnect) => {
                    if (disconnect.disconnected) {
                        localStorage.removeItem('Dossier_persos');
                        localStorage.removeItem('oldFolder');
                        window.location = "http://localhost/ftp_connect/index.php"
                    }
                })
            e.preventDefault();
        })
    } else {
        window.location = "http://localhost/ftp_connect/index.php" /**
         * si le local Storage est vide alors c'est que l'utilisateur n'a pas saisie d'identifiant
         * pour accéder à la page membre.php
         */ 
    }


    //Quand l'utilisateur click sur un lien qui a la classe .lien on récupère sont url
    //pour faire une requête au server 
    $('.lien').on('click', function (e) {
        const url = this.getAttribute('href');
        ftpFunction.getRequest(url) //Nous renvoie une promesse
            .done(getAllFolderByGet => { // renvoie du JSON
                ftpFunction.reDefinedOldFolder(getAllFolderByGet) // On stock le json dans le localStorage
                window.location = "membre.php" /**
                 * On le redirige sur la même page pour qu'il puisse prendre en compte
                 * le changement du local local Storage et le réaffiche plus en haut
                 */ 

            })
        e.preventDefault();
    })

})