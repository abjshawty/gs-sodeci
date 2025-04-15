export const search = {
    querystring: {
        type: "object",
        properties: {
            compteId: { type: "string" },
            natureId: { type: "string" },
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
            compteId: { type: "string" },
            natureId: { type: "string" },
        },
        required: ["compteId", "natureId"],
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
            compteId: { type: "string" },
            natureId: { type: "string" },
        },
        required: [],
    },
};