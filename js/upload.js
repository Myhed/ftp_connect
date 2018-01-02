$(function(){
    const dropZone = $('#DropZone');

    dropZone.dropzone({url:'../upload.php'});
    alert();
});