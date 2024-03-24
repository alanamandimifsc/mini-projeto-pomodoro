let minutos = 0;
let segundos = 60;
let idIntervalo;
let tempoPomodoroPadrao = 25;
let tempoDescansoPadrao = 5;
let digitalContador = document.getElementById('contador');
let labelMinuto = document.getElementById('minutos');
let labelSegundo = document.getElementById('segundos');
const comboTempoPomodoro = document.getElementById('cbTempo');
const btnIniciar = document.getElementById('iniciar');
let tempoSelecionado;
let offset = 0;
let listaExercicios = [];
let count = 0;


function iniciarPomodoro() {
    if (tempoSelecionado === undefined) {
        minutos = tempoPomodoroPadrao
    } else {
        minutos = parseInt(tempoSelecionado)
    }

    minutos--
    btnIniciar.setAttribute('disabled', 'disabled')
    idIntervalo = setInterval(contadorTempo, 1000)
}

function pararPomodoro() {
    btnIniciar.removeAttribute('disabled')
    clearInterval(idIntervalo)
}

function zerarPomodoro() {
    btnIniciar.removeAttribute('disabled')
    clearInterval(idIntervalo)
    labelMinuto.innerText = tempoSelecionado != undefined ? tempoSelecionado : tempoPomodoroPadrao
    labelSegundo.innerText = formatarContador('0')
    minutos = 0
    segundos = 60
}

function contadorTempo() {
    if (segundos === 0) {
        minutos--;
        segundos = 59
    } else {
        segundos--;
    }

    labelMinuto.innerText = formatarContador(minutos)
    labelSegundo.innerText = formatarContador(segundos)

    if (minutos === 0 & segundos === 0) {
        exibeExercicios();
        zerarPomodoro();
        clearInterval(idIntervalo);
    }
}

function configurarTempo() {
    const divElementosConfigurar = document.querySelector('.config');

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

function insereExercicioConcluido() {

    let listaConcluidos = document.querySelector('.historico');
    let exercicioConcluido = document.createElement('li');
    exercicioConcluido.innerText = listaExercicios[count - 1].name + '\n';
    exercicioConcluido.style.textDecoration = 'line-through';
    exercicioConcluido.classList.add('exercicio-concluido');
    listaConcluidos.appendChild(exercicioConcluido);

    let itemExcluir = document.querySelector('.exercicio-item');
    itemExcluir.remove();
    iniciarPomodoro();
    if (count === 10) {
        offset += 10;
        pegarExercicios();
        count = 0;
    }
}

function exibeExercicios() {
    let lista = document.querySelector('.lista-exercicios');
    let listaExerc = document.createElement('li');
    listaExerc.classList.add('exercicio-item');
    listaExerc.innerText = `Name: ${listaExercicios[count].name}\nMuscle: ${listaExercicios[count].muscle}\nDifficulty: ${listaExercicios[count].difficulty}\nInstructions: ${listaExercicios[count].instructions}`;
    let button = document.createElement('button');
    button.classList.add('concluir');
    button.innerText = 'Concluir';
    button.addEventListener('click', insereExercicioConcluido) //{
    listaExerc.appendChild(button);
    lista.appendChild(listaExerc);
    count++;
}

function pegarExercicios() {
    // const url = 'https://api.api-ninjas.com/v1/exercises'
    const UrlCompleta = "https://api.api-ninjas.com/v1/exercises?type=stretching&offset=" + offset;
    const apiKey = 'VA862GwnFzy6f3qr0pXQrg==LOGy16CvMPVjza2R';

    // const queryParams = {
    //     type: 'stretching',
    // }

    // const queryString = new URLSearchParams(queryParams).toString()

    // const UrlCompleta = `${url}?${queryString}`


    let options = {
        method: 'GET',
        headers: { 'X-Api-key': apiKey },
        contentType: 'application/json'

    }

    fetch(UrlCompleta, options)
        .then(res => res.json()) // parse response as JSON
        .then(data => {
            listaExercicios = data

            const exerciciosFiltrados = data.reduce((acc, cur) => {
                acc.push({ nomeExercicio: cur.name, Instrucao: cur.instructions });
                return acc;
            }, []);

            console.log(exerciciosFiltrados);

        })
        .catch(err => {
            console.log(`error ${err}`)
        });
}