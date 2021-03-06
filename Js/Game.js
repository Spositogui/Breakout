//player
var player;
var cursors;
var speed;

//ball
var ball;
var ballGroup;
var spaceBarBool = false;
var spaceBarB;
var ballVelocity = 150;
var count;
let releaseBall = false;

//bricks
var brickSound;
var bricksGroup;
let timer;
let spawn;
let generate = true;

//HUD
var highSore;
var score;
var scoreTxt;

class Game extends Phaser.Scene
{
	constructor()
	{ super({key: 'Game'});}

	preload()
	{
		//audio
		this.load.audio('hitBrick', 'Audio/hitBricks.wav');
		
		//images
		this.load.image('player', 'Images/paddle.png');
		this.load.image('controller', 'Images/controller.png');
        this.load.image('scoreImg', 'Images/ScoreImg.png');
        this.load.image('brickGameOver', 'Images/brickEnd.png');
		this.load.image('redBrick', 'Images/redBrick.png');
		this.load.image('greenBrick', 'Images/greenBrick.png');
		this.load.image('blueBrick', 'Images/blueBrick.png');
		this.load.image('yellowBrick', 'Images/yellowBrick.png');
		this.load.spritesheet('ballGroup', 'Images/ballGroup.png',{
			frameWidth: 8, 
			frameHeight: 8
		});
	}

	create()
	{

		//jogador
		player = this.physics.add.sprite(300, 270, 'player');
		player.body.setAllowGravity(false);
		player.setCollideWorldBounds(true);
		
		//bricks
		bricksGroup = this.physics.add.group();
		brickSound = this.sound.add('hitBrick');
		generateBricks(bricksGroup, 9, 2);

		let brickGameOver = this.physics.add.sprite(widthSize/2, 
			player.y, 'brickGameOver');
		brickGameOver.body.setAllowGravity(false);
		brickGameOver.body.setImmovable(true);


		//player controllers
		let leftButton = this.add.sprite(150, heightSize-50,'controller').setInteractive();
		let rightButton = this.add.sprite(widthSize-150, heightSize-50, 'controller').setInteractive();
		let canMove = true;

		leftButton.on('pointerdown', function(pointer){
			
			canMove = true;
			if(canMove)
				player.setVelocityX(-speed);

			if(!releaseBall)
			{
				ballGroup.body.velocity.x = -10;
    			ballGroup.body.velocity.y = -ballVelocity;
    			releaseBall = true;
			}
		
		},this);

		rightButton.on('pointerdown', function(pointer){
			
			canMove = true;
			if(canMove)
				player.setVelocityX(speed);
			if(!releaseBall)
			{
				ballGroup.body.velocity.x = -10;
    			ballGroup.body.velocity.y = -ballVelocity;
    			releaseBall = true;
			}

		}, this);

		leftButton.on('pointerup', function(pointer){
			
			canMove = false;
			if(!canMove)
				player.setVelocityX(0);

		},this);

		rightButton.on('pointerup', function(pointer){
			
			canMove = false;
			if(!canMove)
				player.setVelocityX(0);

		},this);

		
		//ball
		ballGroup = this.physics.add.sprite(
			player.body.x, 
			player.y - player.body.height, 'ball1'
		);
		ballGroup.body.setAllowGravity(false);
		ballGroup.setCollideWorldBounds(true);
		ballGroup.setBounce(1, 1);
		ballGroup.body.setSize(8, 8, 0, 0);//tamanho do colider

		//game config
		cursors = this.input.keyboard.createCursorKeys();
		spaceBarB = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
		speed = 200;

		//colision
		this.physics.add.overlap(ballGroup, player, hitPlayer, null, this);
		this.physics.add.overlap(ballGroup, bricksGroup, hitBrick, null, this);
		this.physics.add.overlap(bricksGroup, brickGameOver,  gameOver, null, this);

		//ball anims
		this.anims.create({
        	key: 'zero',
        	frames: this.anims.generateFrameNumbers('ballGroup', {
            	start: 0,
            	end: 0
        	}),
        	frameRate: 10,
        	repeat: -1
   		});
		
		this.anims.create({
        	key: 'um',
        	frames: this.anims.generateFrameNumbers('ballGroup', {
            	start: 1,
            	end: 1
        	}),
        	frameRate: 10,
        	repeat: -1
    	});
		
		this.anims.create({
        	key: 'dois',
        	frames: this.anims.generateFrameNumbers('ballGroup', {
            	start: 2,
            	end: 2
        	}),
        	frameRate: 10,
        	repeat: -1
    	});

		this.anims.create({
       		key: 'tres',
        	frames: this.anims.generateFrameNumbers('ballGroup', {
            	start: 3,
            	end: 3
        	}),
       	 	frameRate: 10,
        	repeat: -1
    	});
		
		this.anims.create({
        	key: 'quatro',
        	frames: this.anims.generateFrameNumbers('ballGroup', {
            	start: 4,
            	end: 4
       		 }),
        	rameRate: 10,
        	repeat: -1
   		});

		count = 0;

		//HUD
		score = 0;
        let highScore = this.add.sprite(50, 280, 'scoreImg');
		scoreTxt = this.add.text(100, 275, "0", {
			fontSize:  "22px", fill: "#fff"
		});

		//time generate bricks
		timer = this.time.addEvent({
	   	  	delay: 3000,  
	   	  	callbackScope: this, 
	   	  	loop: true 
	   	});
	}

