export const search = {
    querystring: {
        type: "object",
        properties: {
            caisseId: { type: "string" },
            userId: { type: "string" },
            beneficiaireId: { type: "string" },
            numeroBon: { type: "string" },
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
            caisseId: { type: "string" },
            userId: { type: "string" },
            beneficiaireId: { type: "string" },
            numeroBon: { type: "string" },
            montant: { type: "number" },
            motif: { type: "string" },
            status: { type: "string" },
        },
        required: ["caisseId", "userId", "beneficiaireId", "numeroBon", "montant", "motif", "status"],
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
            userId: { type: "string" },
            beneficiaireId: { type: "string" },
            numeroBon: { type: "string" },
            montant: { type: "number" },
            motif: { type: "string" },
            status: { type: "string" },
        },
        required: [],
    },
};