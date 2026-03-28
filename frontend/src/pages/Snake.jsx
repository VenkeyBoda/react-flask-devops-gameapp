import { useEffect, useRef, useState } from "react";

export default function Snake(){
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let snake = [{x:10,y:10}];
    let food = {x:5,y:5};
    let dx = 1, dy = 0;

    const move = (e)=>{
      if(e.key==="ArrowUp"){dx=0;dy=-1}
      if(e.key==="ArrowDown"){dx=0;dy=1}
      if(e.key==="ArrowLeft"){dx=-1;dy=0}
      if(e.key==="ArrowRight"){dx=1;dy=0}
    };

    document.addEventListener("keydown", move);

    const game = setInterval(()=>{
      ctx.clearRect(0,0,400,400);

      let head = {x:snake[0].x+dx, y:snake[0].y+dy};

      // collision
      if(head.x<0 || head.y<0 || head.x>=20 || head.y>=20){
        alert("Game Over");
        snake=[{x:10,y:10}];
        setScore(0);
        return;
      }

      snake.unshift(head);

      if(head.x===food.x && head.y===food.y){
        setScore(s=>s+1);
        food={x:Math.floor(Math.random()*20), y:Math.floor(Math.random()*20)};
      } else {
        snake.pop();
      }

      ctx.fillRect(food.x*20, food.y*20, 20, 20);
      snake.forEach(s=>ctx.fillRect(s.x*20, s.y*20, 20, 20));

    },120);

    return ()=>{
      clearInterval(game);
      document.removeEventListener("keydown", move);
    };
  }, []);

  return (
    <div className="card center">
      <h2>Snake Game</h2>
      <p>Score: {score}</p>
      <canvas ref={canvasRef} width="400" height="400"></canvas>
    </div>
  );
}