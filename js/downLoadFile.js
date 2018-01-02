$('document').ready(function(){
    const downloads = $('.download');

    downloads.on('click',function(e){
         $.ajax({
             method:'GET',
             url:this.href
         }).done(F => {
            F = JSON.parse(F)
             console.log(F)
             download("data:text/plain",F.server,"plain/text");
         })
        e.preventDefault();
    });
});