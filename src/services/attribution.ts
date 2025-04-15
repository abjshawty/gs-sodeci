import { Attribution as Build } from "@prisma/client";
import { Attribution as Controller } from "../controllers";
import { ServiceFactory } from "../helpers";
class Service extends ServiceFactory<Build> { }
export default new Service(Controller);