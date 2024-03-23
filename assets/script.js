let minutos = 0
let segundos = 60
let idIntervalo;
let tempoModorodoPadrao = 25
let tempoDescansoPadrao = 5
let digitalContador = document.getElementById('contador')
let labelMinuto = document.getElementById('minutos')
let labelSegundo = document.getElementById('segundos')
let tempoSelecionado
let response
let exercicios = []


function iniciarPomodoro() {
    console.log(tempoSelecionado)
    minutos = tempoSelecionado
    console.log(minutos)
    minutos--
    idIntervalo = setInterval(contadorTempo, 1000)
}

function pararPomodoro() {
    clearInterval(idIntervalo)
}

function zerarPomodoro() {
    clearInterval(idIntervalo)
    labelMinuto.innerText = '00'
    labelSegundo.innerText = '00'
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

    digitalContador.innerText = formatarContador(minutos) + `:` + formatarContador(segundos)

    if (minutos === 0 & segundos === 0) {
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
    let comboTempoPomodoro = document.getElementById('cbTempo').value
    tempoSelecionado = comboTempoPomodoro
    labelMinuto.innerText = comboTempoPomodoro
    labelSegundo.innerText = '00'
}

function formatarContador(numero) {
    return numero < 10 ? `0${numero}` : numero;
}

async function pegarExercicios() {
    const url = 'https://api.api-ninjas.com/v1/exercises?type=stretching'
    const apiKey = 'VA862GwnFzy6f3qr0pXQrg==LOGy16CvMPVjza2R';

    const queryParams = {
        type: 'stretching',
    }

    const queryString = new URLSearchParams(queryParams).toString()

    const UrlCompleta = `${apiUrl}?${queryString}`


    let options = {
        method: 'GET',
        headers: { 'X-Api-key': apiKey }
    }

    try {
        resposta = await fetch(UrlCompleta, options)

        if (resposta.status != 200) {
            throw new Error('Network response was not ok');
        }

        console.log(response.json())

    } catch (error) {
        console.log(error)
    }

    fetch(url, options)
        .then(res => res.json()) // parse response as JSON
        .then(data => {
            console.log(data)

        })
        .catch(err => {
            console.log(`error ${err}`)
        });
}