export const search = {
    querystring: {
        type: "object",
        properties: {
            email: { type: "string" },
            firstname: { type: "string" },
            lastname: { type: "string" },
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
            email: { type: "string" },
            firstname: { type: "string" },
            lastname: { type: "string" },
            password: { type: "string" },
        },
        required: ["email", "firstname", "lastname", "password"],
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
            email: { type: "string" },
            firstname: { type: "string" },
            lastname: { type: "string" },
            password: { type: "string" },
        },
        required: [],
    },
};

export const login = {
    body: {
        type: "object",
        properties: {
            email: { type: "string" },
            password: { type: "string" },
        },
        required: ["email", "password"],
    },
};
