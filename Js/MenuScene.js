class MenuScene extends Phaser.Scene
{
	
	constructor()
	{ super({key:'MenuScene'}); }

	preload()
	{
		this.load.image('startB', 'Images/button.png');
	}

	create()
	{
		let startButton = this.add.sprite(300, 150, 'startB').setInteractive();
		startButton.on('pointerup', function(pointer){
			
			this.scene.start('Game');
		
		}, this);
	}

}