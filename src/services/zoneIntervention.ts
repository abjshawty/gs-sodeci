import { ZoneIntervention as Build } from "@prisma/client";
import { ZoneIntervention as Controller } from "../controllers";
import { ServiceFactory } from "../helpers";
class Service extends ServiceFactory<Build> { }
export default new Service(Controller);