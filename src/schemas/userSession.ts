export const search = {
    querystring: {
        type: "object",
        properties: {
            userId: { type: "string" },
            sessionId: { type: "string" },
        },
        required: [],
    },
};

export const getOrDelete = {
    params: {
        type: "object",
        properties: {
            sessionId: { type: "string" },
        },
        required: ["sessionId"],
    },
};

export const create = {
    body: {
        type: "object",
        properties: {
            userId: { type: "string" },
            sessionId: { type: "string" },
        },
        required: ["userId", "sessionId"],
    },
};

export const update = {
    params: {
        type: "object",
        properties: {
            sessionId: { type: "string" },
        },
        required: ["sessionId"],
    },
    body: {
        type: "object",
        properties: {
            userId: { type: "string" },
        },
        required: [],
    },
};