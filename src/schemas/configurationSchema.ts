export const search = {
    querystring: {
        type: "object",
        properties: {
            code: { type: "string" },
            value: { type: "string" },
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
            value: { type: "string" },
        },
        required: ["code", "value"],
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
            value: { type: "string" },
        },
        required: [],
    },
};