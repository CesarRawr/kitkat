export default class StarterScene extends Phaser.Scene {
	constructor() { super('StarterScene') }

	preload() {
 		// Loading player spritesheet
 		this.load.spritesheet('player', 'assets/player/spritesheet_prota.png', { frameWidth: 32, frameHeight: 64 });

 		// Loading tiles
 		this.load.image('tiles', 'assets/tiles/aereos-tileset.png');
 		
 		// Loading stuff to map
 		this.load.image('bed', 'assets/objects/era_arte-midnight-furniture3.png');
 		this.load.image('bookshelf', 'assets/objects/bookshelf2.png');

 		// Loading map
 		this.load.tilemapTiledJSON('cuarto', 'assets/maps/room1.json');
	}

	create() {
		// Creatin map
		this.map = this.make.tilemap({key: 'cuarto'});

		// adding tiles
		this.tileset = this.map.addTilesetImage('aereos-tileset', 'tiles');
		this.beds = this.map.addTilesetImage('era_arte-midnight-furniture3', 'bed');
		this.bookshelf = this.map.addTilesetImage('bookshelf2', 'bookshelf');

		// Adding layers
		this.suelo = this.map.createLayer('suelo', this.tileset, 0, 0);
		this.limites = this.map.createLayer('limites', this.tileset, 0, 0);
		this.camas = this.map.createLayer('camas', this.beds, 0, -160);
		this.librero = this.map.createLayer('librero', this.bookshelf, 0, 0);

		// Adding collides
		this.limites.setCollisionByProperty({collides: true});
		this.camas.setCollisionByProperty({collides: true});
		this.librero.setCollisionByProperty({collides: true});

		this.player = this.physics.add.sprite(100, 192, 'player');
		this.player.setCollideWorldBounds(true);
		this.player.setSize(32, 64);
		this.player.setOffset(0, 16);

		// Collides
		this.physics.add.collider(this.player, this.limites);
		this.physics.add.collider(this.player, this.camas);
		this.physics.add.collider(this.player, this.librero);

		this.anims.create({
			key: 'left',
			frames: this.anims.generateFrameNumbers('player', { start: 6, end: 11 }),
			frameRate: 14,
			repeat: 0
		});

		this.anims.create({
			key: 'right',
			frames: this.anims.generateFrameNumbers('player', { start: 12, end: 17 }),
			frameRate: 14,
			repeat: 0
		});

		this.anims.create({
			key: 'up',
			frames: this.anims.generateFrameNumbers('player', { start: 18, end: 23 }),
			frameRate: 14,
			repeat: 0
		});

		this.anims.create({
			key: 'down',
			frames: this.anims.generateFrameNumbers('player', { start: 0, end: 5 }),
			frameRate: 14,
			repeat: 0
		});

		/*const debugGraphics = this.add.graphics().setAlpha(0.75);
		this.trees.renderDebug(debugGraphics, {
		  tileColor: null, // Color of non-colliding tiles
		  collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
		  faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
		});*/

		this.cursors = this.input.keyboard.createCursorKeys();
	}

	update() {
		// Moving player
		if (this.cursors.left.isDown) {
			this.playerLeft();
		} else if (this.cursors.right.isDown) {
			this.playerRight();
		} else if (this.cursors.up.isDown) {
			this.playerUp();
		} else if (this.cursors.down.isDown) {
			this.playerDown();
		} else {
			this.player.setVelocityX(0);
			this.player.setVelocityY(0);
		}
	}

	playerLeft() {
		this.player.setVelocityX(-140);
		// Animación
		this.player.anims.play('left', true);
	}

	playerRight() {
		this.player.setVelocityX(140);
		this.player.anims.play('right', true);
	}

	playerUp() {
		this.player.setVelocityY(-140);
		this.player.anims.play('up', true);
	}

	playerDown() {
		this.player.setVelocityY(140)
		this.player.anims.play('down', true);
	}
}
