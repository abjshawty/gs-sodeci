import { FastifyPluginCallback, FastifyReply, FastifyRequest } from "fastify";
import { SchemaComptable as Build } from "@prisma/client";
import { SchemaComptable as Service } from "../services";
import { SchemaComptable as Schema } from "../schemas";
const routes: FastifyPluginCallback = (server) => {
    server.route({
        method: "POST",
        url: "/",
        schema: Schema.create,
        handler: async (request: FastifyRequest<{ Body: Build; }>, reply: FastifyReply) => {
            const result = await Service.create(request.body);
            reply.send({ data: result });
        }
    });

    server.route({
        method: "GET",
        url: "/search",
        schema: Schema.search,
        handler: async (request: FastifyRequest<{ Querystring: { name: string; }; }>, reply: FastifyReply) => {
            const result = await Service.search(request.query);
            reply.send({ data: result });
        }
    });

    server.route({
        method: "GET",
        url: "/:id",
        schema: Schema.getOrDelete,
        handler: async (request: FastifyRequest<{ Params: { id: string; }; }>, reply: FastifyReply) => {
            const result = await Service.getById(request.params.id);
            reply.send({ data: result });
        }
    });

    server.route({
        method: "GET",
        url: "/",
        handler: async (request: FastifyRequest, reply: FastifyReply) => {
            const result = await Service.getAll();
            reply.send({ data: result });
        }
    });

    server.route({
        method: "PUT",
        url: "/:id",
        schema: Schema.update,
        handler: async (request: FastifyRequest<{ Params: { id: string; }; Body: Build; }>, reply: FastifyReply) => {
            const result = await Service.update(request.params.id, request.body);
            reply.send({ data: result });
        }
    });

    server.route({
        method: "DELETE",
        url: "/:id",
        schema: Schema.getOrDelete,
        handler: async (request: FastifyRequest<{ Params: { id: string; }; }>, reply: FastifyReply) => {
            const result = await Service.delete(request.params.id);
            reply.send({ data: result });
        }
    });

    server.route({
        method: "POST",
        url: "/save",
        schema: Schema.create,
        handler: async (request: FastifyRequest<{ Body: Build; }>, reply: FastifyReply) => {
            const body = {
                ...request.body,
                status: "active",
                userId: (request.user as { id: string; })?.id || "default"
            };
            const result = await Service.create(request.body);
            reply.send({ data: result });
        }
    });

    server.route({
        method: "GET",
        url: "/paginate/:page",
        schema: Schema.paginate,
        handler: async (request: FastifyRequest<{ Querystring: { name: string; }; Params: { page: number; }; }>, reply: FastifyReply) => {
            const result = await Service.search(request.query, { page: request.params.page });
            reply.send({ data: result });
        }
    });

    server.route({
        method: "PUT",
        url: "/update/:id",
        schema: Schema.update,
        handler: async (request: FastifyRequest<{ Params: { id: string; }; Body: { numCompte: string; libCompte: string; }; }>, reply: FastifyReply) => {
            const body: Partial<Build> = {
                libelle: request.body.libCompte,
            };
            const result = await Service.update(request.params.id, body);
            reply.send({ data: result });
        }
    });
};
export default routes;