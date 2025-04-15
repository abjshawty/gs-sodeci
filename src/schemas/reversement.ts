export const search = {
    querystring: {
        type: "object",
        properties: {
            agentId: { type: "string" },
            montant: { type: "number" },
            status: { type: "string" },
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
            montant: { type: "number" },
            status: { type: "string" },
        },
        required: ["agentId", "montant", "status"],
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
            montant: { type: "number" },
            status: { type: "string" },
        },
        required: [],
    },
};