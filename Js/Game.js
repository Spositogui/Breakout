var spaceBarBool = false;
var spaceBarB;
var ballVelocity = 150;
var bricksGroup;

class Game extends Phaser.Scene
{
	constructor()
	{ super({key: 'Game'});}

	preload()
	{
		this.load.image('player', 'Images/paddle.png');
		this.load.image('redBrick', 'Images/redBrick.png');
		this.load.image('greenBrick', 'Images/greenBrick.png');
		this.load.image('blueBrick', 'Images/blueBrick.png');
		this.load.image('yellowBrick', 'Images/yellowBrick.png');
		this.load.spritesheet('ball1', 'Images/ball1.png',{
			frameWidth: 10, 
			frameHeight: 8
		});
	}

	create()
	{
		
		bricksGroup = this.physics.add.group();
		generateBricks(bricksGroup);

		player = this.physics.add.sprite(300, 270, 'player');
		player.body.setAllowGravity(false);
		player.setCollideWorldBounds(true);

		
		ballGroup = this.physics.add.sprite(player.body.x, 
			player.y - player.body.height, 'ball1');
		ballGroup.body.setAllowGravity(false);
		ballGroup.setCollideWorldBounds(true);
		ballGroup.setBounce(1, 1);

		cursors = this.input.keyboard.createCursorKeys();
		spaceBarB = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
		speed = 200;

		//colision
		this.physics.add.overlap(player, ballGroup, hitPlayer, null, this);
		this.physics.add.overlap(ballGroup, bricksGroup, hitBrick, null, this);

	}

	update()
	{
		//player moves
		if (cursors.left.isDown)
        	player.setVelocityX(-speed);
    	else if (cursors.right.isDown)
        	player.setVelocityX(speed);
    	else
    		player.setVelocityX(0);
    	
    	//limite player Y
    	if(player.y > 270)
    		player.y = 270;

    	//ball chase paddle
    	if(!spaceBarBool)
    		ballGroup.x = player.x;

    	if(spaceBarB.isDown && !spaceBarBool)
    	{
    		spaceBarBool = true;
    		ballGroup.body.velocity.x = -10;
    		ballGroup.body.velocity.y = -ballVelocity;
    	}


	}

}

function generateBricks(bricksGroup)
{
	let brick;
	let columns = 10;
	let rows = 4;
	let xOffSet = 50;
	let yOffSet = 35;

	for(let y = 0; y < rows; y++)
	{
		for(let x = 0; x < columns; x++)
		{
			let chooseBrick = Phaser.Math.Between(1, 4);
			
			if(chooseBrick == 1){
				brick = bricksGroup.create(x * xOffSet, y * yOffSet, 'yellowBrick');	
			}
			else if(chooseBrick == 2){
				brick = bricksGroup.create(x * xOffSet, y * yOffSet, 'greenBrick');	
			}
			else if(chooseBrick == 3){
				brick = bricksGroup.create(x * xOffSet, y * yOffSet, 'blueBrick');
			}
			else{
				brick = bricksGroup.create(x * xOffSet, y * yOffSet, 'redBrick');	
			}
			
			brick.body.setAllowGravity(false);
			brick.body.setImmovable(true);
		}
		
	}
}

function hitPlayer(player, ballGroup)
{
	console.log("colisao");
	let diff = 0;


	if(ballGroup.body.y == player.body.y)
	{
		ballGroup.body.velocity.y = -ballVelocity;
	}
	if(ballGroup.x < player.x)
	{
		diff = player.x - ballGroup.x;
		ballGroup.body.velocity.x = (-5 * diff);
		ballGroup.body.velocity.y = -ballVelocity;
	}
	if(ballGroup.x > player.x)
	{
		diff = ballGroup.x - player.x;
		ballGroup.body.velocity.x = (5 * diff);
		ballGroup.body.velocity.y = -ballVelocity;
	}
}

function hitBrick(ball, bricks)
{
	bricks.disableBody(true, true);
	ballGroup.body.velocity.y = -1* ballVelocity;
}
