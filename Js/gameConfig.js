var config = {
	type: Phaser.AUTO,
	width: 600,
	height: 300,
	physics:{
		default: 'arcade',
		arcade:{
			debug: false,
			gravity:{
				y:200
			}
		}
	}, 
	scene:[MenuScene, Game, GameOver]
};

var game = new Phaser.Game(config);
var widthSize = this.game.config.width;
var heightSize = this.game.config.height;