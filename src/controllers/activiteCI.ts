import { ActiviteCI as Build } from "@prisma/client";
import { ControllerFactory } from "../helpers";
class CustomController extends ControllerFactory<Build> { }
export default new CustomController('activiteCi');