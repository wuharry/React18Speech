import { useState, useEffect } from "react";

export function App(props) {
  const [count, setCount] = useState(0);
  const handleClick = () => {
    setCount(count + 1);
    console.log("count", count);
  };
  return (
    <div className="App">
      <h1>Hello React.</h1>
      <h2>Start editing to see some magic happen!</h2>
      <button onClick={handleClick}>Count: {count}</button>
    </div>
  );
}
