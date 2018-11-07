class MenuScene extends Phaser.Scene
{
	
	constructor()
	{ super({key:'MenuScene'}); }

	preload()
	{
		this.load.audio('bgMusic', 'Audio/bgMusic.wav');
		this.load.image('startB', 'Images/button.png');
	}

	create()
	{
		let bgMusic = this.sound.add('bgMusic');
		bgMusic.play();

		let startButton = this.add.sprite(300, 150, 'startB').setInteractive();
		startButton.on('pointerup', function(pointer){
			
			bgMusic.stop();
			this.scene.start('Game');
		
		}, this);
	}

}