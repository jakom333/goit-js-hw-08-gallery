import galleryItems from './gallery-items.js';

const refs = {
  gallery: document.querySelector('.js-gallery'),
  closeButton: document.querySelector('button[data-action="close-lightbox"]'),
  lightBox: document.querySelector('.js-lightbox'),
  bigImg: document.querySelector('.lightbox__image'),
  overlay: document.querySelector('.lightbox__overlay'),
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

function modalOpen(event) {
  event.preventDefault();
  const targetImage = event.target;
  if (targetImage === event.currentTarget) {
    return;
  }

  refs.lightBox.classList.add('is-open');
  refs.bigImg.alt = targetImage.alt;
  refs.bigImg.src = targetImage.dataset.source;
  window.addEventListener('keydown', handleEscape);
}

function modalClose() {
  refs.lightBox.classList.remove('is-open');
  refs.bigImg.alt = '';
  refs.bigImg.src = '';
  window.removeEventListener('keydown', handleEscape);
}

function closeOverlay(event) {
  event.target == event.currentTarget ? modalClose() : '';
}

function handleEscape(event) {
  event.code == 'Escape' ? modalClose() : '';
}

refs.gallery.addEventListener('click', modalOpen);
refs.closeButton.addEventListener('click', modalClose);
refs.overlay.addEventListener('click', closeOverlay);
