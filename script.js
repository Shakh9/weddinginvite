// Наблюдатель для появления секций при скролле
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  },
  { threshold: 0.2 }
);
document.querySelectorAll('section').forEach((sec) => observer.observe(sec));
document.querySelectorAll('.program-item').forEach((item) => observer.observe(item));

// Таймер обратного отсчета
// const countdown = document.getElementById('countdown');
// const weddingDate = new Date('Aug 30, 2025 18:00:00').getTime();
// setInterval(() => {
//   const now = new Date().getTime();
//   const diff = weddingDate - now;
//   if (diff < 0) {
//     countdown.textContent = 'Свадьба уже началась!';
//     return;
//   }
//   const d = Math.floor(diff / 86400000);
//   const h = Math.floor((diff % 86400000) / 3600000);
//   const m = Math.floor((diff % 3600000) / 60000);
//   const s = Math.floor((diff % 60000) / 1000);
//   countdown.textContent = `${d} д ${h} ч ${m} м ${s} с`;
// }, 1000);
const daysElement = document.getElementById('days');
const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');
const weddingDate = new Date('Aug 30, 2025 18:00:00').getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const diff = weddingDate - now;

  if (diff < 0) {
    daysElement.textContent = '00';
    hoursElement.textContent = '00';
    minutesElement.textContent = '00';
    secondsElement.textContent = '00';
    return;
  }

  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);

  daysElement.textContent = d.toString().padStart(2, '0');
  hoursElement.textContent = h.toString().padStart(2, '0');
  minutesElement.textContent = m.toString().padStart(2, '0');
  secondsElement.textContent = s.toString().padStart(2, '0');

  // Добавляем анимацию для секунд
  const secondsCircle = document.querySelector('.seconds-circle');
  secondsCircle.style.animation = 'none';
  setTimeout(() => {
    secondsCircle.style.animation = 'pulse-second 1s ease-in-out';
  }, 10);
}

// Запускаем сразу и затем каждую секунду
updateCountdown();
setInterval(updateCountdown, 1000);

// Логика музыки
const music = document.getElementById('bg-music');
const musicBtn = document.getElementById('music-btn');
const startBtn = document.getElementById('start-btn');
const intro = document.getElementById('intro');
let isPlaying = false;
music.volume = 0.5; // Громкость на 50%

// Скрыть интро и показать кнопку музыки
function hideIntro() {
  intro.style.opacity = 0;
  setTimeout(() => (intro.style.display = 'none'), 1000);
  musicBtn.style.display = 'flex';
}

// Сменить иконку кнопки музыки
function setBtnPlayingState(playing) {
  isPlaying = playing;
  if (playing) {
    musicBtn.classList.add('playing');
    musicBtn.classList.remove('paused');
  } else {
    musicBtn.classList.add('paused');
    musicBtn.classList.remove('playing');
  }
}

// При клике на кнопку открытия приглашения
startBtn.addEventListener('click', () => {
  hideIntro();
  music.muted = false;
  const playPromise = music.play();
  if (playPromise !== undefined) {
    playPromise.then(() => setBtnPlayingState(true)).catch(() => setBtnPlayingState(false));
  }
});

// При клике на кнопку музыки
musicBtn.addEventListener('click', () => {
  if (isPlaying) {
    music.pause();
    setBtnPlayingState(false);
  } else {
    music
      .play()
      .then(() => setBtnPlayingState(true))
      .catch(() => setBtnPlayingState(false));
  }
});
