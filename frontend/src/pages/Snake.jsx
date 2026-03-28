import { useEffect, useState } from "react";

export default function Snake(){
  const [score,setScore]=useState(0);

  useEffect(()=>{
    const canvas=document.getElementById("game");
    const ctx=canvas.getContext("2d");

    let snake=[{x:10,y:10}], dx=1, dy=0;
    let food={x:5,y:5};

    function draw(){
      ctx.clearRect(0,0,400,400);

      let head={x:snake[0].x+dx,y:snake[0].y+dy};

      // collision
      if(head.x<0||head.y<0||head.x>=20||head.y>=20){
        alert("Game Over. Score: "+score);
        snake=[{x:10,y:10}];
        setScore(0);
      }

      snake.unshift(head);

      if(head.x===food.x && head.y===food.y){
        setScore(s=>s+1);
        food={x:Math.random()*20|0,y:Math.random()*20|0};
      } else {
        snake.pop();
      }

      ctx.fillStyle="red";
      ctx.fillRect(food.x*20,food.y*20,20,20);

      ctx.fillStyle="green";
      snake.forEach(s=>ctx.fillRect(s.x*20,s.y*20,20,20));
    }

    const interval=setInterval(draw,120);

    document.onkeydown=e=>{
      if(e.key==="ArrowUp"){dx=0;dy=-1}
      if(e.key==="ArrowDown"){dx=0;dy=1}
      if(e.key==="ArrowLeft"){dx=-1;dy=0}
      if(e.key==="ArrowRight"){dx=1;dy=0}
    };

    return ()=>clearInterval(interval);
  },[score]);

  return (
    <div className="container">
      <div className="card">
        <h2>🐍 Snake Game</h2>
        <p>Score: {score}</p>
        <canvas id="game" width="400" height="400"></canvas>
      </div>
    </div>
  );
}