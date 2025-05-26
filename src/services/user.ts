import { User as Build } from "@prisma/client";
import { User as Controller, Agent as AgentController, Profil as ProfileController } from "../controllers";
import { ServiceFactory } from "../helpers";
import { env } from "../helpers";
import coddyger from "coddyger";

class Service extends ServiceFactory<Build> {
    async login (data: { email: string; password: string; }) {
        try {
            if (data.email === "") {
                const error: any = new Error("Email is required");
                error.statusCode = "400";
                throw error;
            }
            if (data.password === "") {
                const error: any = new Error("Password is required");
                error.statusCode = "400";
                throw error;
            }
            if (!coddyger.string.isEmailAddress(data.email)) {
                const error: any = new Error("Invalid email format.");
                error.statusCode = "400";
                throw error;
            }
            const userWithEmail = await Controller.search({ email: data.email }, { take: 1, skip: 0 });
            if (userWithEmail.length == 0) {
                const error: any = new Error("User not found");
                error.statusCode = "404";
                throw error;
            }
            const internal = env.domains.includes(data.email.split("@")[1]);
            if (internal) {
                const agentWithEmail = await AgentController.search({ email: data.email }, { take: 1, skip: 0 });
                if (agentWithEmail.length == 0) {
                    AgentController.create({
                        email: data.email,
                        prenom: userWithEmail[0].firstname!,
                        nom: userWithEmail[0].lastname!,
                        matricule: userWithEmail[0].matricule!,
                        numCNPS: "",
                        localisation: "",
                        codeSociete: "SOD",
                        exploitation: "",
                        adresse: "",
                        codeStatut: "",
                        lastUser: "",
                        lastDate: "",
                        telephone: "",
                        nomReseau: "",
                        codeCategorieAgent: null,
                        codeFonctionAgent: null,
                        codeZoneIntervention: null,
                        isResponsableCI: false
                    });
                }
                return await Controller.internalLogin(data.email, data.password);
            }
            return await Controller.externalLogin(data.email, data.password);
        } catch (error: any) {
            if (!error.statusCode) error.statusCode = "500";
            throw error;
        }
    };

    async cleanUsers () {
        try {
            const users = await Controller.search({});
            for (const user of users) {
                if (user.firstname !== null) continue;
                const agent = await AgentController.getByEmail(user.email);
                if (agent) {
                    await Controller.update(user.id, { firstname: agent.prenom, lastname: agent.nom, matricule: agent.matricule });
                }
            }
            const agents = await AgentController.search({});
            return { users, agents };
        } catch (error: any) {
            if (!error.statusCode) error.statusCode = "500";
            throw error;
        }
    }

    async finishLogin (data: { profileId: string; userId: string; }) {
        try {
            return await Controller.finishLogin(data.profileId, data.userId);
        } catch (error: any) {
            if (!error.statusCode) error.statusCode = "500";
            throw error;
        }
    }

    override async create (data: {
        email: string;
        firstname: string | null;
        lastname: string | null;
        matricule: string | null;
        status: string;
        roleId: string | null;
        isEmailConfirmed: boolean;
        profileId: string | null;
        userId: string | null;
        passwordId: string | null;
        lastLoginDate: Date;
        createdAt: Date;
        updatedAt: Date;
    }) {
        try {
            if (!data.profileId || data.profileId === "") {
                const profile = await ProfileController.getById("default");
                if (!profile) {
                    const error: any = new Error("Profile not found");
                    error.statusCode = "404";
                    throw error;
                }
                data = { ...data, profileId: profile.id };
            }
            return await Controller.create(data);
        } catch (error: any) {
            if (!error.statusCode) error.statusCode = "500";
            throw error;
        }
    }
}
export default new Service(Controller);