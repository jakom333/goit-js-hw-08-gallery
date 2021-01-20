import galleryItems from './gallery-items.js';

const refs = {
  gallery: document.querySelector('.js-gallery'),
  closeBtn: document.querySelector('button[data-action="close-lightbox"]'),
  lightBox: document.querySelector('.js-lightbox'),
  bigImg: document.querySelector('.lightbox__image'),
};

const createMarkup = ({ preview, original, description }) =>
  `<li class="gallery__item">
<a
  class="gallery__link"
  href= ${original}
>
  <img
    class="gallery__image"
    src=${preview}
    data-source=${original}
    alt=${description}
  />
</a>
</li>`;

const createGalery = galleryItems =>
  galleryItems.map(item => createMarkup(item)).join('');

refs.gallery.insertAdjacentHTML('beforeend', createGalery(galleryItems));

const showImg = event => {
  event.preventDefault();
  refs.lightBox.classList.add('is-open');
  refs.bigImg.src = event.target.dataset.source;
};

const closeImg = () => {
  refs.lightBox.classList.remove('is-open');
  refs.bigImg.src = '';
};

const controlGallery = event => {
  if (
    event.target.classList.contains('gallery__image') &&
    !refs.lightBox.classList.contains('is-open')
  ) {
    showImg(event);
  }

  if (
    (refs.lightBox.classList.contains('is-open') &&
      event.target === refs.closeBtn) ||
    event.target.classList.contains('lightbox__content') ||
    event.code === 'Escape'
  ) {
    closeImg(event);
  }
};

document.addEventListener('click', controlGallery);
document.addEventListener('keydown', controlGallery);
