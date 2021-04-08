import { join, log, BufReader, parse, _ } from "../deps.ts";

interface Planet {
  [key: string]: string;
}

let planets: Array<Planet>;

export const filterHabitablePlanets = (planets: Array<Planet>) => {
  return planets.filter((planet) => {
    const planetaryRadius = Number(planet["koi_prad"]);
    const stellarMass = Number(planet["koi_smass"]);
    const stellarRadius = Number(planet["koi_srad"]);

    return planet["koi_disposition"] == "CONFIRMED" && planetaryRadius > 0.5 &&
      planetaryRadius < 1.5 && stellarMass > 0.78 && stellarMass < 1.04 &&
      stellarRadius > 0.99 && stellarRadius < 1.01;
  });
};

async function loadPlanetsData() {
  const path = join("data", "kepler-exoplanets-nasa.csv");

  const file = await Deno.open(path);
  const bufReader = new BufReader(file);
  const result = await parse(bufReader, {
    skipFirstRow: true,
    comment: "#",
  });
  Deno.close(file.rid);

  const planets = filterHabitablePlanets(result as Array<Planet>);

  return planets.map((planet) => {
    return _.pick(planet, [
      "koi_prad",
      "koi_smass",
      "koi_srad",
      "kepler_name",
      "koi_count",
      "koi_steff",
    ]);
  });
}
planets = await loadPlanetsData();
log.info(`${planets.length} habitable planets found!`);

export const getAllPlanets = () => {
  return planets;
};
