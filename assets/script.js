let minutos = 0
let segundos = 60
let horas = 0
let milliseconds = 0;
let idIntervalo;
let tempoModorodoPadrao = 25
let tempoDescansoPadrao = 5
let digitalContador = document.getElementById('contador')
let offset = 0;
const url = "https://api.api-ninjas.com/v1/exercises?type=stretching&offset=" + offset;;
const apiKey = 'VA862GwnFzy6f3qr0pXQrg==LOGy16CvMPVjza2R';
let listaExercicios = [];
let count = 0;


function iniciarPomodoro() {
    segundos = 5;
    // minutos = tempoModorodoPadrao-1
    // minutos--
    idIntervalo = setInterval(contadorTempo, 1000)
}

function pararPomodoro() {
    clearInterval(idIntervalo)
}

function zerarPomodoro() {
    clearInterval(idIntervalo)
    digitalContador.innerText = '25:00'
    minutos = 0
    segundos = 60
    horas = 0
}

function contadorTempo() {
    if (segundos === 0) {
        minutos--;
        segundos = 59
    } else {
        segundos--;
    }

    digitalContador.innerText = formatarContador(minutos) + `:` + formatarContador(segundos)

    if (minutos === 0 & segundos === 0) {
        exibeExercicios();
        clearInterval(idIntervalo);
    }
}

function formatarContador(numero) {
    return numero < 10 ? `0${numero}` : numero;
}


function exibeExercicios() {
    let lista = document.querySelector('#lista-exercicios');
    let listaExerc = document.createElement('li');
    listaExerc.classList.add('exercicio-item');
    listaExerc.innerText = `Name: ${listaExercicios[count].name}\nMuscle: ${listaExercicios[count].muscle}\nDifficulty: ${listaExercicios[count].difficulty}\nInstructions: ${listaExercicios[count].instructions}`;
    lista.appendChild(listaExerc);
    count++;

}

function pegarExercicios() {

    let options = {
        method: 'GET',
        headers: { 'x-api-key': apiKey },
        contentType: 'application/json'
    }


    fetch(url, options)
        .then(res => res.json()) // parse response as JSON
        .then(data => {
            listaExercicios = data;
            console.log(listaExercicios);
        })
        .catch(err => {
            console.log(`error ${err}`)
        });
}