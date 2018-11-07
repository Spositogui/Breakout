class GameOver extends Phaser.Scene
{
	constructor()
	{super ({key: 'GameOver'});}

	preload()
	{
        this.load.image('bkGameOver', 'Images/GameOverScene.png');
        this.load.image('backArrow', 'Images/backArrow.png');
	}

	create()
	{   
        //Imagem Background do credits
	   	let bg = this.add.sprite(300, 150, 'bkGameOver');
	   	bg.displayWidth = 600;
	   	bg.displayHeight = 300;
        
        //Criando Botao de retorno para menu
        let  retornoB = this.add.sprite(550, 240, 'backArrow').setInteractive();
        
        //ativando imagens para funfar como botoes 
        retornoB.on('pointerup', function(pointer){
            this.scene.start('MenuScene');
        }, this);
	}
}