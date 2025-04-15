export const search = {
    querystring: {
        type: "object",
        properties: {
            filename: { type: "string" },
            mimetype: { type: "string" },
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
            filename: { type: "string" },
            mimetype: { type: "string" },
            path: { type: "string" },
            size: { type: "number" },
        },
        required: ["filename", "mimetype", "path", "size"],
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
            filename: { type: "string" },
            mimetype: { type: "string" },
            path: { type: "string" },
            size: { type: "number" },
        },
        required: [],
    },
};