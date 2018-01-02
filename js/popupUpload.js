$(function(){
    const upload = $('#upload');
    const mask = $('#mask');
    const form = $('#form');
    const closePopUp = $('#closePopUp');
    upload.on('click',function(e){
          mask.addClass('maskIsOn');
          form.addClass('formIsOn');
          setTimeout(function(){
            form.addClass('formIsMove')
          },250);
    });
    
    closePopUp.on('click',function(){
        form.removeClass('formIsMove');
        setTimeout(function(){
            form.removeClass('formIsOn');
            mask.removeClass('maskIsOn');
        },500)
    });
});

