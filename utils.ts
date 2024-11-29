import { Vuelos } from "./types.ts";
import { VuelosModel } from "./types.ts";


export const change = (aux: VuelosModel): Vuelos => {
    return {
        id: aux._id!.toString(),
        origen: aux.origen,
        destino: aux.destino,
        fecha: aux.fecha
      }
}