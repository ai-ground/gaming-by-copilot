import React, { useState, useEffect } from "react";

const getInitialSnakeDots = () => {
  return [
    [0, 0],
    [2, 0],
  ];
};

const getDirection = (key) => {
  switch (key) {
    case "ArrowUp":
      return "UP";
    case "ArrowDown":
      return "DOWN";
    case "ArrowLeft":
      return "LEFT";
    case "ArrowRight":
      return "RIGHT";
    default:
      return "";
  }
};

const getRandomCoordinates = () => {
  let min = 1;
  let max = 98;
  let x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  let y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  return [x, y];
};

const SnakeGame = () => {
  const [snakeDots, setSnakeDots] = useState(getInitialSnakeDots());
  const [direction, setDirection] = useState("RIGHT");
  const [food, setFood] = useState(getRandomCoordinates());
  const [score, setScore] = useState(0);

  useEffect(() => {
    const interval = setInterval(moveSnake, 200);
    return () => clearInterval(interval);
  }, [snakeDots]);

  useEffect(() => {
    window.onkeydown = (e) => {
      setDirection(getDirection(e.key));
    };
  }, []);

  const checkCollision = (head) => {
    if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
      return true;
    }
    return false;
  };
  const moveSnake = () => {
    let dots = [...snakeDots];
    let head = dots[dots.length - 1];

    switch (direction) {
      case "RIGHT":
        head = [head[0] + 2, head[1]];
        break;
      case "LEFT":
        head = [head[0] - 2, head[1]];
        break;
      case "DOWN":
        head = [head[0], head[1] + 2];
        break;
      case "UP":
        head = [head[0], head[1] - 2];
        break;
    }

    dots.push(head);
    dots.shift();

    if (checkCollision(head)) {
      alert(`Game Over. Your score is ${score}`);
      setSnakeDots(getInitialSnakeDots());
      setScore(0);
      setDirection("RIGHT");
    }

    if (head[0] === food[0] && head[1] === food[1]) {
      // Check if new head position matches food position
      setFood(getRandomCoordinates()); // Generate new food
      enlargeSnake(); // Enlarge the snake
      dots.push(head);
    } else {
      dots.push(head);
      dots.shift();
    }

    setSnakeDots(dots);
  };

  const enlargeSnake = () => {
    let newSnake = [...snakeDots];
    newSnake.push(newSnake[newSnake.length - 1]); // Duplicate the last dot
    setSnakeDots(newSnake);
    setScore(score + 1); // Increment the score
  };

  return (
    <div>
      <h1>Score: {score}</h1>
      {snakeDots.map((dot, i) => {
        const style = {
          left: `${dot[0]}%`,
          top: `${dot[1]}%`,
        };
        return <div className="snake-dot" key={i} style={style}></div>;
      })}
      <div
        className="snake-food"
        style={{ left: `${food[0]}%`, top: `${food[1]}%` }}
      ></div>
    </div>
  );
};

export default SnakeGame;
