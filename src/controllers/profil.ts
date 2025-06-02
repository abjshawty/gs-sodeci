import { Profil as Build, PrismaClient } from "@prisma/client";
import { ControllerFactory } from "../helpers";
class CustomController extends ControllerFactory<Build> {
    // constructor (collection: string) {
    //     super(collection);
    //     const prisma = new PrismaClient();
    //     this.search({ id: "default" }, { take: 1, skip: 1 }).then((profil) => {
    //         const defaultExists = profil.length > 0;
    //         if (!defaultExists) {
    //             prisma.profil.create({
    //                 data: {
    //                     id: "default",
    //                     isDefault: true,
    //                     organisationId: "default",
    //                     roleId: "default",
    //                 }
    //             });
    //         }
    //     });
    // }
}
export default new CustomController('profil');