import { User as Build } from "@prisma/client";
import { ControllerFactory } from "../helpers";
import { msal } from "../helpers";
import bcrypt from "bcryptjs";

class CustomController extends ControllerFactory<Build> {
    async externalLogin(email: string, password: string) {
        try {
            const user = await this.search({ email }, { take: 1, skip: 1, include: { password: true } }); //@ts-ignore
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
    async internalLogin(email: string, password: string) {
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
};

export default new CustomController('user');
