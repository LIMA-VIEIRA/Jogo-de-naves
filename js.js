function start() {

    $("#inicio").hide();

    $("#fundoGame").append("<div id='jogador' class='anima1'></div>");
    $("#fundoGame").append("<div id='inimigo1' class='anima2'></div>");
    $("#fundoGame").append("<div id='amigo' class='anima3'></div>");
    $("#fundoGame").append("<div id='inimigo2' class=''></div>");
    $("#fundoGame").append("<div id='placar'></div>");
    $("#fundoGame").append("<div id='energia'></div>");

    //Principais variáveis do jogo

    var podeAtirar = true;
    var jogo = {};
    var fimdejogo = false;
    var pontos = 0
    var salvos = 0
    var perdidos = 0
    var energiaAtual = 3;
    var velocidade = 5;
    var posicaoY = parseInt(Math.random() * 300);
    var TECLA = {
        UP: 38,
        DOWN: 40,
        SPACE: 32
    }

    jogo.pressionou = [];

    //Variáveis dos sons

     var somDisparo=document.getElementById("somDisparo");
     var somExplosao=document.getElementById("somExplosao");
     var musica=document.getElementById("musica");
     var somGameover=document.getElementById("somGameover");
     var somPerdido=document.getElementById("somPerdido");
     var somResgate=document.getElementById("somResgate");

    // Música de Fundo em Loop
    musica.addEventListener("ended", function(){ musica.currentTime = 0; musica.play(); }, false);
    musica.play();

    //Verifica se o usário pressionou alguma tecla

    $(document).keydown(function(e) {
        jogo.pressionou[e.which] = true;
    });

    $(document).keyup(function(e) {
        jogo.pressionou[e.which] = false;
    });

    //Game loop

    jogo.timer = setInterval(loop,30);

    function loop() {
        movefundo();
        moveJogador();
        moveInimigo1();
        moveInimigo2();
        moveAmigo();
        colisao();
        placar();
        energia();
    }

    //Função que movimenta o fundo do jogo

    function movefundo() {
        esquerda = parseInt($("#fundoGame").css("background-position"));
        $("#fundoGame").css("background-position", esquerda-1);
    }

    //Função que movimenta o jogador

    function moveJogador() {

        if (jogo.pressionou[TECLA.UP]) {
            var topo = parseInt($("#jogador").css("top"));
            $("#jogador").css("top", topo-10)

            if (topo<=10) {
                $("#jogador").css("top", topo+10)
            }
        }

        if (jogo.pressionou[TECLA.DOWN]) {
            var topo = parseInt($("#jogador").css("top"));
            $("#jogador").css("top", topo+10)

            if (topo>=400) {
                $("#jogador").css("top", topo-10)
            }
        }

        if (jogo.pressionou[TECLA.SPACE]) {

            //Chama Função disparo
            disparo();
        }

    }

    //Funções que movem os inimigos e amigo

    function moveInimigo1() {

        posicaoX = parseInt($('#inimigo1').css("left"));
        $("#inimigo1").css("left", posicaoX-velocidade);
        $("#inimigo1").css("top", posicaoY);

            if (posicaoX<=0) {
                posicaoY = parseInt(Math.random() * 300);
                $("#inimigo1").css("left", 634);
                $("#inimigo1").css("top", posicaoY);
            }

        }

        function moveInimigo2() {
        posicaoX = parseInt($('#inimigo2').css("left"));
        $("#inimigo2").css("left", posicaoX-3);

        if (posicaoX<=25) {
            $("#inimigo2").css("left", 760);
        }

    }

    function moveAmigo() {
        posicaoX = parseInt($('#amigo').css("left"));
        $("#amigo").css("left", posicaoX+1);

        if (posicaoX>=870) {
            $("#amigo").css("left", 15);
        }
    
    }

    //Funções de disparo e tempo de disparo

    function disparo() {

        if (podeAtirar == true) {

            somDisparo.play();
            podeAtirar = false;

            topo = parseInt($("#jogador").css("top"));
            posicaoX = parseInt($("#jogador").css("left"));
            tiroX = posicaoX + 190;
            topoTiro = topo + 37;
            $("#fundoGame").append("<div id='disparo'></div>");
            $("#disparo").css("top", topoTiro);
            $("#disparo").css("left", tiroX);

            tempoDisparo = window.setInterval (executaDisparo, 20);

        }
    }

    function executaDisparo() {
        posicaoX = parseInt($("#disparo").css("left"));
        $("#disparo").css("left", posicaoX + 15);

        if (posicaoX>860) {
            window.clearInterval(tempoDisparo);
            tempoDisparo=null;
            $("#disparo").remove();
            podeAtirar = true;
        }
    }

    //Funções de colisões

    function colisao() {

        var colisao1 = ($("#jogador").collision($("#inimigo1")));
        var colisao2 = ($("#jogador").collision($("#inimigo2")));
        var colisao3 = ($("#disparo").collision($("#inimigo1")));
        var colisao4 = ($("#disparo").collision($("#inimigo2")));
        var colisao5 = ($("#jogador").collision($("#amigo")));
        var colisao6 = ($("#inimigo2").collision($("#amigo")));

        // Jogador com inimigo 1

        if (colisao1.length>0) {

            energiaAtual--;
            somExplosao.play();
            inimigo1X = parseInt($("#inimigo1").css("left"));
            inimigo1Y = parseInt($("#inimigo1").css("top"));
            explosao1(inimigo1X, inimigo1Y);

            posicaoY = parseInt(Math.random() * 300);
            $("#inimigo1").css("left", 634);
            $("#inimigo1").css("top", posicaoY);
        }
    }
}