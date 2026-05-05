# Typing Race Game

## Overview
The Typing Race Game is a browser-based typing challenge inspired by TypeRacer. Players race against the clock and potentially against AI opponents to type a given paragraph as quickly and accurately as possible. The game tracks words per minute (WPM), accuracy, and elapsed time, providing a competitive and fun experience.

## Features
- Pre-game configuration screen with username, difficulty, text length, and options
- Language selector with English and French modes
- Inline typing with real-time visual feedback (correct = green, incorrect = red, current = highlighted)
- Live stats panel displaying WPM, accuracy percentage, timer, and position
- Progress bar for player and animated AI progress bars
- 100 different generated texts for each language, each difficulty, and each text length
- Difficulty levels affecting AI speeds
- Optional AI racers with randomized speeds
- Optional sound effects
- Responsive design for both desktop and mobile devices
- Smooth transitions between screens

## How to Play
1. Open `index.html` in your web browser.
2. Configure your game: enter username, select difficulty, text length, and toggle options.
3. Click "Start Race" to begin.
4. Type directly in the text area; mistakes are highlighted in red, correct in green.
5. Race against AI opponents and aim for the top position.
6. Complete the text to see your final results.

## Configuration Options
- **Username**: Enter your name (defaults to "Player")
- **Language**: English or Français
- **Difficulty**: Easy (slow AI), Medium, Hard (fast AI)
- **Text Length**: Short (1-2 sentences), Medium (3-5 sentences), Long (paragraph)
- **Enable AI Racers**: Toggle to show/hide AI opponents
- **Enable Sound Effects**: Toggle for typing feedback sounds (requires sound files)

## Running the Game Locally
To run the Typing Race Game locally, follow these steps:
1. Clone the repository or download the project files.
2. Open `index.html` in a web browser of your choice.
3. Enjoy the game!

## Code Structure
- `index.html`: Contains the HTML structure with config, game, and results screens.
- `style.css`: Defines the styling and layout for all screens and elements.
- `script.js`: Implements the game logic, configuration, typing handling, stats calculation, and AI simulation.

## Acknowledgments
This project is inspired by typing games and aims to provide an engaging way to improve typing skills. Enjoy racing against yourself or others!