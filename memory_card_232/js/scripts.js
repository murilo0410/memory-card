// ======================================================
// JOGO DA MEMÓRIA - Versão simplificada (Corrigida)
// ======================================================

// Constante criada para ler os objetos do tabuleiro
const cartoes = document.querySelectorAll('.memory-card');

// Variáveis que controlam o estado do jogo
let primeiraCarta = null;   // guarda a 1ª carta clicada
let segundaCarta = null;    // guarda a 2ª carta clicada
let podeClicar = true;      // impede novos cliques enquanto o jogo "pensa"
let paresEncontrados = 0;   // conta quantos pares já foram descobertos

const totalDePares = cartoes.length / 2; // total de pares que existem no tabuleiro

// Elemento HTML que vai mostrar o tempo
const timerElement = document.querySelector('#timer');

// Botão que o jogador clica para começar
const botaoIniciar = document.querySelector('#start');

let segundosPassados = 0;  // quantos segundos já se passaram na partida atual
let temporizador = null;   // guarda o setInterval, para podermos pará-lo depois

// Função chamada toda vez que o jogador clica em uma carta
function virarCarta() {
    // Se o tabuleiro estiver travado, não faz nada
    if (!podeClicar) return; 

    // Se clicar duas vezes na mesma carta, não faz nada
    if (this === primeiraCarta) return;

    // Mostra a carta na tela (classe CSS que faz o "flip")
    this.classList.add('flip');

    if (primeiraCarta === null) {
        primeiraCarta = this;
        return;
    }
    segundaCarta = this;
    verificaPar();
}

function verificaPar() {
    const cartasIguais = primeiraCarta.dataset.framework === segundaCarta.dataset.framework;
    if (cartasIguais) {
        manterParEncontrado();
    } else {
        desvirarCartas();
    }
}

function manterParEncontrado() {
    primeiraCarta.removeEventListener('click', virarCarta);
    segundaCarta.removeEventListener('click', virarCarta);

    paresEncontrados++;

    resetarJogada();

    if (paresEncontrados === totalDePares){
        fimDeJogo();
    }
}

function desvirarCartas(){
    podeClicar = false;

    setTimeout(() => {
        primeiraCarta.classList.remove('flip');
        segundaCarta.classList.remove('flip');
        
        resetarJogada();
    }, 1500);
}

function resetarJogada() {
    primeiraCarta = null;
    segundaCarta = null;
    podeClicar = true;
}

function embaralharCartas() {
    cartoes.forEach(card => {
        const posicaoAleatoria = Math.floor(Math.random() * cartoes.length);
        card.style.order = posicaoAleatoria;
    });
}

function fimDeJogo() {
    alert('Parabéns! Você encontrou todos os pares.');
    resetarTabuleiro();
}

function resetarTabuleiro(){
    paresEncontrados = 0;

    cartoes.forEach(card => {
        card.classList.remove('flip');
        card.addEventListener('click', virarCarta);
    });

    embaralharCartas();
}

// Inicialização do jogo ao carregar a página
embaralharCartas();
cartoes.forEach(card => card.addEventListener('click', virarCarta));
