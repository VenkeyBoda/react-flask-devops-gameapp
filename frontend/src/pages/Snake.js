import { useEffect } from "react";

export default function Snake(){
  useEffect(()=>{
    const canvas=document.getElementById("game");
    const ctx=canvas.getContext("2d");

    let snake=[{x:10,y:10}], dx=1, dy=0;

    setInterval(()=>{
      ctx.clearRect(0,0,400,400);
      snake.unshift({x:snake[0].x+dx,y:snake[0].y+dy});
      snake.pop();
      snake.forEach(s=>ctx.fillRect(s.x*20,s.y*20,20,20));
    },150);

    document.onkeydown=e=>{
      if(e.key==="ArrowUp"){dx=0;dy=-1}
      if(e.key==="ArrowDown"){dx=0;dy=1}
      if(e.key==="ArrowLeft"){dx=-1;dy=0}
      if(e.key==="ArrowRight"){dx=1;dy=0}
    };
  },[]);

  return <canvas id="game" width="400" height="400"></canvas>;
}