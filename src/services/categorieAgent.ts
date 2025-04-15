import { CategorieAgent as Build } from "@prisma/client";
import { CategorieAgent as Controller } from "../controllers";
import { ServiceFactory } from "../helpers";
class Service extends ServiceFactory<Build> { }
export default new Service(Controller);