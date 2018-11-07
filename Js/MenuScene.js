class MenuScene extends Phaser.Scene
{
	
	constructor()
	{ super({key:'MenuScene'}); }

	preload()
	{
		this.load.audio('bgMusic', 'Audio/bgMusic.wav');
		this.load.image('TitleMenu', 'Images/TitleMenu.png');
	}

	create()
	{
		let bgMusic = this.sound.add('bgMusic');
		bgMusic.play();

		let TitleMenu = this.add.sprite(300, 150, 'TitleMenu').setInteractive();
		TitleMenu.on('pointerup', function(pointer){
			
			bgMusic.stop();
			this.scene.start('Game');
		
		}, this);
	}

}