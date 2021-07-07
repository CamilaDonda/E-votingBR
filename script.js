//interface

const seuVotoPara = document.querySelector('.d-1-1 span');
const cargo = document.querySelector('.d-1-2 span');
const descricao = document.querySelector('.d-1-4');
const aviso = document.querySelector('.d-2');
const lateral = document.querySelector('.d-1-right');
const numeros = document.querySelector('.d-1-3');

//environment 
let etapaAtual = 0;
let numero = '';
let votoBranco = false;

function comecarEtapa(){
    let etapa = etapas[etapaAtual];

    let numeroHtml = '';
    numero = '';
    votoBranco = false;
    
    for(let i=0;i<etapa.numeros;i++){
        if(i === 0){
            numeroHtml += '<div class="numero pisca"></div>';

        }else {
    numeroHtml += '<div class="numero"></div>';
    }
    }

    seuVotoPara.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    lateral.innerHTML = '';
    numeros.innerHTML = numeroHtml;
}



function atualizaInterface(){
let etapa = etapas[etapaAtual];
let candidato = etapa.candidatos.filter((item)=>{
    if(item.numero === numero){ return true;

    }else { return false;
   }
});
if (candidato.length > 0){
    candidato = candidato[0];
    seuVotoPara.style.display = 'block';
    descricao.innerHTML = `Nome: ${candidato.nome}<br/> Partido: ${candidato.partido}`;
    aviso.style.display = 'block';
    let fotosHtml = '';
    for(let i in candidato.fotos){
        fotosHtml += `<div class="d-1-image"><img src="imagem/${candidato.fotos[i].url}" alt=""/> ${candidato.fotos[i].legenda}</div>`;
    }
    lateral.innerHTML = fotosHtml;

}else{
    seuVotoPara.style.display = 'block';
    aviso.style.display = 'block';
    descricao.innerHTML = '<div class ="aviso--grande pisca">INVALID VOTE</div>'

}
}
//buttons 

function clicked(n){
    let elNumero = document.querySelector(".numero.pisca");
    if(elNumero !== null){
        elNumero.innerHTML = n;
        numero = `${numero}${n}`;

        elNumero.classList.remove('pisca');
        if(elNumero.nextElementSibling !== null){
            elNumero.nextElementSibling.classList.add('pisca');
        } else {
            atualizaInterface();
        }
        
    }
}
function branco(){
    if(numero === ''){
    votoBranco = true;
    seuVotoPara.style.display = 'block';
    aviso.style.display = 'block';
    numeros.innerHTML = '';
    descricao.innerHTML = '<div class ="aviso--grande pisca">BLANK BALLOT</div>'


    }else{
        alert('Do not click on any number if you are voting BLANK! Click REVISE, then BLANK')
    }
}
function corrige(){
    comecarEtapa();
}
function confirma(){
   let etapa = etapas[etapaAtual];
    let votoConfirmado =false;

    if( votoBranco === true){
        votoConfirmado = true;
        console.log('You voted BLANK')
    }else if(numero.length === etapa.numeros){
        votoConfirmado = true;
        console.log('You are voting'+ numero);
    }
    if(votoConfirmado){
        etapaAtual ++;
        if(etapas[etapaAtual] !== undefined){
            comecarEtapa();
        }else{
            document.querySelector('.tela').innerHTML = '<div class ="aviso--gigante pisca"> END </div>'
        }
    }
}
comecarEtapa();