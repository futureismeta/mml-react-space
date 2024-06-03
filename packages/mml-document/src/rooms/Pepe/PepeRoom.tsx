import {BuildingFloor} from "./Floor";
import {PepeStuff} from "./PepeStuff";
import {Trees} from "./Trees";
import {GroundFloor} from "./GroundFloor";
import {TwistingWalls} from "./TwistingWalls";
import * as React from "react";

export const PepeRoom = () => {
    return (
        <m-group>
            <m-light
                type="point"
                intensity="50"
                debug="true"
                y={5}
            >

            </m-light>

            <BuildingFloor/>
            <PepeStuff/>
            <Trees/>
            <GroundFloor/>
            <TwistingWalls/>
        </m-group>
    );
}