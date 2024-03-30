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
let controlelista = 0;

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

    if (minutos === 0 && segundos === 0) {
        zerarPomodoro();
        // alert('Chegou a Hora de Iniciar um Exercício!')
        exibeExercicios();
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
    if (controlelista === 10) {
        let value = count - 1;
        let itemExcluir = document.getElementById(value.toString());
        if (itemExcluir) {
            itemExcluir.remove();
        } else {
            console.error(`Element with ID ${value} not found.`);
        }
    }
    let exercicioConcluido = document.createElement('li');
    exercicioConcluido.innerText = listaExercicios[count - 1].name + '\n';
    exercicioConcluido.style.textDecoration = 'line-through';
    exercicioConcluido.classList.add('exercicio-concluido');
    let id = count - 1;
    exercicioConcluido.id = id.toString();
    listaConcluidos.appendChild(exercicioConcluido);

    let itemExcluir = document.querySelector('.exercicio-item');
    itemExcluir.remove();
    iniciarPomodoro();
    if (count === 10) {
        offset += 10;
        pegarExercicios();
        count = 0;
    }
    // Salvar página atual e índice do alongamento no localStorage
    localStorage.setItem('paginaAtual', offset);
    localStorage.setItem('indiceAlongamento', count);
    controlelista++;
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

    const paginaSalva = localStorage.getItem('paginaAtual');
    const indiceSalvo = localStorage.getItem('indiceAlongamento');

    // Se houver dados salvos, redirecionar para a página e usar o índice
    if (paginaSalva && indiceSalvo) {
        offset = parseInt(paginaSalva); // Define a página salva
        count = parseInt(indiceSalvo); // Define o próximo alongamento
    }
    const UrlCompleta = "https://api.api-ninjas.com/v1/exercises?type=stretching&offset=" + offset;
    const apiKey = '';


    let options = {
        method: 'GET',
        headers: { 'X-Api-key': apiKey },
        contentType: 'application/json'

    }

    fetch(UrlCompleta, options)
        .then(res => res.json()) // parse response as JSON
        .then(data => {
            listaExercicios = data

        })
        .catch(err => {
            console.log(`error ${err}`)
        });
}