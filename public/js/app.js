import StarterScene from './scenes/StarterScene.js';

const mainGameCanvas = new Phaser.Game({
  width: 780, // Canvas width in pixels
  height: 300, // Canvas height in pixels
  parent: "game", // ID of the DOM element to add the canvas to
  backgroundColor: '#fff', // The background color (blue)
  scene: [StarterScene], // The name of the scene we created
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false
    }
  }, // The physics engine to use
});
