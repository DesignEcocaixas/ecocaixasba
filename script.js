
const modeloSelect = document.getElementById('modelo');
const materialButtons = document.querySelectorAll('.material-options .circle');
const slidesContainer = document.getElementById('slideContainer');
const allSlides = Array.from(slidesContainer.children);

let currentSlides = [];
let currentIndex = 0;

function updateSlideView() {
    slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
}

function showSlides(model, material) {
    // Esconde todos os slides
    allSlides.forEach(slide => slide.style.display = 'none');

    // Filtra os que combinam com modelo + material
    currentSlides = allSlides.filter(slide =>
        slide.dataset.model === model && slide.dataset.material === material
    );

    // Mostra os válidos
    currentSlides.forEach(slide => slide.style.display = 'block');

    currentIndex = 0;
    updateSlideView();
}

// Evento de mudança no modelo
modeloSelect.addEventListener('change', () => {
    const selectedModel = modeloSelect.value;
    showSlides(selectedModel, currentMaterial);
});

// Clique no botão de material
/*materialButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        materialButtons.forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        currentMaterial = btn.dataset.material;
        showSlides(modeloSelect.value, currentMaterial);
    });
});*/

// Clique no botão de material
materialButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // atualiza apenas o estado visual dos botões
        materialButtons.forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');

        // atualiza a variável do material selecionado
        currentMaterial = btn.dataset.material;

        // NÃO chamamos showSlides aqui para não alterar a imagem
        // showSlides(modeloSelect.value, currentMaterial);
    });
});

// Navegação dos botões
document.querySelector('.next-btn').addEventListener('click', () => {
    if (currentSlides.length === 0) return;
    currentIndex = (currentIndex + 1) % currentSlides.length;
    updateSlideView();
});

document.querySelector('.prev-btn').addEventListener('click', () => {
    if (currentSlides.length === 0) return;
    currentIndex = (currentIndex - 1 + currentSlides.length) % currentSlides.length;
    updateSlideView();
});

// Inicializa ao carregar a página
/*window.addEventListener('DOMContentLoaded', () => {
    materialButtons[0].classList.add('selected'); // marca o primeiro material como selecionado
    showSlides(modeloSelect.value, currentMaterial);
});*/

const finalizarCompraBtn = document.getElementById('finalizarCompra');
const modal = document.getElementById('modalCompra');
const fecharModalBtn = document.getElementById('fecharModal');

const tamanhoSelect = document.getElementById('tamanho');
const quantidadeInput = document.getElementById('quantidade');
const materialSelecionadoSpan = document.getElementById('infoMaterial'); // Vai atualizar com o currentMaterial
const infoModelo = document.getElementById('infoModelo');
const infoTamanho = document.getElementById('infoTamanho');
const infoQuantidade = document.getElementById('infoQuantidade');
const infoMaterial = document.getElementById('infoMaterial');

// Variável que guarda material selecionado (de seu código anterior)
let currentMaterial = 'pardo'; // Certifique-se de atualizar essa variável quando material mudar!

// Mostrar modal ao clicar em finalizar compra
finalizarCompraBtn.addEventListener('click', () => {
    // Atualiza os dados exibidos no modal
    infoModelo.textContent = modeloSelect.value;
    infoTamanho.textContent = tamanhoSelect.value;
    infoQuantidade.textContent = quantidadeInput.value;
    infoMaterial.textContent = currentMaterial;

    modal.style.display = 'flex';
});

// Fechar modal
fecharModalBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Fechar modal se clicar fora da caixa
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

