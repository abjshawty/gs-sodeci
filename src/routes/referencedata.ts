import { FastifyPluginCallback, FastifyRequest, FastifyReply } from "fastify";
import * as Service from "../services";
const routes: FastifyPluginCallback = (server) => {
    server.route({
        method: "GET",
        url: "/:type",
        handler: async (request: FastifyRequest<{ Params: { type: string; }; }>, reply: FastifyReply) => {
            let result: any[] = [];
            let status = 200;
            switch (request.params.type) {
                case "typemissions":
                    result = await Service.TypeMission.getAll();
                    break;
                case "typefrais":
                    result = await Service.TypeFrais.getAll();
                    break;
                case "typecarburant":
                    result = await Service.TypeCarburant.getAll();
                    break;
                case "departarrives":
                    result = await Service.DepartArrive.getAll();
                    break;
                case "villes":
                    result = await Service.Ville.getAll();
                    break;
                case "categorieagents":
                    result = await Service.CategorieAgent.getAll();
                    break;
                case "postes":
                    result = await Service.Poste.getAll();
                    break;
                case "fonctions":
                    result = await Service.Fonction.getAll();
                    break;
                case "moyentransports":
                    result = await Service.MoyenTransport.getAll();
                    break;
                case "justifications":
                    result = await Service.Justification.getAll();
                    break;
                case "carburants":
                    result = await Service.TypeCarburant.getAll();
                    break;
                case "activites":
                    result = await Service.Activite.getAll();
                    break;
                case "activitecis":
                    result = await Service.ActiviteCI.getAll();
                    break;
                case "agents":
                    result = await Service.Agent.getAll();
                    break;
                case "centreinputations":
                    result = await Service.CentreImputation.getAll();
                    break;
                case "grillefrais":
                    result = await Service.GrilleFrais.getAll();
                    break;
                case "grillekilometriques":
                    result = await Service.GrilleKilometrique.getAll();
                    break;
                case "zoneinterventions":
                    result = await Service.ZoneIntervention.getAll();
                    break;
                case "itinerairedistances":
                    result = await Service.ItineraireDistance.getAll();
                    break;
                default:
                    status = 404;
                    break;
            }
            reply.code(status).send({ data: result });
        }
    });
};
export default routes;
