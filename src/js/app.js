document.addEventListener('DOMContentLoaded',function(){
    startApp();
});

function startApp(){
    createGallery();
}

function createGallery(){
    const gallery = document.querySelector('.galleryImages');
    for (let i = 1; i <= 12; i++){
        const image = document.createElement('picture');
        image.innerHTML = `
        <source srcset="build/img/thumb/${i}.avif" type="image/avif">
        <source srcset="build/img/thumb/${i}.webp" type="image/webp">
        <img loading="lazy" width="200" height="300" src="build/img/thumb/${i}.jpg" alt="gallery_image">`;

        image.onclick = function(){
            showImage(i);
        }
        gallery.appendChild(image);
    }
}

function showImage(id){
    const image = document.createElement('picture');
    image.innerHTML = `
    <source srcset="build/img/grande/${id}.avif" type="image/avif">
    <source srcset="build/img/grande/${id}.webp" type="image/webp">
    <img loading="lazy" width="200" height="300" src="build/img/grande/${id}.jpg" alt="gallery_image">`;

    const overlay = document.createElement('DIV');
    overlay.appendChild(image);
    overlay.classList.add('overlay');

    const body = document.querySelector('body');
    body.appendChild(overlay);
}




