import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(5);

  const increment = () => {
    setCount(count + 5);
  };

  return (
    <div>
      <p>{count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
}

export default Counter;