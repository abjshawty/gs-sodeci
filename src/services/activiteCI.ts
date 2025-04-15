import { ActiviteCI as Build } from "@prisma/client";
import { ActiviteCI as Controller } from "../controllers";
import { ServiceFactory } from "../helpers";
class Service extends ServiceFactory<Build> { }
export default new Service(Controller);