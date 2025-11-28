<h1 align="center">⚓ Battleship</h1>

<div align="center">

A browser-based implementation of the classic strategy board game.
Built from scratch to master **Object-Oriented Programming (OOP)** and **Test-Driven Development (TDD)** in JavaScript.

[**🔴 Live Demo**](https://www.google.com/search?q=%23) | [**📂 Repository**](https://www.google.com/search?q=%23)

<br />

<!-- Tech Stack Badges -->
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)
![Webpack](https://img.shields.io/badge/Webpack-8DD6F9?style=for-the-badge&logo=webpack&logoColor=black)

<br />

<img src="https://github.com/user-attachments/assets/b91b42c2-4af8-47b3-9e9c-4327e8126815" alt="Battleship Gameplay Screenshot" width="800" />

</div>

## 🌟 Features

* **Interactive Fleet Placement:** Players can manually toggle rotation (Horizontal/Vertical) and place their fleet on the grid.

* **Smart(ish) Computer:** Play against an AI that automatically places its own ships and attacks random legal coordinates on your board.

* **Game Loop:** Robust turn-based gameplay that handles hit/miss logic and checks for game-over conditions after every move.

* **Visual Feedback:**

  * 🟦 **Blue:** Your Ships

  * 🟥 **Red:** Successful Hits

  * ⬜ **Gray:** Missed Attacks

* **Responsive Design:** Built with Flexbox and modern CSS resets for a clean UI.

## 🧠 Key Technical Concepts

This project was built primarily to practice software architecture principles:

### 1. Test-Driven Development (TDD)

The core game logic was written using **Jest** before any DOM manipulation code existed.

* **Unit Tests:** Coverage for `Ship`, `Gameboard`, and `Player` classes.

* **Edge Cases:** Tests handle boundary checks (placing a ship off-board) and collision detection (overlapping ships).

### 2. Object-Oriented Programming (OOP)

The game state is managed through distinct classes:

* **`Ship`**: Tracks length, number of hits, and sunk status.

* **`Gameboard`**: Manages the 10x10 grid, ship coordinates, and received attacks.

* **`Player`**: Abstracts the difference between a human move and a computer's random move.

### 3. Separation of Concerns

The application follows a strict separation between Logic and UI:

* **`logic.js`**: Contains pure JavaScript classes. It knows *nothing* about HTML or CSS.

* **`dom.js`**: Handles the DOM rendering and event listeners. It imports the logic modules to drive the UI.

## 🛠️ Project Structure

```text
src/
├── index.js          # Entry point (Webpack)
├── styles.css        # Global variables and grid layout
├── template.html     # HTML Skeleton
└── modules/
    ├── logic.js      # Pure JS Game Logic (Classes)
    ├── dom.js        # DOM Manipulation & Event Listeners
    └── logic.test.js # Jest Unit Tests
```

## 🚀 How to Play

1. **Place Your Fleet:**
   * Click on your board ("You") to position your ships.
   * Use the **Rotate Axis** button to switch between Horizontal and Vertical orientation.
   * *Note: You must place all 5 ships (Carrier, Battleship, Destroyer, Submarine, Patrol Boat) to begin.*

2. **Start Game:**
   * Once setup is complete, click **Start Game**.
   * The Computer will secretly generate its own board layout.

3. **Attack:**
   * Click a square on the **Computer's board** to fire.
   * **Red** = Hit, **Gray** = Miss.
   * The Computer will immediately counter-attack your board.

4. **Victory:**
   * Sink all 5 enemy ships to win!
