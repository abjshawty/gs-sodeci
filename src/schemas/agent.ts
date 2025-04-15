export const search = {
    querystring: {
        type: "object",
        properties: {
            matricule: { type: "string" },
            nom: { type: "string" },
            prenom: { type: "string" },
            email: { type: "string" },
            telephone: { type: "string" },
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
            matricule: { type: "string" },
            nom: { type: "string" },
            prenom: { type: "string" },
            numCNPS: { type: "string" },
            localisation: { type: "string" },
            email: { type: "string" },
            codeSociete: { type: "string" },
            exploitation: { type: "string" },
            adresse: { type: "string" },
            codeStatut: { type: "string" },
            lastUser: { type: "string" },
            lastDate: { type: "string" },
            telephone: { type: "string" },
            nomReseau: { type: "string" },
            codeCategorieAgent: { type: "string" },
            codeFonctionAgent: { type: "string" },
            codeZoneIntervention: { type: "string" },
            isResponsableCI: { type: "boolean" },
        },
        required: [
            "matricule", "nom", "prenom", "numCNPS", "localisation", "email", "codeSociete", "exploitation", "adresse", "codeStatut", "lastUser", "lastDate", "telephone", "nomReseau", "codeCategorieAgent", "codeFonctionAgent", "codeZoneIntervention", "isResponsableCI"
        ],
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
            matricule: { type: "string" },
            nom: { type: "string" },
            prenom: { type: "string" },
            numCNPS: { type: "string" },
            localisation: { type: "string" },
            email: { type: "string" },
            codeSociete: { type: "string" },
            exploitation: { type: "string" },
            adresse: { type: "string" },
            codeStatut: { type: "string" },
            lastUser: { type: "string" },
            lastDate: { type: "string" },
            telephone: { type: "string" },
            nomReseau: { type: "string" },
            codeCategorieAgent: { type: "string" },
            codeFonctionAgent: { type: "string" },
            codeZoneIntervention: { type: "string" },
            isResponsableCI: { type: "boolean" },
        },
        required: [],
    },
};