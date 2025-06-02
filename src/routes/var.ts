/**
 * @file        var.ts
 * @author      Othniel Kouadio-Bhegnin
 * @version     1.0
 * @date        2025-05-30
 * @description First things first, this file shouldn't even exist. Blame it on the legacy frontend code. Braindead routing if i ever seen it.
 * Each route in this shithole should just have been in referenceData, but for some reason, they felt like separating it from the rest.
 * And it even uses its own search function, which is just a stinking pile of spaghettified shit🥰.
 * Is this supposed to be paginated? What the fuck do you send in q? this could have just been a proper attribute query, but nah.
 * Had to make the vaguest query string of all times.
 */

import { FastifyPluginCallback, FastifyReply, FastifyRequest } from "fastify";
import * as Service from "../services";
import * as Build from "@prisma/client";

const routes: FastifyPluginCallback = (server) => {
    server.route({
        method: "GET",
        url: "/:type/select",
        handler: async (request: FastifyRequest<{ Params: { type: string; }; Querystring: { page?: number; pageSize?: number; status?: string; q?: string; }; }>, reply: FastifyReply) => {
            let result: any = {};
            let status: number = 200;
            let searchStatus = request.query.status || "active";
            let query = request.query.q || "";
            let options = {
                page: request.query.page || 1,
                take: request.query.pageSize || 10,

            };
            switch (request.params.type) {
                case "user":
                    result = await Service.User.search({ status: searchStatus, q: query }, options, false);
                    break;
                default:
                    status = 404;
                    break;
            }
            reply.status(status).send({ data: result });
        }
    });
};
