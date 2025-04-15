import { UserSession as Build } from "@prisma/client";
import { UserSession as Controller } from "../controllers";
import { ServiceFactory } from "../helpers";
class Service extends ServiceFactory<Build> { }
export default new Service(Controller);