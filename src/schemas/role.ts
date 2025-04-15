export const search = {
    querystring: {
        type: "object",
        properties: {
            code: { type: "string" },
            libelle: { type: "string" },
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
            code: { type: "string" },
            libelle: { type: "string" },
        },
        required: ["code", "libelle"],
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
        },
        required: [],
    },
};