document.getElementById('formCompra').addEventListener('submit', e => {
    e.preventDefault();

    const empresa = document.getElementById('empresa').value.trim();
    const telefone = document.getElementById('telefone').value.trim();
    const instagram = document.getElementById('instagram').value.trim();
    const site = document.getElementById('site').value.trim();
    const segmento = document.getElementById('segmento').value;
    const descricao = document.getElementById('descricao').value.trim();

    if (!empresa || !telefone || !segmento) {
        alert('Por favor, preencha todos os campos obrigatórios: nome da empresa, telefone e segmento.');
        return;
    }

    if (carrinho.length === 0) {
        alert('O carrinho está vazio!');
        return;
    }

    // Monta mensagem inicial com dados do cliente
    let mensagem =
        `Olá, vim do site e gostaria de fechar essa compra:\n\n` +
        `🏢 Empresa: ${empresa}\n` +
        `📞 Contato: ${telefone}\n` +
        `📸 Instagram: ${instagram || 'Não informado'}\n` +
        `🌐 Site/App: ${site || 'Não informado'}\n` +
        `🏷️ Segmento: ${segmento}\n` +
        `📝 Descrição: ${descricao || 'Sem descrição'}\n\n`;

    // Agrupa itens do carrinho por modelo
    const agrupados = carrinho.reduce((acc, item) => {
        if (!acc[item.modelo]) acc[item.modelo] = [];
        acc[item.modelo].push(item);
        return acc;
    }, {});

    // Adiciona detalhes do carrinho na mensagem
    for (const modelo in agrupados) {
        mensagem += `🧱 Modelo: ${modelo}\n`;
        agrupados[modelo].forEach(item => {
            mensagem += `  - Tamanho: ${item.tamanho} | Quantidade: ${item.quantidade} unidades | Material: ${item.material}\n`;
        });
        mensagem += '\n';
    }

    const numeroWhatsApp = '5581999999999'; // seu número
    const link = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;

    console.log(mensagem);

    window.open(link, '_blank');
    modal.style.display = 'none';
});


document.getElementById('copiarMensagem').addEventListener('click', (e) => {
    e.preventDefault();

    const empresa = document.getElementById('empresa').value.trim() || '[não preenchido]';
    const telefone = document.getElementById('telefone').value.trim() || '[não preenchido]';
    const instagram = document.getElementById('instagram').value.trim() || 'Não informado';
    const site = document.getElementById('site').value.trim() || 'Não informado';
    const segmento = document.getElementById('segmento').value || '[não preenchido]';
    const descricao = document.getElementById('descricao').value.trim() || 'Sem descrição';

    const itensCarrinho = carrinho; // ← pega diretamente da variável usada no restante do site

    if (itensCarrinho.length === 0) {
        alert('Carrinho vazio!');
        return;
    }

    // Agrupar por modelo para melhor organização
    const agrupados = itensCarrinho.reduce((acc, item) => {
        if (!acc[item.modelo]) acc[item.modelo] = [];
        acc[item.modelo].push(item);
        return acc;
    }, {});

    let detalhesPedidos = '';
    for (const modelo in agrupados) {
        detalhesPedidos += `🧱 Modelo: ${modelo}\n`;
        agrupados[modelo].forEach((item, i) => {
            detalhesPedidos += `  - Tamanho: ${item.tamanho} | Quantidade: ${item.quantidade} unidades | Material: ${item.material}\n`;
        });
        detalhesPedidos += '\n';
    }

    const mensagem = `Olá, vim do site e gostaria de fechar essa compra:

        🏢 Empresa: ${empresa}
        📞 Contato: ${telefone}
        📸 Instagram: ${instagram}
        🌐 Site/App: ${site}
        🏷️ Segmento: ${segmento}
        📝 Descrição: ${descricao}

        ${detalhesPedidos}`;

    console.log(mensagem);

    navigator.clipboard.writeText(mensagem).then(() => {
        alert('Mensagem copiada para a área de transferência!');
    }).catch(() => {
        alert('Não foi possível copiar a mensagem automaticamente. Por favor, copie manualmente.');
    });
});


const carrinho = []; // array para guardar os itens adicionados

