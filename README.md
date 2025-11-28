# Battleship

A browser-based implementation of the classic Battleship board game. This project is made to learn Object-Oriented Programming (OOP) in JavaScript, Test-Driven Development (TDD) using Jest, and organizing clean separation of concerns (between game logic and the DOM).

<img width="1903" height="855" alt="image" src="https://github.com/user-attachments/assets/b91b42c2-4af8-47b3-9e9c-4327e8126815" />

## 🌟 Features

* **Interactive Ship Placement:** Players can manually place their fleet on the grid before the match starts.
* **Axis Rotation:** Toggle between Horizontal and Vertical ship placement.
* **Computer Opponent:** Play against a computer that automatically places its ships and attacks random coordinates on your board.
* **Game Loop:** Robust turn-based gameplay where the player and computer exchange attacks until a fleet is sunk.
* **Visual Feedback:**
    * **Blue:** Your ships.
    * **Red:** Successful hits.
    * **Gray:** Missed attacks.
* **Modern CSS:** Utilizes Flexbox and modern CSS resets for a responsive layout.

## 🛠️ Technologies Used

* **Languages:** JavaScript (ES6+), HTML5, CSS3.
* **Architecture:** Separation of concerns using ES Modules:
    * `logic.js`: Pure game logic (Ship, Gameboard, Player classes).
    * `dom.js`: DOM manipulation and Event Listeners.
* **Testing:** [Jest](https://jestjs.io/) for unit testing game logic.
* **Bundling:** Webpack.

## 🚀 How to Play

1.  **Place Your Fleet:**
    * Click on your board ("You") to place your ships.
    * Use the **Horizontal/Vertical** button to change the orientation of the ship before placing it.
    * You must place all 5 ships (Carrier, Battleship, Destroyer, Submarine, Patrol Boat) to proceed.
2.  **Start Game:**
    * Once all ships are placed, click the **Start Game** button.
    * The Computer will automatically generate its board.
3.  **Attack:**
    * Click on the **Computer's board** to fire a shot.
    * If you hit a ship, the square turns **Red**.
    * If you miss, the square turns **Gray**.
    * The Computer will immediately fire back at your board after your turn.
4.  **Victory:**
    * The game ends when either the Player or the Computer sinks all of the opponent's ships. An alert will announce the winner.

## 📂 Project Structure

```text
src/
├── index.js          # Entry point, imports styles and starts the game
├── styles.css        # Global styles and gameboard layout
├── template.html     # HTML Skeleton
└── modules/
    ├── logic.js      # Classes: Ship, Gameboard, Player
    ├── dom.js        # UI Logic: Rendering boards, handling clicks
    └── logic.test.js # Unit tests for game logic
```

## 🧪 Testing

This project uses **Jest** to ensure the game logic is robust. The tests cover:
* Ship hit registration and sinking status.
* Gameboard placement validation (boundary checks, overlap checks).
* Attack reception logic.
