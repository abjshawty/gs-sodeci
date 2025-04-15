export const search = {
    querystring: {
        type: "object",
        properties: {
            numeroBon: { type: "string" },
            motif: { type: "string" },
            serviceEmetteur: { type: "string" },
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
            numeroBon: { type: "string" },
            motif: { type: "string" },
            serviceEmetteur: { type: "string" },
            status: { type: "string" },
        },
        required: ["numeroBon", "motif", "serviceEmetteur", "status"],
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
            numeroBon: { type: "string" },
            motif: { type: "string" },
            serviceEmetteur: { type: "string" },
            status: { type: "string" },
        },
        required: [],
    },
};