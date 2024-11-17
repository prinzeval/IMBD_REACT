import { useState } from 'react';
import './App.css';




const App = () => {
  const  [counter,setCounter] = useState(0);
  return (
    <div className="APP">
      <button onClick={()=>setCounter((prevCount)=>prevCount -1)}>-</button>
      <h1>{counter}</h1>
      <button onClick={()=>setCounter((newCount)=>newCount + 1)}>+</button>
      
      
    </div>
  );
}
export default App;
