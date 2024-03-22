let minutos = 0
let segundos = 60
let horas = 0
let milliseconds = 0;
let idIntervalo;
let tempoModorodoPadrao = 1
let tempoDescansoPadrao = 5
let digitalContador = document.getElementById('contador')
const apiUrl = 'https://api.api-ninjas.com/v1/exercises'
const apiKey = 'Lnag8JbVMoTkvuKrLjejsw==V89esMtCr0Z2qNPb'
let response


function iniciarPomodoro() {
    minutos = tempoModorodoPadrao
    minutos--
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

function formatarContador(numero) {
    return numero < 10 ? `0${numero}` : numero;
}

async function pegarExercicios() {
    const queryParams = {
        type: 'stretching',
    }

    const queryString = new URLSearchParams(queryParams).toString()

    const UrlCompleta = `${apiUrl}?${queryString}`

    try {
        resposta = await fetch(UrlCompleta, {
            method: 'GET',
            headers: {
                "X-Auth-Token": apiKey
            },
            contentType: 'application/json'
        })

        if (resposta.status != 200) {
            throw new Error('Network response was not ok');
        }

        console.log(response.json())

    } catch (error) {
        console.log(error)
    }
}

function configurarTempo(){
    let divElementosConfigurar = document.querySelector('.config');

    if (divElementosConfigurar.style.display === 'none') {
        divElementosConfigurar.style.display = 'block';
      } else {
        divElementosConfigurar.style.display = 'none';
      }
}