# Chrome Dinosaur Game Clone

## Overview
This project is a clone of the Chrome Dinosaur Game using JavaScript and the HTML. The game features a running dinosaur that must avoid obstacles (cacti and birds) while continuously increasing the score.

## Features
- Animated dinosaur with running, jumping, and crouching actions
- Randomly generated obstacles (cacti and birds)
- Score counter
- Collision detection for game over condition
- Ground rendering for visual realism

## Technologies Used
- JavaScript
- HTML
- CSS 
## How to Run
1. Clone the repository:
   ```sh
   git clone <repository-url>
   ```
2. Open the `index.html` file in a web browser.
3. Press the "Spacebar" to jump and the "Down Arrow" key to crouch.

## Controls
- `Spacebar` - Makes the dinosaur jump
- `Down Arrow` - Makes the dinosaur crouch

## Game Logic
- The dinosaur runs continuously.
- Gravity is applied for realistic jumping physics.
- The game places obstacles at random intervals.
- The game ends if the dinosaur collides with an obstacle.

## Known Issues & Fixes
- Fixed a bug where the dinosaur was not properly colliding with cacti.
- Fixed an issue where multiple dinosaurs appeared on the screen due to improper rendering.
- Resolved a problem where the game screen was blank due to incorrect image loading paths.

## Future Enhancements
- Add sound effects for jumping and collision.
- Implement a high-score system.
- Add a restart button upon game over.
- Improve obstacle variety.

## Author
Developed by [Your Name].

