import { useState, useRef, useEffect, ChangeEvent } from "react";
import { Header } from "./components/Header";
import { Door } from "./types";
import { calculateHinges, printMeasurement } from "./utilities/calculations";

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
    <div className="flex w-full flex-col items-center gap-4">
      <Header />
      <Inputs door={door} setDoor={setDoor} />
    </div>
  );
}

function Inputs({
  door,
  setDoor,
}: {
  door: Door;
  setDoor: React.Dispatch<React.SetStateAction<Door>>;
}) {
  const [hingeSelection, setHingeSelection] = useState([false, true, false]);

  function handleRadio(e: ChangeEvent<HTMLInputElement>) {
    e.stopPropagation();
    const hinges = calculateHinges({
      ...door,
      hinge_qty: Number(e.target.value),
    });
    setDoor((prev) => ({
      ...prev,
      hinge_qty: Number(e.target.value),
      hinges: hinges,
    }));
    e.currentTarget.checked = true;
  }

  return (
    <div className="w-full max-w-max">
      <form action="" className="grid max-w-96 justify-start gap-3">
        <>
          {/* Door Size */}
          <label htmlFor="height" className="col-start-1 w-min">
            Height
          </label>
          <input
            type="number"
            name="height"
            id="height"
            min={0}
            defaultValue={door.height}
            onChange={(e) => {
              e.stopPropagation();
              const hinges = calculateHinges({
                ...door,
                height: Number(e.target.value),
              });
              setDoor((prev) => ({
                ...prev,
                height: Number(e.target.value),
                hinges: hinges,
              }));
            }}
            className="border-black-900 col-start-2 min-w-40 rounded-md border-2 bg-gray-100 pl-3"
          />

          {/* Hinge Size */}
          <label htmlFor="hinge" className="col-start-1 w-max">
            Hinge Size
          </label>
          <input
            type="number"
            name="hinge"
            id="hinge"
            min={3}
            max={5}
            defaultValue={door.hinge}
            onChange={(e) => {
              e.stopPropagation();
              const hinges = calculateHinges({
                ...door,
                hinge: Number(e.target.value),
              });
              setDoor((prev) => ({
                ...prev,
                hinge: Number(e.target.value),
                hinges: hinges,
              }));
            }}
            className="border-black-900 col-start-2 min-w-40 rounded-md border-2 bg-gray-100 pl-3"
          />

          {/* Hinge Quantity */}
          <h3 className="col-start-1 w-max">Hinge Quantity</h3>
          <ul className="col-start-2 flex flex-col content-center gap-2 rounded-md border-2 p-2">
            <div className="flex flex-row items-center gap-2">
              <label htmlFor="qty_2">2</label>
              <input
                type="radio"
                id="qty_2"
                name="qty"
                onChange={(e) => {
                  setHingeSelection([true, false, false]);
                  handleRadio(e);
                }}
                checked={hingeSelection[0]}
                value={"2"}
              />
            </div>

            <div className="flex flex-row items-center gap-2">
              <label htmlFor="qty_3">3</label>
              <input
                type="radio"
                id="qty_3"
                name="qty"
                onChange={(e) => {
                  setHingeSelection([false, true, false]);
                  handleRadio(e);
                }}
                checked={hingeSelection[1]}
                value={"3"}
              />
            </div>

            <div className="flex flex-row items-center gap-2">
              <label htmlFor="qty_4">4</label>
              <input
                type="radio"
                id="qty_4"
                onChange={(e) => {
                  setHingeSelection([false, false, true]);
                  handleRadio(e);
                }}
                checked={hingeSelection[2]}
                name="qty"
                value={"4"}
              />
            </div>
          </ul>
        </>
      </form>

      <hr className="mt-3" />

      <ul className="mt-3 flex w-full flex-col gap-1">
        {door.hinges.map((hinge, index) => (
          <li
            key={hinge}
            className="flex w-full flex-row justify-between gap-2"
          >
            <h3 className="block font-bold">{`Hinge ${index + 1}`}</h3>
            <div>{printMeasurement(hinge)}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
