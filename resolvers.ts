import { Collection, ObjectId } from "mongodb";
import { Vuelos, VuelosModel } from "./types.ts";
import { change } from "./utils.ts";

export const resolvers = {
    Query:{
        getFlights: async(
            _:unknown,
            args: {origen:string,destino:string},
            context: { VuelosCollection: Collection<VuelosModel> }
        ):Promise<Vuelos[]> => {
            const result = await context.VuelosCollection.find(args).toArray()
            const resultFinal = result.map(e => change(e))
            return resultFinal
        },

        getFlight: async(
            _:unknown,
            args: {id:string},
            context: { VuelosCollection: Collection<VuelosModel> }
         ):Promise<Vuelos|null> => {
            const aux = await context.VuelosCollection.findOne({_id:new ObjectId(args.id)})
            if (!aux) return null
            return ({
                id: args.id,
                origen: aux.origen,
                destino: aux.destino,
                fecha: aux.fecha
            })
        } 
    },
    Mutation: {
        addFlight: async(
            _:unknown,
            args:{origen:string,destino:string,fecha:string},
            context: { VuelosCollection: Collection<VuelosModel>}
        ):Promise<Vuelos> => {
            const { insertedId } = await context.VuelosCollection.insertOne({
                origen: args.origen,
                destino: args.destino,
                fecha: args.fecha
            })
            return ({
                id: insertedId.toString(),
                origen: args.origen,
                destino: args.destino,
                fecha: args.fecha
            })
        }
    }
}