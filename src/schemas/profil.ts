export const search = {
    querystring: {
        type: "object",
        properties: {
            organisationId: { type: "string" },
            roleId: { type: "string" },
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
            organisationId: { type: "string" },
            roleId: { type: "string" },
        },
        required: ["organisationId", "roleId"],
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
            organisationId: { type: "string" },
            roleId: { type: "string" },
        },
        required: [],
    },
};