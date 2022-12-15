$( document ).ready(function(){
/*const imagens = [
    'img/facebook.png',
    'img/android.png',
    'img/chrome.png',
    'img/firefox.png',
    'img/googleplus.png',
    'img/twitter.png',
    'img/windows.png',
    'img/html5.png',
    'img/facebook.png',
    'img/android.png',
    'img/chrome.png',
    'img/firefox.png',
    'img/googleplus.png',
    'img/twitter.png',
    'img/windows.png',
    'img/html5.png'];
*/
const imagens = [
    {
        "img": 'img/facebook.png'
    }
    ,
    {
        "img":'img/android.png'
    }
    ,
    {
        "img":'img/chrome.png'
    },
    {
        "img":'img/firefox.png'
    },
    {
        "img": 'img/googleplus.png'
    },
    {
        "img": 'img/twitter.png'
    },
    {
        "img":  'img/windows.png'
    },
    {
        "img": 'img/html5.png'
    },
    {
        "img": 'img/facebook.png'
    }
    ,
    {
        "img":'img/android.png'
    }
    ,
    {
        "img":'img/chrome.png'
    },
    {
        "img":'img/firefox.png'
    },
    {
        "img": 'img/googleplus.png'
    },
    {
        "img": 'img/twitter.png'
    },
    {
        "img":  'img/windows.png',
    },
    {
        "img": 'img/html5.png',
    }
    ];
    
    var $botoes = $('<div id="corpo" style="margin-bottom:100px;">')
    $("#tabuleiro").prepend($botoes)
    
    imagens.forEach(img => {
        var $cards = $('<div class="cards">')
        $($botoes).append($cards);
        $($cards).attr("data-card", img.img)
        var $frente = $('<div class="frente">')
        var $verso = $('<div class="verso">')
        $($cards).append($frente);
        $($cards).append($verso);
        var $imgFrente = $(`<img src="${img.img}">`)
        var $imgVerso = $(`<img src="img/cross.png">`)
        $($frente).append($imgFrente)
        $($verso).append($imgVerso)
    })
    var $melhorTempo = $('<div id="melhortempo">')
    var $iniciar = $('<button id="botao" >Iniciar</button>')
    var $timer = $('<div id="timer" style="font-size: 23px;">')
    var $h2 = $('<h2>Jogo da Memória</h2>')
    $("#tabuleiro").prepend($melhorTempo)
    $("#tabuleiro").prepend($iniciar)
    $("#tabuleiro").prepend($timer)
    $("#tabuleiro").prepend($h2)


    //const btnIniciar = document.getElementById("botao")
    const cartas = document.querySelectorAll(".cards");
    cartas.forEach(card => card.addEventListener("click", clicarCarta));
    document.getElementById("botao").addEventListener("click", comecarJogo);
    /*btnIniciar.onclick = _ => {
        comecarJogo()
    }

    */

    
    var timer = 0
    var segundos = 0;
    var htmlSegundos = document.getElementById('timer');
    function contagem() {
        segundos += 1;
        htmlSegundos.innerText = "" + segundos + " segundos";
    }

    var melhorTempoLs = document.getElementById('melhortempo')
    function melhorTempo(){
        var compararMelhorTempo = localStorage.segundos
        melhorTempoLs.innerText = "Melhor tempo: " + compararMelhorTempo + " segundos"

    }
    
    melhorTempo()
    
    var carta1
    var carta2
    var travarTab = true;
    var count = 0

    //misturarCartas

    function mostrarCartasBreve(){
        travarTab = true
        /*$(".cards").children(".verso").fadeOut() */
        $(".cards").children(".verso").slideUp()
        setTimeout(() => {
        travarTab = false
        /*$(".cards").children(".verso").fadeIn()*/
        $(".cards").children(".verso").slideDown()
    }, 3000)
    }

    

    function comecarJogo(){
        //add click listener novamente
        count = 0
        segundos = 0
        clearInterval(timer)
        timer = setInterval(contagem, 1000);
        cartas.forEach(card => card.addEventListener("click", clicarCarta));
        $(".cards").css("display", "flex")
        var parent = $("#corpo");
        var divs = parent.children(".cards");
        while (divs.length) {
            parent.append(divs.splice(Math.floor(Math.random() * divs.length), 1)[0]);
        }
        mostrarCartasBreve()
        
    }
    
    function clicarCarta(){
        if (travarTab){
             return 0
        } 
        $(this).children(".verso").fadeOut(); 
        if (!carta1){
            carta1 = this
            return false
        }
        //se nenhum dos ifs, a carta vai ser a de numero 2
        carta2 = this

        if (carta1 == carta2){
            alert('Isso não vale irmão')
            $(this).children(".verso").fadeIn(); 
            carta1 = null
            carta2 = null
            return false
        }
        checarCarta()
        
    }

    function checarCarta() {
        let cartasIguais = carta1.dataset.card === carta2.dataset.card;
      
        if (!cartasIguais){
            desvirarCartas()
        }
        else{
            acertar(cartasIguais) //boolean
        }
        
      }

      function desvirarCartas() {
        travarTab = true;
        //timeout, animacoes dentro
        setTimeout(() => {
          $(carta1).children(".verso").fadeIn()
          $(carta2).children(".verso").fadeIn()
          acertar();
        }, 1500);
      }
      
      function acertar(boolean) {
        if (boolean) {
            alert("Acertou")
            carta1.removeEventListener("click", clicarCarta)
            carta2.removeEventListener("click", clicarCarta) //ou adicionar class ao css e remover evento de click/desaparecer cartas acertadas
            count++
            if (count == 8){
                //localStorage.setItem(`User:${segundos}`, `Segundos:${segundos}`)
                if(localStorage.getItem('segundos') === null){
                    localStorage.setItem('segundos', segundos)
                }
                let compararMelhorTempo = localStorage.segundos
                let tempoAtual = segundos
                if (tempoAtual < compararMelhorTempo){
                    localStorage.setItem('segundos', segundos)
                    melhorTempoLs.innerText = "Melhor tempo: " + segundos + " segundos"
                }

                segundos = 0
                clearInterval(timer)
                alert("Fim do jogo")
                count = 0
                
            }
        }
        
        carta1 = null,
        carta2 = null,
        travarTab = false
      }

     
    
    
})

