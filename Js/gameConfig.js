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
	scene:[MenuScene, Game]
};

var game = new Phaser.Game(config);

var player;
var ball;
var cursors;
var speed;
var ballGroup;