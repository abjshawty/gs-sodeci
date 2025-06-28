import { FastifyPluginCallback, FastifyReply, FastifyRequest } from "fastify";
import { BonMission as Service, Justification as JustificationService, Delegation as DelegationService } from "../services";
const routes: FastifyPluginCallback = (server) => {
    server.route({
        method: "GET",
        url: "/bonmissions",
        handler: async (request: FastifyRequest<{ Params: { page?: number; }; }>, reply: FastifyReply) => {
            const result = await Service.list({ status: "active" }, { page: request.params.page || 1 });
            reply.send({ data: result });
        }
    });
    server.route({
        method: "GET",
        url: "/uo/admin/paginate/:page",
        handler: async (request: FastifyRequest<{ Params: { page: number; }; }>, reply: FastifyReply) => {
            const result = await Service.list({ status: "active" }, { page: request.params.page });
            reply.send({ data: result });
        }
    });
    server.get('/num/:prefix', async (request: FastifyRequest<{ Params: { prefix: string; }; }>, reply: FastifyReply) => {
        try {
            const prefix = request.params.prefix;
            const bonmissions = await Service.create_num(prefix);
            reply.send(bonmissions);
        } catch (error) {
            console.error(error);
            reply.status(500).send({ message: 'Une erreur s\'est produite lors de la generation de numéro de bon de mission.' });
        }
    });

    server.route({
        method: 'GET',
        url: '/justification/parameters',
        handler: async (request: FastifyRequest<{ Params: { page?: number; }; }>, reply: FastifyReply) => {
            const result = await JustificationService.list({ status: "active" }, { page: request.params.page || 1 });
            reply.send({ data: result });
        }
    });
    server.route({
        method: 'GET',
        url: '/justification/delegation',
        handler: async (request: FastifyRequest<{ Params: { page?: number; }; Querystring: { user: string, organisation: string; }; }>, reply: FastifyReply) => {
            const result = await DelegationService.list({}, { page: request.params.page || 1 });
            const record = result.map((item) => {
                return {
                    id: item.id,
                    _id: item.userId,
                    dateDebut: item.dateDebut,
                    dateFin: item.dateFin,
                    delegateTo: item.delegateTo.replace('["', '').replace('"]', ''),
                    userId: item.userId,
                    createdAt: item.createdAt,
                    updatedAt: item.updatedAt
                };
            });
            reply.send({ data: { record } });
        }
    });
    server.route({
        method: 'GET',
        url: '/justification/delegation/users',
        handler: async (request: FastifyRequest<{ Params: { page?: number; }; Querystring: { user: string, organisation: string; }; }>, reply: FastifyReply) => {
            const result = await DelegationService.list({}, { page: request.params.page || 1 });

            reply.send({ data: { record: result } });
        }
    });

    server.route({
        method: 'POST',
        url: '/justification/parameters/save',
        handler: async (request: FastifyRequest<{ Body: { code: string, description: string, delaijours: string, justificateurs: [{ user: string, priority: number, status: string; }]; }; }>, reply: FastifyReply) => {
            // const result = await JustificationService.create({numeroBon:request.body.code,urlPJ:request.body.description,delaijours:request.body.delaijours,justificateurs:request.body.justificateurs});
            // reply.send({ data: result });
            reply.status(501).send({ message: 'Not implemented, need clarification.' });
        }
    });
};
export default routes;