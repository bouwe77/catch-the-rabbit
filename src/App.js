import { useState } from "react";
import "./styles.css";

const numberOfHoles = 20;

const initialState = {
  rabbit: 0,
  index: 10,
  found: false,
  goLeft: false
};

export default function App() {
  const [rabbit, setRabbit] = useState(initialState.rabbit);
  const [index, setIndex] = useState(initialState.index);
  const [found, setFound] = useState(initialState.found);
  const [goLeft, setGoLeft] = useState(initialState.goLeft);

  const check = () => {
    // Determine new index to check

    //
    //
    // TO DO: The most efficient seems to be to try odd indexes first, and then even indexes (or vice versa, doesn't matter)
    //
    //

    let newIndex;
    let newGoLeft = goLeft;
    if (index === 0) {
      newIndex = 1;
      newGoLeft = false;
    } else if (index === numberOfHoles - 1) {
      newIndex = index - 2;
      newGoLeft = true;
    } else {
      if (goLeft) newIndex = index - 1;
      else newIndex = index + 1;
    }

    // Check index
    if (newIndex === rabbit) {
      setIndex(newIndex);
      setFound(true);
      return;
    }

    // If not correct: Move rabbit
    let newRabbit;
    if (rabbit === 0) newRabbit = 1;
    else if (rabbit === numberOfHoles - 1) newRabbit = numberOfHoles - 2;
    else {
      const canGoLeft = rabbit - 1 !== newIndex;
      const canGoRight = rabbit + 1 !== newIndex;
      if (canGoLeft && !canGoRight) newRabbit = rabbit - 1;
      else if (!canGoLeft && canGoRight) newRabbit = rabbit + 1;
      else if (canGoLeft && canGoRight)
        newRabbit = Math.random() > 0.5 ? rabbit - 1 : rabbit + 1;
    }

    // Update the state
    setIndex(newIndex);
    setRabbit(newRabbit);
    if (newRabbit === newIndex) {
      setFound(true);
    } else {
      setGoLeft(newGoLeft);
    }
  };

  const reset = () => {
    setRabbit(initialState.rabbit);
    setIndex(initialState.index);
    setFound(initialState.found);
    setGoLeft(initialState.goLeft);
  };

  return (
    <div className="App">
      <div>Rabbit: {rabbit}</div>
      {found ? (
        <div>
          <h1>YESSS!!!</h1>
          <button onClick={reset}>reset</button>
        </div>
      ) : null}

      <div style={{ height: "100px", width: "300px", fontSize: "60px" }}>
        {index}
      </div>

      <button
        onClick={check}
        style={{ height: "100px", width: "300px", fontSize: "60px" }}
      >
        Check
      </button>
    </div>
  );
}

/*
<input
        type="number"
        value={index}
        onChange={(event) => setIndex(Number(event.currentTarget.value))}
        style={{ height: "100px", width: "100px", fontSize: "60px" }}
      />
      */
