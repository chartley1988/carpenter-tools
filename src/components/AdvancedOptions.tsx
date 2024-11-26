import { Door } from "./../types";
import { calculateHinges } from "./../utilities/calculations";

export function AdvancedOptions({
  door,
  setDoor,
}: {
  door: Door;
  setDoor: React.Dispatch<React.SetStateAction<Door>>;
}) {
  return (
    <>
      <form action="">
        <div className="mt-3 flex flex-row justify-between gap-3">
          <label htmlFor="hinge_center">
            <h4>Center of Hinge</h4>
          </label>
          <input
            type="checkbox"
            defaultChecked={door.centered}
            name="hinge_center"
            id="hinge_center"
            onChange={(e) => {
              e.stopPropagation();
              const hinges = calculateHinges({
                ...door,
                centered: e.target.checked,
              });
              setDoor((prev) => ({
                ...prev,
                centered: e.target.checked,
                hinges: hinges,
              }));
            }}
          />
        </div>

        {/* {Knob Height} */}
        <div className="mt-3 flex flex-row justify-between gap-3">
          <label htmlFor="top_offset" className="col-start-1 w-max">
            Knob Height
          </label>
          <input
            type="number"
            name="knob"
            id="knob"
            min={0}
            max={300}
            defaultValue={door.knob}
            onChange={(e) => {
              e.stopPropagation();
              setDoor((prev) => ({
                ...prev,
                knob: Number(e.target.value),
              }));
            }}
            className="border-black-900 col-start-2 min-w-40 rounded-md border-2 bg-gray-100 pl-3"
          />
        </div>

        {/* Top Hinge Offset */}
        <div className="mt-3 flex flex-row justify-between gap-3">
          <label htmlFor="top_offset" className="col-start-1 w-max">
            Top Hinge Offset
          </label>
          <input
            type="number"
            name="top_offset"
            id="top_offset"
            min={0}
            max={300}
            defaultValue={door.top_offset}
            onChange={(e) => {
              e.stopPropagation();
              const hinges = calculateHinges({
                ...door,
                top_offset: Number(e.target.value),
              });
              setDoor((prev) => ({
                ...prev,
                top_offset: Number(e.target.value),
                hinges: hinges,
              }));
            }}
            className="border-black-900 col-start-2 min-w-40 rounded-md border-2 bg-gray-100 pl-3"
          />
        </div>

        {/* Bottom Hinge Offset */}
        <div className="mt-3 flex flex-row justify-between gap-3">
          <label htmlFor="bottom_offset" className="col-start-1 w-max">
            Bottom Hinge Offset
          </label>
          <input
            type="number"
            name="bottom_offset"
            id="bottom_offset"
            min={0}
            max={300}
            defaultValue={door.bottom_offset}
            onChange={(e) => {
              e.stopPropagation();
              const hinges = calculateHinges({
                ...door,
                bottom_offset: Number(e.target.value),
              });
              setDoor((prev) => ({
                ...prev,
                bottom_offset: Number(e.target.value),
                hinges: hinges,
              }));
            }}
            className="border-black-900 col-start-2 min-w-40 rounded-md border-2 bg-gray-100 pl-3"
          />
        </div>
      </form>
    </>
  );
}
