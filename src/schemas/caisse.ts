export const search = {
    querystring: {
        type: "object",
        properties: {
            code: { type: "string" },
            libelle: { type: "string" },
            solde: { type: "number" },
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
            code: { type: "string" },
            libelle: { type: "string" },
            solde: { type: "number" },
        },
        required: ["code", "libelle", "solde"],
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
            code: { type: "string" },
            libelle: { type: "string" },
            solde: { type: "number" },
        },
        required: [],
    },
};