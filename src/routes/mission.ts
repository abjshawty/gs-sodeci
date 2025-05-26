import { FastifyPluginCallback, FastifyReply, FastifyRequest } from "fastify";
import { BonMission as Service } from "../services";
const routes: FastifyPluginCallback = (server) => {
    server.route({
        method: "GET",
        url: "/bonmissions",
        handler: async (request: FastifyRequest<{ Params: { page?: number; }; }>, reply: FastifyReply) => {
            const result = await Service.list({ status: "active" }, { page: request.params.page || 1 });
            reply.send({ data: result });
        }
    });
};
export default routes;