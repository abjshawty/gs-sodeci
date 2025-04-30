import { Agent as Build } from "@prisma/client";
import { ControllerFactory } from "../helpers";

class CustomController extends ControllerFactory<Build> {
    async getByEmail (email: string): Promise<Build> {
        try {
            return await this.collection.findFirst({
                where: {
                    email
                }
            });
        } catch (error: any) {
            if (!error.statusCode) error.statusCode = "404";
            throw error;
        }
    }
}
export default new CustomController('agent');