//inicializa as casas com nove  para sabermos que não foi clicado
var casas = [9,9,9,9,9,9,9,9,9];

//indica a vez do jogador - (1) xis (-1) bola
var vez = 1

//conta  quantos cliques foram dados durante o jogo
var contaClique =0;

//placar
var iPontosX =0;
var iPontosO =0;
var iPontosV =0;
var sResposta="";
/////////

//fUNÇÃO QUE VERIFICA as jogadas
function verifica(casa){
    //verifica se a casa não foi clicada
    if(casas[casa]==9){
        //Modifica de 9 para o valor do jogador de vez
        casas[casa]=vez

        //se o jogador da vez for 1, coloca o desenho xis
        if(vez==1){
            document.getElementById('img'+casa).src ="img/fechar.png"
            //seo o jogador for -1, coloca o desenhoo da bola 
        }else{
            document.getElementById("img"+casa).src = "img/o.png"
        }
        //inverte o jogador da vez
        vez*=-1;
        contaClique++

        //confere se houver vencedor
        confere()
    }

}

//funçao que testa se houve vencedor 
function confere(){
    var i

    //var que marca se houver ganhador
    var lGanhou = false

    //var que marca se o jogador acabou(todas as casas clicadas)
    var lAcabou = true

    //percorrer todas aas casas para verificar ainda existe alguma nao clicada 
    for(i=0;i<casas.length;i++){
        if(casas[i]==9){
            //se houver, significa que não deu velha
            lAcabou = false
        }
    }
    //se a quantidade de cliques forem 9,  jogo acaba
    if(contaClique==9){
        lAcabou = true
    }

    //Realiza a soma de cada coluna , linha e diagonal e coloca o valor num vetor 
    var Soma = []
    Soma[0]=casas[0]+casas[1]+casas[2] // linha 1
    Soma[1]=casas[3]+casas[4]+casas[5] // linha 2
    Soma[2]=casas[6]+casas[7]+casas[8] // linha 3
    Soma[3]=casas[0]+casas[3]+casas[6] // coluna 1
    Soma[4]=casas[1]+casas[4]+casas[7] // coluna 2
    Soma[5]=casas[2]+casas[5]+casas[8] // coluna 3
    Soma[6]=casas[0]+casas[4]+casas[8] // diagonal 1
    Soma[7]=casas[2]+casas[4]+casas[6] // diagonal 2


    //percorre todos os valores de soma
    for(i=0;i<Soma.length;i++){
        //se achou soma (-3) é porque a x ganhou
        if(Soma[i] == 3){
            lGanhou = true
            sResposta = "X ganhou!"
            iPontosX++
            document.getElementById('xis').innerHTML ="PONTOS X: "+iPontosX
            break

            //se achpu soma 3, é porque O ganhou
        }else if(Soma[i]==-3){
            lGanhou = true
            sResposta = "Bolinha ganhou!"
            iPontosO++
            document.getElementById('bola').innerHTML ="PONTOS O: "+iPontosO
            break
        }
    }

    //se bola e nem xis ganharam, mas o jogo acabou, é porque deu velha 
    if(lGanhou == false && lAcabou==true){
        sResposta = "Deu velha"
        iPontosV++
        document.getElementById('velha').innerHTML="velha...: "+iPontosV
    }

    //se alguem ganhou ou o jogo acabou
    if(lGanhou || lAcabou){
        for(i=0; i<casas.length;i++){
            document.getElementById('casa'+i).disabled = true
            casas[i] = 0
        }

        //exibe o resultado 
        document.getElementById('resposta').innerHTML = sResposta
        //muda cor da letra
        document.getElementById('resposta').style.color = "#ffc400"
        //muda tamanho da letra
        document.getElementById('resposta').style.fontSize = "xx-large"
    }
    function recomeca(){
        for(i=0;i<casas.length;i++){
            //nao permite arrastar a img
            document.getElementById("img"+i).ondragstart = function(){return false;}

            //habilita casas
            document.getElementById("casa"+i).disable = false

            //remove imgs
            document.getElementById("img"+i).src =""
            //volta a config original 
            document.getElementById("resposta").innerHTML ="RESULTADO: "
            document.getElementById("resposta").style.color ="#f5ff00"
            document.getElementById("resposta").style.fontSize ="large"

            //restaura os 9 das casas
            casas[i]=9
            lGanhou = false
            lAcabou = false
            contaClique=0
            vez=1
        }
    }
    var botao = document.getElementById('btnNovo')
    botao.addEventListener('click', recomeca)
}