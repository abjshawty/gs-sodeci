import { FastifyPluginCallback, FastifyReply, FastifyRequest } from "fastify";
import jwt from '@fastify/jwt';
import { jwtPublic, jwtSecret } from "../helpers/env";
import { User as Build, Profil, User } from "@prisma/client";
import { User as Service, Organisation as OrganisationService } from "../services";
import { User as Schema } from "../schemas";
import { isValid } from "../helpers/auth";
const routes: FastifyPluginCallback = (server) => {
    server.route({
        method: "PUT",
        url: "/push-profile",
        handler: async (request: FastifyRequest, reply: FastifyReply) => {
            // TODO: Frontend does not send any kind of meaningfull data
            // await Service.fillProfileId();
            reply.send({ data: "done" });
        }
    });
    server.route({
        method: "POST",
        url: "/save",
        schema: Schema.create,
        handler: async (request: FastifyRequest<{ Body: Build & { profile?: []; }; }>, reply: FastifyReply) => {
            delete request.body.profile;
            const result = await Service.create(request.body);
            reply.send({ data: result });
        }
    });
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
        url: "/select2",
        handler: async (request: FastifyRequest<{ Querystring: { page?: number; pageSize?: number; status?: string; q?: string; }; }>, reply: FastifyReply) => {
            const result = await Service.select(request.query.q || "", request.query.status || "active", { page: request.query.page || 1, take: request.query.pageSize || 10 });
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
            let org = await OrganisationService.getById(result.profile.organisationId);
            org = { ...org, _id: org.id };
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
            // const result = await Service.list({ status: "active" }, { page: 1, include: { profile: true } });
            const result = await Service.specialList1();
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
        url: "/edit-status",
        schema: Schema.statusUpdate,
        handler: async (request: FastifyRequest<{ Body: { email: string; status: string; }; }>, reply: FastifyReply) => {
            const result = await Service.updateByEmail(request.body.email, { status: request.body.status });
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
        method: "GET",
        url: "/selectByOrganisation/:id",
        handler: async (request: FastifyRequest<{ Params: { id: string; }; }>, reply: FastifyReply) => {
            const users = await Service.getAll({ where: { status: "active" }, include: { profile: true } });
            const validators: User[] = [];
            users.forEach(user => { // @ts-ignore
                if (user.profile) { // @ts-ignore
                    let profile: Profil = user.profile;
                    if (profile.organisationId === request.params.id) validators.push(user);
                }
            });
            reply.send({ data: validators });
        }
    });
};
export default routes;