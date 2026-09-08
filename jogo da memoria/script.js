const cartas = document.querySelectorAll('.box');

function virarCarta() {
    this.classList.toggle('flip');
}

cartas.forEach(carta => {
    carta.addEventListener('click', virarCarta);
});
