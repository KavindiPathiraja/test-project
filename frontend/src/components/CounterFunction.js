import React, { useState } from "react";

function CounterFunction(){

    let [Number,setNumber] = useState(0) 
    
    function increment(){
        setNumber(++Number)
    }

    return(
        <div>
            <h3>Functional component</h3>
            <h1>Counter = {Number}</h1>
            <button onClick={e => increment()}>Increment</button>
        </div>
    )
}

export default CounterFunction;