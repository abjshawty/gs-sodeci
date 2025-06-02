export const search = {
    querystring: {
        type: "object",
        properties: {
            name: { type: "string" },
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
            name: { type: "string" },
            status: { type: "string" },
        },
        required: [],
    },
};