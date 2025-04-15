export const search = {
    querystring: {
        type: "object",
        properties: {
            userId: { type: "string" },
            priority: { type: "number" },
        },
        required: [],
    },
};

export const getOrDelete = {
    params: {
        type: "object",
        properties: {
            userId: { type: "string" },
        },
        required: ["userId"],
    },
};

export const create = {
    body: {
        type: "object",
        properties: {
            userId: { type: "string" },
            priority: { type: "number" },
        },
        required: ["userId", "priority"],
    },
};

export const update = {
    params: {
        type: "object",
        properties: {
            userId: { type: "string" },
        },
        required: ["userId"],
    },
    body: {
        type: "object",
        properties: {
            priority: { type: "number" },
        },
        required: [],
    },
};