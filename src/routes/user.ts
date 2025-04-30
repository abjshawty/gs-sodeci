import { FastifyPluginCallback, FastifyReply, FastifyRequest } from "fastify";
import jwt from '@fastify/jwt';
import { jwtPublic, jwtSecret } from "../helpers/env";
import { User as Build } from "@prisma/client";
import { User as Service } from "../services";
import { User as Schema } from "../schemas";
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
        url: "/generate-token",
        preHandler: console.log,
        handler: async (request: FastifyRequest, reply: FastifyReply) => {
            const body = request.body;
            const generateToken = (payload: any) => {
                try {
                    let key = jwtPublic;
                    let apikey = payload.apikey;

                    if (key !== apikey) {
                        return "wrongkey";
                    } else {
                        return server.jwt.sign({ data: apikey, reg: new Date() }, { expiresIn: "720m", key: jwtPublic });
                    }
                } catch (error) {
                    return "problem!!!";
                }
            };
            let Q = generateToken(body);
            return reply.status(200).send({ data: Q, message: "Token" }); // This is such an extremely unnecessary thing but legacy code isn't your friend
        }
    });

    server.route({
        method: "POST",
        url: "/login",
        schema: Schema.login,
        handler: async (request: FastifyRequest<{ Body: { email: string; password: string; }; }>, reply: FastifyReply) => {
            const result = await Service.login(request.body);
            reply.send({ data: result });
        }
    });

    server.route({
        method: "GET",
        url: "/clean-users",
        handler: async (request: FastifyRequest, reply: FastifyReply) => {
            const result = await Service.cleanUsers();
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
};
export default routes;