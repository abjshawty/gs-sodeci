import { Password as Build, PrismaClient } from "@prisma/client";
import { ControllerFactory } from "../helpers";
class CustomController extends ControllerFactory<Build> {
    // constructor (collection: string) {
    //     super(collection);
    //     const prisma = new PrismaClient();
    //     this.search({ id: "default" }, { take: 1, skip: 1 }).then((password) => {
    //         const defaultExists = password.length > 0;
    //         if (!defaultExists) {
    //             prisma.password.create({
    //                 data: {
    //                     id: "default",
    //                     value: "default",
    //                     userId: "default",
    //                 }
    //             });
    //         }
    //     });
    // }
}
export default new CustomController('password');