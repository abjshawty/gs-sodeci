export const search = {
    querystring: {
        type: "object",
        properties: {
            agentId: { type: "string" },
            token: { type: "string" },
        },
        required: [],
    },
};

export const getOrDelete = {
    params: {
        type: "object",
        properties: {
            id: { type: "string" },
        },
        required: ["id"],
    },
};

export const create = {
    body: {
        type: "object",
        properties: {
            agentId: { type: "string" },
            token: { type: "string" },
        },
        required: ["agentId", "token"],
    },
};

export const update = {
    params: {
        type: "object",
        properties: {
            id: { type: "string" },
        },
        required: ["id"],
    },
    body: {
        type: "object",
        properties: {
            agentId: { type: "string" },
            token: { type: "string" },
        },
        required: [],
    },
};