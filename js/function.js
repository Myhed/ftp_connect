const ftpFunction = {
    paramGet: [], // variables for get request param

    /**
     * @function void
     * @param {String} allFiles
     * @param {Optionel} paramUrl
     */
    TypeOfFiles: (allFiles, paramUrl = '') => {
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
    /**
     * @return {Promise}
     */
    disconnect: () => {
        return $.ajax({
            method: 'GET',
            url: 'http://localhost/ftp_connect/deconnexion.php',
            dataType: 'json'
        })
    },
    /**
     * @function {void}
     */
    filAriane: () => {
        const htmlFilAriane = $('#filAriane');
        const fil_Ariane = localStorage.getItem('oldFolder');
        let tableStringHref = [];
        if (fil_Ariane) {
            let tabFilAriane = fil_Ariane.split('/');
            tabFilAriane = tabFilAriane
                .filter((item) => item !== "")
                .reduce((acc, item, index) => {
                    acc += item !== "" ? '/' + item : "";
                    tableStringHref.push(acc)
                    return acc
                }, '')
            for (var i = 0; i < tableStringHref.length; i++) {
                var aElement = ftpFunction.creatElement('a', 'filAriane');
                var pattern = /[\w\._]+$/gi
                var nameFolder = tableStringHref[i].match(pattern)
                if (i < tableStringHref.length - 1) {
                    ftpFunction.initElementHtml(htmlFilAriane.children().eq(i), nameFolder[0], { class: 'lien previous', href: `http://localhost/ftp_connect/getRequest.php?folder=${tableStringHref[i]}` })
                } else {
                    ftpFunction.initElementHtml(htmlFilAriane.children().eq(i), nameFolder[0], { id: 'currentFolder' }, 'Dossier courant ')
                }
            }
            htmlFilAriane.css({
                "display": "block"
            })
        } else {
            htmlFilAriane.css({
                "display": "none"
            })
        }
    },
    /**
     * @function {void}
     * @param {parent} elementJQUERY - $('element')
     */
    creatFolderRoot: (parent) => {

        ftpFunction.creatElement('a', 'filAriane');
        ftpFunction.initElementHtml(parent, 'Dossier racine', { class: 'lien previous', href: 'http://localhost/ftp_connect/getRequest.php?folder=' })
    },
    initElementHtml: (parent, name, attr = {}, addTermOptional = null) => {
        if (addTermOptional !== null) {
            parent.append(addTermOptional + name)
        } else {
            parent.append(name)
        }
        for (attribute in attr) {
            parent.attr(`${attribute}`, `${attr[attribute]}`)
        }
    },

    /**
     * @function 
     * @return {Promise}
     * @param {url} [url=http://yourUrlOfYourServer]
     * @type {String} 
     */
    getRequest: url => {
        const pattern = /[\w\/._]+$/gi
        const oldFolder = url.match(pattern);
        (!ftpFunction.paramGet.length) ? ftpFunction.paramGet.push(oldFolder) : '';
        return $.ajax({
            method: 'GET',
            url: url,
        })
    },

    /**
     * @function {void}
     * @param {getAllFolderByGet} 
     * @type {JSON}
     */
    reDefinedOldFolder: (getAllFolderByGet = null) => {
        localStorage.removeItem('Dossier_persos');
        if (getAllFolderByGet !== null) {
            localStorage.setItem('Dossier_persos', getAllFolderByGet);
        }
        localStorage.removeItem('oldFolder');
        localStorage.setItem('oldFolder', ftpFunction.paramGet[0]);
    },

    creatElement: function (tagName, parent) {
        var ElementCreate = document.createElement(tagName);
        parent = document.getElementById(parent);
        parent.appendChild(ElementCreate);
    }

}


