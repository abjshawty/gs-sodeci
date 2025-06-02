import { User as Build } from "@prisma/client";
import { ControllerFactory } from "../helpers";
import { msal } from "../helpers";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import profil from "./profil";
import coddyger from "coddyger";
class CustomController extends ControllerFactory<Build> {
    // constructor (collection: string) {
    //     super(collection);
    //     console.log("Initializing default user");
    //     const prisma = new PrismaClient();
    //     this.search({ id: "default" }, { take: 1, skip: 1 }).then((user) => {
    //         const defaultExists = user.length > 0;
    //         if (!defaultExists) {
    //             console.log("Default user not found");
    //             prisma.organisation.create({
    //                 data: {
    //                     id: "default",
    //                     name: "default",
    //                     status: "active",
    //                     userId: "default",
    //                     societyId: "default",
    //                 }
    //             }).then(() => {
    //                 console.log("Default organisation created");
    //             });
    //             prisma.user.create({
    //                 data: {
    //                     id: "default",
    //                     email: "admin@super.com",
    //                     password: {
    //                         create: {
    //                             id: "default",
    //                             value: bcrypt.hashSync("default", 10),
    //                             userId: "default",
    //                         }
    //                     },
    //                     role: {
    //                         create: {
    //                             id: "default",
    //                             name: "default",
    //                             status: "active",
    //                             userId: "default",
    //                         }
    //                     },
    //                     status: "active",
    //                     isEmailConfirmed: true,
    //                     profile: {
    //                         create: {
    //                             id: "default",
    //                             isDefault: true,
    //                             organisation: {
    //                                 create: {
    //                                     id: "default",
    //                                     slug: "default",
    //                                     userId: "default",
    //                                 }
    //                             },
    //                             roleId: "default",
    //                         }
    //                     },
    //                     firstname: "Admin",
    //                     lastname: "Super",
    //                     matricule: "admin",
    //                     userId: "default",
    //                     lastLoginDate: new Date()
    //                 }
    //             }).then(() => {
    //                 console.log("Default user created");
    //             }).catch((error) => {
    //                 console.log("Default user not created", error);
    //             });
    //         }
    //     });
    // }

    async select (query: string, status: string, options?: { take: number, skip: number, orderBy?: { [key: string]: "asc" | "desc"; }; }) {
        try {
            const payloadIsId = coddyger.string.isValidObjectId(query);
            if (!payloadIsId) {
                return await this.collection.findMany({
                    where: {
                        AND: [
                            {
                                status: status
                            },
                            {
                                OR: [
                                    {
                                        email: {
                                            contains: query
                                        }
                                    },
                                    {
                                        firstname: {
                                            contains: query
                                        }
                                    },
                                    {
                                        lastname: {
                                            contains: query
                                        }
                                    },
                                    {
                                        matricule: {
                                            contains: query
                                        }
                                    }
                                ]
                            }
                        ]
                    },
                    ...options
                });
            } else {
                return await this.getById(query);
            }
        } catch (error: any) {
            if (!error.statusCode) error.statusCode = "500";
            throw error;
        }
    }

    async externalLogin (email: string, password: string) {
        try {
            const user = await this.search({ email }, { take: 1, skip: 0, include: { password: true, profile: true } });
            console.log('email', email);
            console.log('password', password);
            console.log(user);
            //@ts-ignore
            const currentPassword: string = user[0].password.value;
            // TODO: Implement password expiration
            const match = await bcrypt.compare(password, currentPassword);
            if (!match) {
                const error: any = new Error("Invalid credentials");
                error.statusCode = "401";
                throw error;
            };
            return user[0];
        } catch (error: any) {
            if (!error.statusCode) error.statusCode = "500";
            throw error;
        }
    };
    async internalLogin (email: string, password: string) {
        try {
            const azureData: any = await msal.auth(email, password);
            if (azureData == "invalid_grant") {
                const error: any = new Error("Invalid credentials");
                error.statusCode = "401";
                throw error;
            };
            if (azureData.warning) {
                const error: any = new Error(azureData);
                error.statusCode = "400";
                throw error;
            };
            return azureData;
        } catch (error: any) {
            if (!error.statusCode) error.statusCode = "500";
            throw error;
        }
    }
    async finishLogin (profileId: string, userId: string) {
        try {
            const arr = await this.search({ userId }, { take: 1, skip: 0, include: { password: true, profile: true } });
            if (arr.length == 0) {
                const error: any = new Error("User not found");
                error.statusCode = "404";
                throw error;
            }
            return arr[0];
        } catch (error: any) {
            if (!error.statusCode) error.statusCode = "500";
            throw error;
        }
    }
};

export default new CustomController('user');
