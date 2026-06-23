export default function decorate(block) {
  const slides = [...block.children];

  const track = document.createElement('div');
  track.className = 'banner-track';

  slides.forEach((slide) => {
    slide.classList.add('banner-slide');
    track.append(slide);
  });

  block.innerHTML = '';
  block.append(track);

  // Navigation arrows
  const controls = document.createElement('div');
  controls.className = 'banner-controls';

  const prev = document.createElement('button');
  prev.className = 'banner-prev';
  prev.innerHTML = '&#10094;';

  const next = document.createElement('button');
  next.className = 'banner-next';
  next.innerHTML = '&#10095;';

  controls.append(prev, next);
  block.append(controls);

  let current = 0;

  function showSlide(index) {
    track.style.transform = `translateX(-${index * 100}%)`;

    document.querySelectorAll('.banner-dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  }

  // Dots
  const dots = document.createElement('div');
  dots.className = 'banner-dots';

  slides.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.className = 'banner-dot';

    dot.addEventListener('click', () => {
      current = index;
      showSlide(current);
    });

    dots.append(dot);
  });

  block.append(dots);

  prev.addEventListener('click', () => {
    current = current === 0 ? slides.length - 1 : current - 1;
    showSlide(current);
  });

  next.addEventListener('click', () => {
    current = current === slides.length - 1 ? 0 : current + 1;
    showSlide(current);
  });

  setInterval(() => {
    current = current === slides.length - 1 ? 0 : current + 1;
    showSlide(current);
  }, 5000);

  showSlide(0);
}
