export const search = {
    querystring: {
        type: "object",
        properties: {
            numero: { type: "string" },
            intitule: { type: "string" },
        },
        required: [],
    },
};

export const paginate = {
    params: {
        type: "object",
        properties: {
            page: { type: "number" }
        },
        required: ["page"],
    },
    querystring: {
        type: "object",
        properties: {
            numero: { type: "string" },
            intitule: { type: "string" },
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
            libelle: { type: "string" },
            numero: { type: "string" },
        },
        required: ["libelle", "numero"],
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
            numCompte: { type: "string" },
            libCompte: { type: "string" },
        },
        required: [],
    },
};