export const BuildingFloor = () => {
  return (
    <m-group>
      <m-light
        type="point"
        intensity="500"
        // x="10"
        y="20"
        // z="-10"

        debug="true"
      ></m-light>
      <m-model src="/assets/pepe/building_floors.glb"></m-model>
    </m-group>
  );
};
