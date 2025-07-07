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
            code: { type: "string" },
            libelle: { type: "string" },
            lieu: { type: "string" },
        },
        required: [],
    },
};
export const search = {
    querystring: {
        type: "object",
        properties: {
            code: { type: "string" },
            libelle: { type: "string" },
            lieu: { type: "string" },
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
            lieu: { type: "string" },
        },
        required: ["code", "libelle", "lieu"],
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
            lieu: { type: "string" },
        },
        required: [],
    },
};
export const uhpdate = {
    body: {
        type: "object",
        properties: {
            _id: { type: "string" },
            code: { type: "string" },
            libelle: { type: "string" },
            lieu: { type: "string" },
        },
        required: [],
    },
};