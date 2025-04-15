import { GrilleFrais as Build } from "@prisma/client";
import { GrilleFrais as Controller } from "../controllers";
import { ServiceFactory } from "../helpers";
class Service extends ServiceFactory<Build> { }
export default new Service(Controller);