const ftpFunction = {
    paramGet: [], // variables for get request param
    /**
     * @function void
     * @param {String} allFiles
     * @param {Optionel} paramUrl
     */
    TypeOfFiles: async (allFiles, paramUrl = '') => {
        const container = $('#table');
        const paramUrlExist = paramUrl ? paramUrl + '/' : '';
        $pattern = /^\-[\w]+/g;
        allFiles = allFiles.filter((File) =>{
            return File !== "";
        });
        if (allFiles[0].match($pattern)) {
        const date = ftpFunction.isNewFile(allFiles);
            container.append(`
                 <tr border="1">
                     <td><img src='img/file.png' height='20'><a href="${allFiles[allFiles.length-1]}">${allFiles[allFiles.length-1]}</a></td>
                     <td><a href="downLoadFile.php?download=${allFiles[allFiles.length-1]}" download="${allFiles[allFiles.length-1]}" class="download">Download</a></td>
                     <td class="date">${await date}<td>
                </tr>`);

        } else {
            container.append(`
            <tr>
                <td><img src='img/dossier.png' height='20'><a href="http://localhost/ftp_connect/getRequest.php?folder=${paramUrlExist}${allFiles[allFiles.length-1]}" class="lien">${allFiles[allFiles.length-1]}</a></td>
           </tr> `);
        }
    },
    contentOfAnyFolder: folder => {
       folder.map(function (allContentMainFolder) { //On parcours tous son dossier persos
            allContentMainFolder = allContentMainFolder.split(" ");
            return allContentMainFolder;
        }).forEach(typeFile => {
            ftpFunction.TypeOfFiles(typeFile, localStorage.getItem('oldFolder'));
        })
    },
    isNewFile: async file => {
        //File
        let response = '';
        const yearsOrHoursFile = file[file.length-2];
        const DateFile = file[file.length-3];
        const monthFile = file[file.length-4];
        
        //Date now 
        const month = {0:'Jan',1:'Feb',2:'Mar',3:'Apr',4:'May',5:'Jun',6:'Jul',7:'Aug',8:'Sep',9:'Oct',10:'Nov',11:'Dec'};
        const date = new Date(monthFile+' '+DateFile+' '+yearsOrHoursFile);
        const monthFileNow = date.getMonth();
        /*console.log(month[date]);*/
        if(yearsOrHoursFile.match(/[0-9]{2}:[0-9]{2}/)){
            if(DateFile == date.getDate() && monthFile == month[monthFileNow]){
                const count = yearsOrHoursFile.split(':');
                 let heurePublication = count[0] + count[1];
                 heurePublication = [new Date().getHours(),new Date().getMinutes()].join('') - heurePublication;
                 heurePublication = heurePublication.toString().split('');
                 switch(heurePublication.length){
                    case 3 : 
                        response +=  ` poster il y a ${heurePublication[0]} h ${heurePublication[1]}${heurePublication[2]} minutes` 
                    break;
                    case 4 :
                          response +=  ` poster il y a ${heurePublication[0]}${heurePublication[1]} h ${heurePublication[2]}${heurePublication[3]} minutes`
                    break;
                    default:
                        response += ` poster il y a ${heurePublication.join('')} minutes`
                 }
            }else{
                    //response = 'Le fichier a été poster le'+DateFile+monthFile;
            }
        }

            return response;
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
        const pattern = /[\w\._]+$/gi
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
                ftpFunction.creatFolderRoot($('#filArianeContainer'));
            for (let i = 0; i < tableStringHref.length; i++) {
                const aElement = ftpFunction.creatElement('a', 'filAriane');
                let nameFolder = tableStringHref[i].match(pattern)
                if (i < tableStringHref.length - 1) {
                    ftpFunction
                    .initElementHtml(
                        htmlFilAriane.children().eq(i), nameFolder[0], 
                        { class: 'lien previous', href: `http://localhost/ftp_connect/getRequest.php?folder=${tableStringHref[i]}` } )
                } else {
                    ftpFunction.initElementHtml(htmlFilAriane.children().eq(i), nameFolder[0], { id: 'currentFolder' }, 'Dossier courant ')
                }
            }
            $('#filArianeContainer').css({
                "display": "block"
            })
        } else {
            $('#filArianeContainer').css({
                "display": "none"
            })
        }
    },
    /**
     * @function {void}
     * @param {parent} elementJQUERY - $('element')
     */
    creatFolderRoot: (parent) => {

        ftpFunction.creatElement('a', 'backToRacine');
        console.log(parent.children().eq(1).children())
        ftpFunction.initElementHtml(parent.children().eq(1).children().eq(0), 'Dossier racine', { class: 'racine previous', href: '#' })
        parent.children().eq(1).children().eq(0).on('click',function(e){
            ftpFunction.getRequest('http://localhost/ftp_connect/getRequest.php?folder=.')
            .done(racineFolder => {
                localStorage.removeItem('Dossier_persos');
                localStorage.removeItem('oldFolder');
                localStorage.setItem('Dossier_persos',racineFolder);
                ftpFunction.paramGet = [];
                window.location='membre.php';
            })
        })
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
    getRequest:(url,dataType=null) => {
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
