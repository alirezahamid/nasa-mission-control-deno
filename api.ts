import { Router } from "https://deno.land/x/oak@v6.5.0/mod.ts";
import * as planets from "./models/planets.ts";
import * as launches from "./models/launches.ts";

const router = new Router();

router.get("/", (ctx) => {
  ctx.response.body = `
    _   _____   _____ ___ 
    / | / /   | / ___//   |
   /  |/ / /| | \__ \/ /| |
  / /|  / ___ |___/ / ___ |
 /_/ |_/_/  |_/____/_/  |_|
             
    Nasa Mission Control
    `;
});

router.get("/planets", (ctx) => {
  ctx.response.body = planets.getAllPlanets();
});

router.get("/launches", (ctx) => {
  ctx.response.body = launches.getAll();
});

router.get("/launches/:id", (ctx) => {
  if (ctx.params?.id) {
    const launchesList = launches.getOne(Number(ctx.params.id));
    if (launchesList) {
      ctx.response.body = launchesList
    } else {
      ctx.throw(400,'Launch with that Id does not exist!')
    }
  }
});

export default router;
