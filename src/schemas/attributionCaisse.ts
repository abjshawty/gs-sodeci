export const search = {
    querystring: {
        type: "object",
        properties: {
            caisseId: { type: "string" },
            attributionId: { type: "string" },
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
            caisseId: { type: "string" },
            attributionId: { type: "string" },
        },
        required: ["caisseId", "attributionId"],
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
            caisseId: { type: "string" },
            attributionId: { type: "string" },
        },
        required: [],
    },
};