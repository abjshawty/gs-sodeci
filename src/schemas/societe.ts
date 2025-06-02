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
            slug: { type: "string" },
            name: { type: "string" },
        },
        required: ["code", "slug", "name"],
    },
};

export const createIncomplete = {
    body: {
        type: "object",
        properties: {
            code: { type: "string" },
            slug: { type: "string" },
            name: { type: "string" },
        },
        required: ["name"],
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
            slug: { type: "string" },
            name: { type: "string" },
        },
        required: [],
    },
};
export const updateIncomplete = {
    body: {
        type: "object",
        properties: {
            _id: { type: "string" },
            code: { type: "string" },
            slug: { type: "string" },
            name: { type: "string" },
        },
        required: ["_id"],
    },
};
