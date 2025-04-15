import { BonMission as Build } from "@prisma/client";
import { BonMission as Controller } from "../controllers";
import { ServiceFactory } from "../helpers";
class Service extends ServiceFactory<Build> { }
export default new Service(Controller);