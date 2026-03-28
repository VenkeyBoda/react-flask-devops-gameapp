import { useState } from "react";

export default function Calculator(){
  const [val,setVal]=useState("");

  return (
    <div className="container">
      <div className="card">
        <div className="title">Calculator</div>

        <input value={val} readOnly />

        <div className="calc-grid">
          {"789/456*123-0.=+".split("").map(b=>(
            <button key={b} onClick={()=>{
              if(b==="="){
                try{ setVal(Function("return "+val)()); }
                catch{ setVal("Error"); }
              } else {
                setVal(val+b);
              }
            }}>{b}</button>
          ))}
        </div>
      </div>
    </div>
  );
}