import { BonMission as Build } from "@prisma/client";
import { BonMission as Controller } from "../controllers";
import { ServiceFactory } from "../helpers";
class Service extends ServiceFactory<Build> {
    async create_num (prefix: string = 'BON') {

        try {
            const td = new Date();
            const num = `${prefix}-${td.getFullYear()}-${td.getMonth() + 1}-${td.getDay()}-${Math.random().toString().slice(2, 6)}`; // TODO: generate number
            return { status: 200, data: num };
        }
        catch (error: any) {
            console.log(error);
            throw new Error("une erreur est survenue impossible de créer le numéro de bon");
        }
    }
}
export default new Service(Controller);