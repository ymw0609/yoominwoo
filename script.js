const slides = document.querySelectorAll('.slide');
const slideshow = document.querySelector('.slideshow');
let current = 0;

function showSlide(index) {
  slides.forEach(slide => slide.classList.remove('active'));
  slides[index].classList.add('active');
}

function nextSlide() {
  current = (current + 1) % slides.length;
  showSlide(current);
}

function prevSlide() {
  current = (current - 1 + slides.length) % slides.length;
  showSlide(current);
}

if (slides.length > 1 && slideshow) {
  // 클릭 이동
  slideshow.addEventListener('click', (e) => {
    const clickX = e.clientX;
    const screenWidth = window.innerWidth;

    if (clickX > screenWidth / 2) {
      nextSlide();
    } else {
      prevSlide();
    }
  });

  // 키보드 이동
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') nextSlide();
    if (e.key === 'ArrowLeft') prevSlide();
  });

  // 마우스 위치에 따라 커서 변경
  slideshow.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const width = window.innerWidth;

    if (x > width / 2) {
      slideshow.classList.add('cursor-right');
      slideshow.classList.remove('cursor-left');
    } else {
      slideshow.classList.add('cursor-left');
      slideshow.classList.remove('cursor-right');
    }
  });

  slideshow.addEventListener('mouseleave', () => {
    slideshow.classList.remove('cursor-left', 'cursor-right');
  });

  // 모바일 터치 슬라이드
  let touchStartX = 0;
  let touchEndX = 0;

  slideshow.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  slideshow.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  function handleSwipe() {
    const swipeDistance = touchEndX - touchStartX;

    if (Math.abs(swipeDistance) > 40) {
      if (swipeDistance < 0) {
        nextSlide(); // 왼쪽으로 밀면 다음
      } else {
        prevSlide(); // 오른쪽으로 밀면 이전
      }
    }
  }
}