import { printMeasurement } from "./../utilities/calculations";
import { Door } from "./../types";

export default function Outputs({ door }: { door: Door }) {
  return (
    <>
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
    </>
  );
}