document.getElementById('abrirCarrinho').addEventListener('click', () => {
    const modal = document.getElementById('modalCarrinho');
    const conteudo = document.getElementById('modalConteudoCarrinho');
    const listaCarrinho = document.getElementById('listaCarrinho');

    if (carrinho.length === 0) {
        listaCarrinho.innerHTML = '<p>O carrinho está vazio.</p>';
    } else {
        const agrupados = carrinho.reduce((acc, item) => {
            if (!acc[item.modelo]) acc[item.modelo] = [];
            acc[item.modelo].push(item);
            return acc;
        }, {});

        let html = '';
        for (const modelo in agrupados) {
            html += `<h3>Modelo: ${modelo}</h3><ul>`;
            agrupados[modelo].forEach(item => {
                const globalIndex = carrinho.indexOf(item);
                html += `<li style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
                    <span>Tamanho: ${item.tamanho} | Quantidade: ${item.quantidade} | Material: ${item.material}</span>
                    <button class="btnExcluirItem" data-index="${globalIndex}" style="
                        background: #dc3545; color: white; border: none; border-radius: 4px; padding: 2px 6px; cursor: pointer;
                    ">Excluir</button>
                </li>`;
            });
            html += '</ul><hr>';
        }

        listaCarrinho.innerHTML = html;

        document.querySelectorAll('.btnExcluirItem').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = parseInt(e.target.dataset.index);
                if (!isNaN(index)) {
                    carrinho.splice(index, 1);
                    atualizarContador();
                    document.getElementById('abrirCarrinho').click();
                }
            });
        });
    }

    modal.style.display = 'flex';
    conteudo.classList.remove('abrir-animado');
    void conteudo.offsetWidth;
    conteudo.classList.add('abrir-animado');
});


document.getElementById('fecharModalCarrinho').addEventListener('click', () => {
    document.getElementById('modalCarrinho').style.display = 'none';
});

// Fecha modal se clicar fora
window.addEventListener('click', (e) => {
    const modal = document.getElementById('modalCarrinho');
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

const contadorCarrinho = document.getElementById('contadorCarrinho');

function atualizarContador() {
    const quantidadeItens = carrinho.length;
    if (quantidadeItens > 0) {
        contadorCarrinho.style.display = 'inline-block';
        contadorCarrinho.textContent = quantidadeItens;
    } else {
        contadorCarrinho.style.display = 'none';
    }
}

document.getElementById('adicionarCarrinho').addEventListener('click', () => {
    const modelo = modeloSelect.value;
    const tamanho = tamanhoSelect.value;
    const quantidade = quantidadeInput.value;
    const material = currentMaterial;

    const item = { modelo, tamanho, quantidade, material };

    carrinho.push(item);

    alert(`Item adicionado ao carrinho:\nModelo: ${modelo}\nQuantidade: ${quantidade}`);

    atualizarContador();
});


// Inicializa contador quando a página carregar
window.addEventListener('DOMContentLoaded', atualizarContador);

function gerarResumoCarrinhoHtml() {
    if (carrinho.length === 0) return '<p>Carrinho vazio.</p>';

    const agrupados = carrinho.reduce((acc, item) => {
        if (!acc[item.modelo]) acc[item.modelo] = [];
        acc[item.modelo].push(item);
        return acc;
    }, {});

    let html = '<h4>Resumo do Carrinho:</h4><ul style="padding-left: 20px;">';
    for (const modelo in agrupados) {
        html += `<li><strong>Modelo: ${modelo}</strong><ul>`;
        agrupados[modelo].forEach(item => {
            html += `<li>Tamanho: ${item.tamanho} | Quantidade: ${item.quantidade} | Material: ${item.material}</li>`;
        });
        html += '</ul></li>';
    }
    html += '</ul>';
    return html;
}

document.getElementById('finalizarCompraCarrinho').addEventListener('click', () => {
    const resumoDiv = document.getElementById('infoCarrinhoResumo');
    resumoDiv.innerHTML = gerarResumoCarrinhoHtml();

    modal.style.display = 'flex';
    document.getElementById('modalCarrinho').style.display = 'none';
});

window.addEventListener("load", () => {
    document.body.classList.add("loaded");
});
