// ===== Dados dos tamanhos por modelo =====
const meuTamanhosPorModelo = {
  oitavada: ["20", "25", "30", "35", "40", "45"],
  smart: ["30", "35", "40"],
  retangular: ["PP1", "PP2", "Mini", "P", "M", "G"]
};

// ===== Seletores =====
const meusSlides = document.querySelectorAll(".slide");
const meuSelectModelo = document.getElementById("modelo");
const meuSelectTamanho = document.getElementById("tamanho");
const meusBotoesMaterial = document.querySelectorAll(".material-options .circle");

// ===== Estado =====
let meuMaterialSelecionado = "pardo";

// ===== Funções =====
function atualizarMeusTamanhos() {
  const modelo = meuSelectModelo.value.toLowerCase();
  const tamanhos = meuTamanhosPorModelo[modelo] || [];

  // limpa os tamanhos
  meuSelectTamanho.innerHTML = "";

  // recria as opções
  tamanhos.forEach((tam) => {
    const option = document.createElement("option");
    option.value = tam;
    option.text = tam;
    meuSelectTamanho.appendChild(option);
  });

  // seleciona o primeiro tamanho e atualiza a imagem
  if (tamanhos.length > 0) {
    meuSelectTamanho.value = tamanhos[0];

    // usamos setTimeout 0 para garantir que o DOM atualizou antes de chamar atualizarMeuSlide
    setTimeout(() => {
      atualizarMeuSlide();
    }, 0);
  } else {
    meusSlides.forEach(slide => slide.style.display = "none");
  }
}

function atualizarMeuSlide() {
  const modelo = meuSelectModelo.value.toLowerCase();
  const tamanho = meuSelectTamanho.value;

  let slideEncontrado = false;

  meusSlides.forEach(slide => {
    const slideModelo = slide.dataset.model.toLowerCase();
    const slideTamanho = slide.dataset.tamanho;

    const mostrar = slideModelo === modelo && slideTamanho === tamanho;
    slide.style.display = mostrar ? "block" : "none";
    if (mostrar) slideEncontrado = true;
  });

  // fallback: se não encontrou nenhum, mostra o primeiro slide do modelo
  if (!slideEncontrado) {
    const primeiro = Array.from(meusSlides).find(slide => slide.dataset.model.toLowerCase() === modelo);
    if (primeiro) primeiro.style.display = "block";
  }
}

// ===== Eventos =====
document.addEventListener("DOMContentLoaded", () => {
  atualizarMeusTamanhos();

  // ativa visualmente o material padrão
  const btnPadrao = document.querySelector(`.circle[data-material="${meuMaterialSelecionado}"]`);
  if (btnPadrao) btnPadrao.classList.add("active");
});

meuSelectModelo.addEventListener("change", atualizarMeusTamanhos);
meuSelectTamanho.addEventListener("change", atualizarMeuSlide);

meusBotoesMaterial.forEach(btn => {
  btn.addEventListener("click", () => {
    meuMaterialSelecionado = btn.dataset.material;
    meusBotoesMaterial.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    atualizarMeuSlide();
  });
});