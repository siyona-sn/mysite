export default function decorate(block) {
  const row = block.querySelector(':scope > div');

  if (!row) return;

  const imageWrapper = row.children[0];
  const contentWrapper = row.children[1];

  if (imageWrapper) {
    imageWrapper.classList.add('banner-image');
  }

  if (contentWrapper) {
    contentWrapper.classList.add('banner-content');
  }

  const cta = contentWrapper?.querySelector('a');
  if (cta) {
    cta.classList.add('banner-btn');
  }
}
