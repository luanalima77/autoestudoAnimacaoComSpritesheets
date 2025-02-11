const phaserConfig = {
    type: Phaser.AUTO, //Tipo de renderização escolhida automaticamente -> WebGL (mais eficiente) ou Canvas (suportado por mais navegadores).

    parent: "game", //Define em que elemento HTML o conteúdo será inserido (div com id "game").

    width: 1280, //Largura do jogo

    height: 720, //Altura do jogo

    scene:{
        //init: initScene, 
        preload: preloadScene,
        create: createScene,
        //update: updateScene,
    }
};

const game = new Phaser.Game(phaserConfig);
var plane;


//Função para carregar os assets do jogo antes deles aparecerem
function preloadScene(){
    this.load.spritesheet("plane", "assets/plane.png", {frameWidth: 512, frameHeight: 512});
}



//Função para posicionar os elementos do jogo
function createScene(){
    this.anims.create({
        key: "fly",
        frameRate: 7, //Número de frames por segundo
        frames: this.anims.generateFrameNumbers("plane", {start: 3, end: 5}),
        repeat: -1, //Animação roda infinitamente
    })

    this.anims.create({
        key: "explode",
        frameRate: 7,
        frames: this.anims.generateFrameNumbers("plane", {start: 0, end: 2}),
        repeat: 3, //Animação reproduzida duas vezes e depois para
    })


    plane = this.add.sprite(640, 360, "plane"); 
    plane.play("fly"); //Animação "fly"


    //Delimitando 3000 milissegundos (3 segundos) para a execução da animação "explode"

    // OPÇÃO 1:
    // setTimeout(() =>{
        //plane.play("explode")
    //}, 3000);


    //OPÇÃO 2:
    this.time.addEvent({
        delay: 3000,
        callback: () =>{
            plane.play("explode");

            //Quando a animação parar, o avião será destruído (removido do jogo)
            plane.once(Phaser.Animations.Events.SPRITE_ANIMATION_COMPLETE, () =>{
                plane.destroy();
            });
        }
    })
}



//***OUTRAS FUNÇÕES IMPORTANTES***
//Função chamada no início da cena -> configurações iniciais
//function initScene(){}


//Função chamada a cada frame para atualizar os elementos do jogo (colisões, movimentos etc)
//function updateScene(){}