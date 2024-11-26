import { useState, ChangeEvent } from "react";
import { Door } from "./../types";
import { calculateHinges } from "./../utilities/calculations";

export default function Inputs({
  door,
  setDoor,
}: {
  door: Door;
  setDoor: React.Dispatch<React.SetStateAction<Door>>;
}) {
  return (
    <form action="" className="grid max-w-96 justify-start gap-x-5 gap-y-3">
      <>
        {/* Door Size */}
        <DoorSizeInput door={door} setDoor={setDoor} />

        {/* Hinge Size */}
        <HingeSizeInput door={door} setDoor={setDoor} />

        {/* Hinge Quantity */}
        <HingeQuantityInput door={door} setDoor={setDoor} />
      </>
    </form>
  );
}

function DoorSizeInput({
  door,
  setDoor,
}: {
  door: Door;
  setDoor: React.Dispatch<React.SetStateAction<Door>>;
}) {
  return (
    <>
      {/* Door Size */}
      <label htmlFor="height" className="col-start-1 w-min">
        Height
      </label>
      <input
        type="number"
        name="height"
        id="height"
        min={40}
        max={240}
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
    </>
  );
}

function HingeSizeInput({
  door,
  setDoor,
}: {
  door: Door;
  setDoor: React.Dispatch<React.SetStateAction<Door>>;
}) {
  return (
    <>
      <label htmlFor="hinge" className="col-start-1 w-max">
        Hinge Size
      </label>
      <input
        type="number"
        name="hinge"
        id="hinge"
        min={2}
        max={6}
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
    </>
  );
}

function HingeQuantityInput({
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
    <>
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
  );
}
