export const search = {
    querystring: {
        type: "object",
        properties: {
            codeItineraire: { type: "string" },
            libelleItineraire: { type: "string" },
            codeDepart: { type: "string" },
            codeArrivee: { type: "string" },
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
            codeItineraire: { type: "string" },
            libelleItineraire: { type: "string" },
            codeDepart: { type: "string" },
            codeArrivee: { type: "string" },
        },
        required: ["codeItineraire", "libelleItineraire", "codeDepart", "codeArrivee"],
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
            codeItineraire: { type: "string" },
            libelleItineraire: { type: "string" },
            codeDepart: { type: "string" },
            codeArrivee: { type: "string" },
        },
        required: [],
    },
};