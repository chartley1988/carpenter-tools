import { Door } from "../types";

export function calculateHinges(door: Door) {
  const spacing = calculateSpacing(door);
  const hinges = calculateHingeMeasurements(door, spacing);
  return hinges;
}

function calculateSpacing(door: Door): number {
  const spacing =
    (door.height -
      door.hinge * door.hinge_qty -
      (door.bottom_offset + door.top_offset)) /
    (door.hinge_qty - 1);
  const rounded = convertToSixteenth(spacing);
  return rounded;
}

function convertToSixteenth(number: number) {
  let mod = number % Math.floor(number);
  mod = Math.round(mod * 16);
  return Math.floor(number) + mod / 16;
}

export function printMeasurement(number: number) {
  const sixteenth = convertToSixteenth(number);
  const fraction = sixteenth - Math.floor(number);
  const result = (decimal: number) => {
    switch (Math.round(decimal)) {
      case 16:
        return "";
      case 15:
        return " - 15/16";
      case 14:
        return " - 7/8";
      case 13:
        return " - 13/16";
      case 12:
        return " - 3/4";
      case 11:
        return " - 11/16";
      case 10:
        return " - 5/8";
      case 9:
        return " - 9/16";
      case 8:
        return " - 1/2";
      case 7:
        return " - 7/16";
      case 6:
        return " - 3/8";
      case 5:
        return " - 5/16";
      case 4:
        return " - 1/4";
      case 3:
        return " - 3/16";
      case 2:
        return " - 1/8";
      case 1:
        return " - 1/16";
      case 0:
        return "";

        break;

      default:
        break;
    }
  };
  return `${Math.floor(number)}${result(fraction * 16)}"`;
}

function calculateHingeMeasurements(door: Door, spacing: number): number[] {
  const hinges = [];
  for (let i = 0; i < door.hinge_qty; i++) {
    hinges.push(calculateHinge(door, i, spacing));
  }
  return hinges;
}

function calculateHinge(door: Door, hinge_number: number, spacing: number) {
  if (door.centered === true) {
    return (
      door.top_offset + hinge_number * (door.hinge + spacing) + door.hinge / 2
    );
  } else {
    return door.top_offset + hinge_number * (door.hinge + spacing);
  }
}

export function calculateKnobHeight(door: Door) {
  return door.height - door.knob;
}
