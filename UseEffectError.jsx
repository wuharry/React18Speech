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
      <Child name="John" id={1} />
    </div>
  );
}
function Child({ name, id }) {
  useEffect(() => {
    console.log("Child mounted"); // 只會執行一次
  }, []);

  return <div>Hello {name}</div>;
}

console.log("Hello console");
