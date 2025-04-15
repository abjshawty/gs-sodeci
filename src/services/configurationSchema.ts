import { ConfigurationSchema as Build } from "@prisma/client";
import { ConfigurationSchema as Controller } from "../controllers";
import { ServiceFactory } from "../helpers";
class Service extends ServiceFactory<Build> { }
export default new Service(Controller);