import { useState } from "react";

export default function Calculator(){
  const [val,setVal]=useState("");

  return (
    <div className="card center">
      <input value={val} readOnly />

      <div className="grid">
        {"123+456-789*0=/".split("").map(b=>(
          <button key={b} onClick={()=>{
            if(b==="="){
              setVal(Function("return "+val)());
            } else {
              setVal(val+b);
            }
          }}>{b}</button>
        ))}
      </div>
    </div>
  );
}