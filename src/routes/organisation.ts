import { FastifyPluginCallback, FastifyReply, FastifyRequest } from "fastify";
import { Organisation as Build } from "@prisma/client";
import { Organisation as Service } from "../services";
import { Organisation as Schema } from "../schemas";
import { isValid } from "../helpers/auth";
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
        method: "POST",
        url: "/save",
        preHandler: isValid,
        schema: Schema.create,
        handler: async (request: FastifyRequest<{ Body: Build; }>, reply: FastifyReply) => {
            console.log(request.user);
            const data = {
                ...request.body,
                userId: (request.user as { data: string; }).data,
            };
            const result = await Service.create(data);
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
        url: "/select",
        handler: async (request: FastifyRequest, reply: FastifyReply) => {
            const result = await Service.list({ status: "active" }, { page: 1 });
            const data = result.map((item) => ({ ...item, _id: item.id }));
            reply.send({ data });
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

    // server.route({
    //     method: "PUT",
    //     url: "/:id",
    //     schema: Schema.update,
    //     handler: async (request: FastifyRequest<{ Params: { id: string; }; Body: Build; }>, reply: FastifyReply) => {
    //         const result = await Service.update(request.params.id, request.body);
    //         reply.send({ data: result });
    //     }
    // });
    server.route({
        method: "PUT",
        url: "/update",
        schema: Schema.updateIncomplete,
        handler: async (request: FastifyRequest<{ Body: Partial<{ _id: string; name: string; slug: string; code: string; status: string; userId: string | null; }>; }>, reply: FastifyReply) => {
            const data = {
                name: request.body.name,
                slug: request.body.slug,
                code: request.body.code,
                status: request.body.status,
                userId: request.body.userId,
            };
            const existing = await Service.getById(request.body._id!);
            if (!existing) {
                return reply.status(404).send({ message: "Not found" });
            }
            const result = await Service.update(existing.id, data);
            const resultData = { ...result, _id: result.id };
            reply.send({ data: resultData });
        }
    });

    server.route({
        method: "DELETE",
        url: "/remove/:id",
        schema: Schema.getOrDelete,
        handler: async (request: FastifyRequest<{ Params: { id: string; }; }>, reply: FastifyReply) => {
            const result = await Service.delete(request.params.id);
            reply.send({ data: result });
        }
    });
};
export default routes;