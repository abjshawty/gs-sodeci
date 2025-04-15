import { Fonction as Build } from "@prisma/client";
import { Fonction as Controller } from "../controllers";
import { ServiceFactory } from "../helpers";
class Service extends ServiceFactory<Build> { }
export default new Service(Controller);