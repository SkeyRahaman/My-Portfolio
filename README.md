# Flask Web Application

This repository contains a Flask web application that serves as a portfolio and provides various features including a Sudoku solver, a Tic-Tac-Toe game, and a feature to send anonymous messages to you.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Routes](#routes)
- [Configuration](#configuration)
- [License](#license)

## Features

- Home, About, and Resume pages
- Blog section
- Projects section
- Tic-Tac-Toe game
- Sudoku solver with manual and automatic solving options
- **Send anonymous messages** to you using the `/send_message/<message>` route

## Getting Started

To get started with the project, follow the instructions below:

1. **Clone the repository:**

    ```bash
    git clone <repository-url>
    ```

2. **Navigate to the project directory:**

    ```bash
    cd <project-directory>
    ```

3. **Create a virtual environment (optional but recommended):**

    ```bash
    python -m venv venv
    source venv/bin/activate
    ```

4. **Install the required dependencies:**

    ```bash
    pip install -r requirements.txt
    ```

5. **Configure the application:** Create a `config.py` file in the project root directory and set the necessary configurations such as `SECRET_KEY` and other variables.

6. **Run the application:**

    ```bash
    python app.py
    ```

## Usage

After running the application, you can access the different routes and features provided by the web application in your browser.

## Routes

The application provides the following routes:

- `/`: Home page.
- `/about`: About page with blogs and experience information.
- `/resume`: Resume page.
- `/projects`: Projects page.
- `/blog`: Blog page displaying all blogs.
- `/send_message/<message>`: Route that allows visitors to send anonymous messages to you. The route accepts a `message` parameter in the URL, which is the message the visitor wants to send. The message is then processed by the application.
- `/tic_tac_toe`: Play Tic-Tac-Toe game.
- `/sudoku/solve_manual`: Sudoku solver with manual input.
- `/sudoku`: Sudoku solver with automatic solving.

## Configuration

The application requires some configuration settings. Create a `config.py` file in the root directory with refrence from sample_config.py

