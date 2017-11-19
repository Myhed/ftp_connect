$(function() {
    const name = $('#name');
    const password = $('#password');
    const form = $('form');
    const err = $('#err');
    err.fadeOut();
    form.submit(function() {
        var valName = name.val();
        var valPass = password.val();
        $.ajax({
                method: "POST",
                url: "http://localhost/ftp_connect/postRequest.php",
                data: { name: valName, password: valPass },
                beforeSend: function(xhr) {

                    xhr.overrideMimeType("text/plain; charset=x-user-defined");
                }
            })
            .done((html, textStatus, jqXHR) => {
                if (!html.err) {
                    if (jqXHR.status == 200) {
                        localStorage.setItem('Dossier_persos', html);
                        window.location = "membre.php"
                    }
                } else { // fin du if
                    html = JSON.parse(html);
                    err.html("")
                    err.css({
                        "width": 450,
                        "padding": "6"
                    })
                    err.append(`${html.message}`);
                    err.fadeIn();
                } //fin du else
            })

        return false;
    })

})