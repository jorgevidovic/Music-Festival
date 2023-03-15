document.addEventListener('DOMContentLoaded',function(){
    startApp();
});

function startApp(){
    createGallery();
    scrollNav();
    staticNavigation();
}

function staticNavigation(){
    const bar = document.querySelector('.header');
    const aboutFestival = document.querySelector('.aboutFestival');
    const body = document.querySelector('body');

    window.addEventListener('scroll', function(){
        if(aboutFestival.getBoundingClientRect().top < 0){
            bar.classList.add('fixed')
            body.classList.add('fixed-scroll')
        } else{
            bar.classList.remove('fixed')
            body.classList.remove('fixed-scroll')
        }
    })
}

function scrollNav() {
    const links = document.querySelectorAll('.mainNav a');

    links.forEach( link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const seccionScroll = e.target.attributes.href.value;
            const seccionScroll2 = "." + seccionScroll.substr(1);
            const seccion = document.querySelector(seccionScroll2);
            seccion.scrollIntoView();
        });
    });
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

    // Crea el overlay en la imagen
    const overlay = document.createElement('DIV');
    overlay.appendChild(image);
    overlay.classList.add('overlay');
    overlay.onclick = function(){
        const body = document.querySelector('body');
        body.classList.remove('setBody');
        overlay.remove();
    }

    // Botón para cerrar el modal
    const closeModal = document.createElement('P');
    closeModal.textContent = 'X';
    closeModal.classList.add('btn-closeModal');
    closeModal.onclick = function(){
        const body = document.querySelector('body');
        body.classList.remove('setBody');
        overlay.remove();
    }
    overlay.appendChild(closeModal);

    // Añadirlo al HTML
    const body = document.querySelector('body');
    body.appendChild(overlay);
    body.classList.add('setBody');
}




