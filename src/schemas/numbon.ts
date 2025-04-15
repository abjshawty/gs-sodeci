export const search = {
    querystring: {
        type: "object",
        properties: {
            numero: { type: "string" },
        },
        required: [],
    },
};

export const getOrDelete = {
    params: {
        type: "object",
        properties: {
            numero: { type: "string" },
        },
        required: ["numero"],
    },
};

export const create = {
    body: {
        type: "object",
        properties: {
            numero: { type: "string" },
        },
        required: ["numero"],
    },
};

export const update = {
    params: {
        type: "object",
        properties: {
            numero: { type: "string" },
        },
        required: ["numero"],
    },
    body: {
        type: "object",
        properties: {
            numero: { type: "string" },
        },
        required: [],
    },
};