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
            activiteId: { type: "string" },
            centreImputationId: { type: "string" },
        },
        required: [],
    },
};

export const search = {
    querystring: {
        type: "object",
        properties: {
            activiteId: { type: "string" },
            centreImputationId: { type: "string" },
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
            activiteId: { type: "string" },
            centreImputationId: { type: "string" },
        },
        required: ["activiteId", "centreImputationId"],
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
            activiteId: { type: "string" },
            centreImputationId: { type: "string" },
        },
        required: [],
    },
};