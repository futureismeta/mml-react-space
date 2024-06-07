import * as React from "react";

import { BuildingFloor } from "./Floor";
import { GroundFloor } from "./GroundFloor";
import { PepeStuff } from "./PepeStuff";
import { Trees } from "./Trees";
import { TwistingWalls } from "./TwistingWalls";

export const PepeRoom = () => {
  return (
    <m-group>
      <m-light type="point" intensity="50" debug="true" y={5}></m-light>

      <BuildingFloor />
      <PepeStuff />
      <Trees />
      <GroundFloor />
      <TwistingWalls />
    </m-group>
  );
};
