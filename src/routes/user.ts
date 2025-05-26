import { FastifyPluginCallback, FastifyReply, FastifyRequest } from "fastify";
import jwt from '@fastify/jwt';
import { jwtPublic, jwtSecret } from "../helpers/env";
import { User as Build } from "@prisma/client";
import { User as Service } from "../services";
import { User as Schema } from "../schemas";
import organisation from "../services/organisation";
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
        url: "/generate-token",
        // preHandler: console.log,
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
            return reply.status(Q === "wrongkey" ? 400 : 200).send({ data: Q, message: "Token" }); // This is such an extremely unnecessary thing but legacy code isn't your friend
        }
    });

    server.route({
        method: "GET",
        url: "/verify-token",
        handler: async (request: FastifyRequest, reply: FastifyReply) => {
            const user = request.user;
            // let Q = verifyToken(user);
            let Q = "huh ?";
            return reply.status(false ? 400 : 200).send({ data: Q, message: "Verify" });
        }
    });

    server.route({
        method: "POST",
        url: "/login",
        schema: Schema.login,
        handler: async (request: FastifyRequest<{ Body: { email: string; password: string; }; }>, reply: FastifyReply) => {
            console.log(request.body);
            let result = await Service.login(request.body);
            const org = await organisation.getById(result.profile.organisationId);
            result.profile = [{ ...result.profile, _id: result.profile.id, organisation: org }];
            console.log(result);
            result = { ...result, _id: result.id };
            reply.send({
                data: {
                    user: result,
                    accessToken: server.jwt.sign({ data: result.id, reg: new Date() }, { expiresIn: "720m", key: jwtSecret }),
                    refreshToken: server.jwt.sign({ data: result.id, reg: new Date() }, { expiresIn: "720m", key: jwtPublic })
                }
            });
        }
    });

    server.route({
        method: "POST",
        url: "/login-final",
        // schema: Schema.login,
        preHandler: isValid,
        handler: async (request: FastifyRequest<{ Body: { profileId: string; }; }>, reply: FastifyReply) => {
            const profileId = request.body.profileId;
            const userId = (request.user as { data: string; }).data;
            const result = await Service.finishLogin({ profileId, userId });
            reply.send({
                data: {
                    user: result,
                    accessToken: server.jwt.sign({ data: result.id, reg: new Date() }, { expiresIn: "720m", key: jwtSecret }),
                    refreshToken: server.jwt.sign({ data: result.id, reg: new Date() }, { expiresIn: "720m", key: jwtPublic })
                }
            });
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
        url: "/select",
        handler: async (request: FastifyRequest, reply: FastifyReply) => {
            const result = await Service.list({ status: "active" }, { page: 1 });
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