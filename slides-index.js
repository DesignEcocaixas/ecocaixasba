const slider = document.querySelector(".slider");
const slides = document.querySelectorAll(".slide");
let currentIndex = 0;

function showSlide(index) {
  const offset = -index * 100;
  slider.style.transform = `translateX(${offset}%)`;
}

document.querySelector('.prev').addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  showSlide(currentIndex);
});

document.querySelector('.next').addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % slides.length;
  showSlide(currentIndex);
});

// Autoplay (opcional)
setInterval(() => {
  currentIndex = (currentIndex + 1) % slides.length;
  showSlide(currentIndex);
}, 5000);

document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".counter");

  // Função para animar a contagem
  const animateCounter = (counter) => {
    const target = +counter.getAttribute("data-target");
    let duration;

    if (target <= 10) {
      duration = 1000;
    } else if (target <= 100) {
      duration = 1500;
    } else {
      duration = 2000;
    }

    const steps = 60;
    const increment = target / steps;
    let current = 0;

    // Impede sobreposição de animações
    if (counter.classList.contains("animating")) return;
    counter.classList.add("animating");

    const updateCount = () => {
      current += increment;
      if (current < target) {
        counter.innerText = "+" + Math.ceil(current).toLocaleString();
        setTimeout(updateCount, duration / steps);
      } else {
        counter.innerText = "+" + target.toLocaleString();
        counter.classList.remove("animating");
      }
    };

    updateCount();
  };

  // Observer para detectar quando o elemento entra na tela
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
        }
      });
    },
    {
      threshold: 0.6, // 60% visível
    }
  );

  counters.forEach((counter) => {
    observer.observe(counter);
  });
});


document.addEventListener("DOMContentLoaded", () => {
  const fadeElements = document.querySelectorAll(".main-text, .segments-container, .meet-factory, footer");

  const showOnScroll = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      } else {
        entry.target.classList.remove("visible"); // reverte ao subir
      }
    });
  };

  const observer = new IntersectionObserver(showOnScroll, {
    threshold: 0.1
  });

  fadeElements.forEach(el => {
    el.classList.add("fade-in");

    // Verifica se está visível no carregamento
    const bounding = el.getBoundingClientRect();
    const inView = bounding.top < window.innerHeight && bounding.bottom > 0;

    if (inView) {
      el.classList.add("visible");
    }

    observer.observe(el);
  });
});