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
            libelle: { type: "string" },
            adresseip: { type: "string" },
            status: { type: "string" },
        },
        required: [],
    },
};

export const search = {
    querystring: {
        type: "object",
        properties: {
            libelle: { type: "string" },
            adresseip: { type: "string" },
            status: { type: "string" },
        },
        required: [],
    },
};

export const getOrDelete = {
    params: {
        type: "object",
        properties: {
            code: { type: "string" },
        },
        required: ["code"],
    },
};

export const create = {
    body: {
        type: "object",
        properties: {
            libelle: { type: "string" },
            adresseip: { type: "string" },
            status: { type: "string" },
        },
        required: ["libelle", "adresseip", "status"],
    },
};

export const update = {
    params: {
        type: "object",
        properties: {
            code: { type: "string" },
        },
        required: ["code"],
    },
    body: {
        type: "object",
        properties: {
            libelle: { type: "string" },
            adresseip: { type: "string" },
            status: { type: "string" },
        },
        required: [],
    },
};