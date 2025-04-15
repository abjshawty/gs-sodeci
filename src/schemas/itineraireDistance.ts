export const search = {
    querystring: {
        type: "object",
        properties: {
            code: { type: "string" },
            distance: { type: "number" },
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
            distance: { type: "number" },
        },
        required: ["code", "distance"],
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
            distance: { type: "number" },
        },
        required: [],
    },
};