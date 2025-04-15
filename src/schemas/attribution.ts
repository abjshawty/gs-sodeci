export const search = {
    querystring: {
        type: "object",
        properties: {
            userId: { type: "string" },
            dateDebut: { type: "string", format: "date-time" },
            dateFin: { type: "string", format: "date-time" },
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
            userId: { type: "string" },
            dateDebut: { type: "string", format: "date-time" },
            dateFin: { type: "string", format: "date-time" },
        },
        required: ["userId", "dateDebut", "dateFin"],
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
            userId: { type: "string" },
            dateDebut: { type: "string", format: "date-time" },
            dateFin: { type: "string", format: "date-time" },
        },
        required: [],
    },
};