/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, PropsWithChildren } from "react";
import { Header } from "./components/Header";
import { Door } from "./types";
import { calculateHinges } from "./utilities/calculations";
import Inputs from "./components/Inputs";
import Outputs from "./components/Output";
import { AdvancedOptions } from "./components/AdvancedOptions";

function App() {
  const [door, setDoor] = useState<Door>({
    height: 80,
    hinge: 3.5,
    top_offset: 7.125,
    bottom_offset: 7.125,
    hinges: [],
    hinge_qty: 3,
    centered: false,
    knob: 36,
  });

  useEffect(() => {
    const initial = calculateHinges(door);
    setDoor({ ...door, hinges: initial });
  }, []);

  return (
    <div className="flex w-full flex-col items-center">
      <div className="flex w-full max-w-max flex-col gap-5">
        <Header />
        <SubHeading>Door Options</SubHeading>
        <Inputs door={door} setDoor={setDoor} />
        <details>
          <summary>
            <SubHeading>Advanced Options</SubHeading>
          </summary>
          <AdvancedOptions door={door} setDoor={setDoor} />
        </details>
        <hr className="mt-3" />
        <SubHeading>Results</SubHeading>
        <Outputs door={door} />
      </div>
    </div>
  );
}

function SubHeading({ children }: PropsWithChildren) {
  return <h2 className="inline text-lg font-bold">{children}</h2>;
}

export default App;
