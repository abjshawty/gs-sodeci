import { Role as Build, PrismaClient } from "@prisma/client";
import { ControllerFactory } from "../helpers";
class CustomController extends ControllerFactory<Build> {
    // constructor (collection: string) {
    //     super(collection);
    //     const prisma = new PrismaClient();
    //     this.search({ id: "default" }, { take: 1, skip: 1 }).then((role) => {
    //         const defaultExists = role.length > 0;
    //         if (!defaultExists) {
    //             prisma.role.create({
    //                 data: {
    //                     id: "default",
    //                     name: "default",
    //                     status: "active",
    //                     userId: "default",
    //                     createdAt: new Date(),
    //                     updatedAt: new Date(),
    //                 }
    //             });
    //         }
    //     });
    // }
}
export default new CustomController('role');