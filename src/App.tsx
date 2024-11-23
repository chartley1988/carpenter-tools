/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { Door } from "./types";
import { calculateHinges } from "./utilities/calculations";
import Inputs from "./components/Inputs";
import Outputs from "./components/Output";

function App() {
  const [door, setDoor] = useState<Door>({
    height: 80,
    hinge: 3.5,
    top_offset: 7.125,
    bottom_offset: 7.125,
    hinges: [],
    hinge_qty: 3,
  });

  useEffect(() => {
    const initial = calculateHinges(door);
    setDoor({ ...door, hinges: initial });
  }, []);

  return (
    <div className="flex w-full flex-col items-center">
      <div className="flex w-full max-w-max flex-col gap-5">
        <Header />
        <Inputs door={door} setDoor={setDoor} />
        <hr className="mt-3" />
        <Outputs door={door} />
      </div>
    </div>
  );
}

export default App;