	update()
	{

		//ball anims
		if(count == 0)
			 ballGroup.anims.play('zero', true);
		else if(count == 1)
			 ballGroup.anims.play('um', true);
		else if(count == 2)
			 ballGroup.anims.play('dois', true);
		else if(count == 3)
			 ballGroup.anims.play('tres', true);
		else if(count == 4)
			 ballGroup.anims.play('quatro', true);

		//brickts down
		spawn = Math.floor(3000 - timer.getElapsed());  
		if (spawn < 100)
		{
        	if(generate)
        	{
        		bricksGroup.setVelocityY(300);
        		generateBricks(bricksGroup, 9, 1);
        		generate = false;	
        	}
		}
		else if(spawn >= 2700)
		{
			bricksGroup.setVelocityY(0);
			generate = true;
		}
    	  	
    	//limite player Y
    	if(player.y > 270)
    		player.y = 270;

    	//ball chase paddle
    	if(!releaseBall)
    		ballGroup.x = player.x;
    	
    	//game Over
    	if(ballGroup.y > player.y + player.body.height)
        {
    		ballGroup.body.setVelocityY(0);
			ballGroup.body.setVelocityX(0);
			releaseBall = false;
            this.scene.start('GameOver');
        }

	} 

}

function generateBricks(bricksGroup, coluna, linha)
{
	let brick;
	let columns = coluna;
	let rows = linha;
	let xOffSet = 50;//distancia em x
	let yOffSet = 35;//distancia em y

	for(let y = 0; y < rows; y++)
	{
		for(let x = 0; x < columns; x++)
		{
			let chooseBrick = Phaser.Math.Between(1, 4);//color random
			
			if(chooseBrick == 1){
				brick = bricksGroup.create((x+2) * xOffSet, 
				(y+0.5) * yOffSet, 'yellowBrick');	
			}
			else if(chooseBrick == 2){
				brick = bricksGroup.create((x+2) * xOffSet, 
				(y+0.5) * yOffSet, 'greenBrick');	
			}
			else if(chooseBrick == 3){
				brick = bricksGroup.create((x+2) * xOffSet, 
				(y+0.5) * yOffSet, 'blueBrick');
			}
			else{
				brick = bricksGroup.create((x+2) * xOffSet, 
				(y+0.5) * yOffSet, 'redBrick');	
			}
			
			brick.body.setAllowGravity(false);
			//brick.body.setImmovable(true);
		}
		
	}
}

function hitPlayer(ballGroup, player)
{
	let diff = 0;

	//change ball direction
	if(ballGroup.y == player.body.y)//se a bola bater no centro
	{
		ballGroup.body.velocity.y = -ballVelocity;
	}
	if(ballGroup.x < player.x)// se a bola na lateral esquerda
	{
		diff = player.x - ballGroup.x;
		ballGroup.body.velocity.x = (-5 * diff);
		ballGroup.body.velocity.y = -ballVelocity;
	}
	if(ballGroup.x > player.x)// se a bola bater na lateral direita
	{
		diff = ballGroup.x - player.x;
		ballGroup.body.velocity.x = (5 * diff);
		ballGroup.body.velocity.y = -ballVelocity;
	}
}

function hitBrick(ball, bricks)
{
	//audio
	brickSound.play();

	//destroy brick
	bricks.disableBody(true, true);

	//ball animation(color)
	if(count < 5)
		count ++;
	if(count > 4) 
		count = 0;
   
   //change ball direction
    if(ballGroup.body.y > bricks.y)
	   ballGroup.body.velocity.y = ballVelocity;
    else if(ballGroup.body.y < bricks.y)
        ballGroup.body.velocity.y = -ballVelocity;

    //score
    score += 10;
    scoreTxt.setText(score);
}

function gameOver(bricksGroup, brickGameOver)
{
	this.scene.start('GameOver');
}

/*release ball
    	if(spaceBarB.isDown && !spaceBarBool)
    	{
    		spaceBarBool = true;
    		ballGroup.body.velocity.x = -10;
    		ballGroup.body.velocity.y = -ballVelocity;
   }*/