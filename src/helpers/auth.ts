import {
    FastifyRequest,
    FastifyReply
} from "fastify";

export const isValid = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const token = request.headers.authorization?.split(" ")[1] || null;
        //@ts-ignore
        await request.jwtVerify();
    } catch (e: any) {
        reply.status(401);
        reply.send({
            message: "Unauthorized: authentification réquise, checkauth",
        });
    }
};
