let minutos = 0
let segundos = 60
let idIntervalo;
let tempoPomodoroPadrao = 1
let tempoDescansoPadrao = 5
let digitalContador = document.getElementById('contador')
let labelMinuto = document.getElementById('minutos')
let labelSegundo = document.getElementById('segundos')
let comboTempoPomodoro = document.getElementById('cbTempo')
let tempoSelecionado
let response
let exercicios = []


function iniciarPomodoro() {
    if(tempoSelecionado === undefined){
        minutos = tempoPomodoroPadrao
        console.log(minutos);
    }else {
        minutos = parseInt(tempoSelecionado)
    }

    minutos--
    idIntervalo = setInterval(contadorTempo, 1000)
}

function pararPomodoro() {
    clearInterval(idIntervalo)
}

function zerarPomodoro() {
    clearInterval(idIntervalo)
    labelMinuto.innerText = tempoSelecionado != undefined ? tempoSelecionado : tempoPomodoroPadrao
    labelSegundo.innerText = formatarContador('0')
    minutos = 0
    segundos = 60
}

function contadorTempo() {
    if (segundos === 0) {
        minutos--
        segundos = 59
    } else {
        segundos--
    }

    labelMinuto.innerText = formatarContador(minutos)
    labelSegundo.innerText = formatarContador(segundos)


    console.log(typeof minutos);
    console.log(typeof segundos);

    console.log(minutos);
    console.log(segundos);

    if (minutos == 0 & segundos == 0) {
        pegarExercicios()
        clearInterval(idIntervalo)
    }
}

function configurarTempo() {
    let divElementosConfigurar = document.querySelector('.config');

    if (divElementosConfigurar.style.display === 'none') {
        divElementosConfigurar.style.display = 'block';
    } else {
        divElementosConfigurar.style.display = 'none';
    }
}

function selecionarTempoPomodoro() {
    tempoSelecionado = comboTempoPomodoro.value
    labelMinuto.innerText = tempoSelecionado
    labelSegundo.innerText = '00'
}

function formatarContador(numero) {
    return numero < 10 ? `0${numero}` : numero;
}

function pegarExercicios() {
    const url = 'https://api.api-ninjas.com/v1/exercises'
    const apiKey = 'VA862GwnFzy6f3qr0pXQrg==LOGy16CvMPVjza2R';

    const queryParams = {
        type: 'stretching',
    }

    const queryString = new URLSearchParams(queryParams).toString()

    const UrlCompleta = `${url}?${queryString}`


    let options = {
        method: 'GET',
        headers: { 'X-Api-key': apiKey }
    }

    fetch(UrlCompleta, options)
        .then(res => res.json()) // parse response as JSON
        .then(data => {
            console.log(data)

        })
        .catch(err => {
            console.log(`error ${err}`)
        });
}