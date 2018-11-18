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

		 //resize
        window.addEventListener('resize', resize);
        resize();
	}

}

function resize()
{
    var canvas = this.game.canvas, width = window.innerWidth, height = window.innerHeight;
    var wratio = width / height, ratio = canvas.width / canvas.height;

    if (wratio < ratio) {
        canvas.style.width = width + "px";
        canvas.style.height = (width / ratio) + "px";
    } else {
        canvas.style.width = (height * ratio) + "px";
        canvas.style.height = height + "px";
    }
}