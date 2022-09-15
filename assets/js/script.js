//Dados Inicias

let quadro = {
    a1: '', a2: '', a3: '',
    b1: '', b2: '', b3: '',
    c1: '', c2: '', c3: ''
};

let vez = '';
let aviso = '';
let player = false;

reset ();

//Eventos

document.querySelector('.reset').addEventListener('click', reset);
document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('click', itemClick);
});



//Funções

function itemClick(event) {
    let item = event.target.getAttribute('data-item');
    if(player && quadro[item] === '') {
        quadro[item] = vez;
        renderizarQuadro();
        trocarVez();
    }
}



function reset() {
    aviso = '';

    let random = Math.floor(Math.random() * 2);
    vez = (random === 0) ? 'x' : 'o';
    
    for (let i in quadro) {
        quadro[i] = '';
    }

    player = true;

    renderizarQuadro();
    renderizarInfo();

}

function renderizarQuadro() {
    for (let i in quadro) {
        let item = document.querySelector(`div[data-item=${i}]`);
        item.innerHTML = quadro[i];
    }

    verificarJogo();
}

function renderizarInfo() {
    document.querySelector('.vez').innerHTML = vez;
    document.querySelector('.resultado').innerHTML = aviso;
}


function trocarVez() {
    if(vez === 'x') {
        vez = 'o';
    } else {
        vez = 'x';
    }
    renderizarInfo();
}

function verificarJogo() {
    if(verificarVencedor('x')) {
        aviso = 'O "x" venceu';
        player = false;
    } else if(verificarVencedor('o')) {
        aviso = 'O "o" venceu';
        player = false;
    } else if(empate()) {
        aviso = 'Deu empate';
        player = false;
    }
}

function  verificarVencedor() {
    let possibilidades = [
        'a1,a2,a3',
        'b1,b2,b3',
        'c1,c2,c3',

        'a1,b1,c1',
        'a2,b2,c2',
        'a3,b3,c3',

        'a1,b2,c3',
        'a3,b2,c1'
    ];

    for(let concluiu in possibilidades) {
        let pArray =  possibilidades[concluiu].split(',');
        let venceu = pArray.every(option => quadro[option] === vez);
        if(venceu) { 
            return true;
        }          
    }
    
    return false;
}

function empate() {
    for(let i in quadro) {
        if(quadro[i] === '') {
            return false;
        }
    }

    return true;
}