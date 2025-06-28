import { FastifyPluginCallback, FastifyRequest, FastifyReply } from "fastify";
import * as Service from "../services";
// import { TypeMission, TypeFrais, TypeCarburant } from "@prisma/client"
import * as Build from "@prisma/client";
import { link } from "fs";
const routes: FastifyPluginCallback = (server) => {
    /**
     * CREATE paths for referenceDate requests
     */
    server.route({
        method: "POST",
        url: "/:type",
        handler: async (request: FastifyRequest<{ Params: { type: string; }; Body: any; }>, reply: FastifyReply) => {
            let result: any[] = [];
            let body: any = null;
            let status = 200;
            switch (request.params.type) {
                case "typemissions":
                    body = {
                        code: (request.body as { codeTypeMission: string; }).codeTypeMission,
                        libelle: (request.body as { libTypeMission: string; }).libTypeMission
                    };
                    result = await Service.TypeMission.create(body as Omit<Build.TypeMission, 'id' | 'createdAt' | 'updatedAt'>);
                    break;
                case "typefrais":
                    result = await Service.TypeFrais.create(request.body as Omit<Build.TypeFrais, 'id' | 'createdAt' | 'updatedAt'>);
                    break;
                case "typecarburant":
                    result = await Service.TypeCarburant.create(request.body as Omit<Build.TypeCarburant, 'id' | 'createdAt' | 'updatedAt'>);
                    break;
                case "departarrives":
                    result = await Service.DepartArrive.create(request.body as Omit<Build.DepartArrive, 'id' | 'createdAt' | 'updatedAt'>);
                    break;
                case "villes":
                    result = await Service.Ville.create(request.body as Omit<Build.Ville, 'id' | 'createdAt' | 'updatedAt'>);
                    break;
                case "categorieagents":
                    result = await Service.CategorieAgent.create(request.body as Omit<Build.CategorieAgent, 'id' | 'createdAt' | 'updatedAt'>);
                    break;
                case "postes":
                    result = await Service.Poste.create(request.body as Omit<Build.Poste, 'id' | 'createdAt' | 'updatedAt'>);
                    break;
                case "fonctions":
                    result = await Service.Fonction.create(request.body as Omit<Build.Fonction, 'id' | 'createdAt' | 'updatedAt'>);
                    break;
                case "moyentransports":
                    body = {
                        code: (request.body as { codeMoyenTransport: string; }).codeMoyenTransport,
                        libelle: (request.body as { libelleMoyenTransport: string; }).libelleMoyenTransport
                    };
                    result = await Service.MoyenTransport.create(body as Omit<Build.MoyenTransport, 'id' | 'createdAt' | 'updatedAt'>);
                    break;
                case "justifications":
                    result = await Service.Justification.create(request.body as Omit<Build.Justification, 'id' | 'createdAt' | 'updatedAt'>);
                    break;
                case "carburants":
                    result = await Service.TypeCarburant.create(request.body as Omit<Build.TypeCarburant, 'id' | 'createdAt' | 'updatedAt'>);
                    break;
                case "activites":
                    result = await Service.Activite.create(request.body as Omit<Build.Activite, 'id' | 'createdAt' | 'updatedAt'>);
                    break;
                case "activitecis":
                    result = await Service.ActiviteCI.create(request.body as Omit<Build.ActiviteCI, 'id' | 'createdAt' | 'updatedAt'>);
                    break;
                case "agents":
                    result = await Service.Agent.create(request.body as Omit<Build.Agent, 'id' | 'createdAt' | 'updatedAt'>);
                    break;
                case "centreinputations":
                    result = await Service.CentreImputation.create(request.body as Omit<Build.CentreImputation, 'id' | 'createdAt' | 'updatedAt'>);
                    break;
                case "grillefrais":
                    result = await Service.GrilleFrais.create(request.body as Omit<Build.GrilleFrais, 'id' | 'createdAt' | 'updatedAt'>);
                    break;
                case "grillekilometriques":
                    result = await Service.GrilleKilometrique.create(request.body as Omit<Build.GrilleKilometrique, 'id' | 'createdAt' | 'updatedAt'>);
                    break;
                case "zoneinterventions":
                    body = {
                        code: (request.body as { codeZoneIntervention: string; libZoneIntervention: string; }).codeZoneIntervention,
                        libelle: (request.body as { codeZoneIntervention: string; libZoneIntervention: string; }).libZoneIntervention
                    };
                    result = await Service.ZoneIntervention.create(body as Omit<Build.ZoneIntervention, 'id' | 'createdAt' | 'updatedAt'>);
                    break;
                case "itinerairedistances":
                    result = await Service.ItineraireDistance.create(request.body as Omit<Build.ItineraireDistance, 'id' | 'createdAt' | 'updatedAt'>);
                    break;
                default:
                    status = 404;
                    break;
            }
            reply.code(status).send({ data: result });
        }
    });

    /**
     * READ Paths for referenceData requests
     */
    server.route({
        method: "GET",
        url: "/:type",
        handler: async (request: FastifyRequest<{ Params: { type: string; }; }>, reply: FastifyReply) => {
            let result: any[] = [];
            let status = 200;
            switch (request.params.type) {
                case "typemissions":
                    result = await Service.TypeMission.list({});
                    result = result.map((item: Build.TypeMission) => {
                        return { ...item, codeTypeMission: item.code, libTypeMission: item.libelle };
                    });
                    break;
                case "typefrais":
                    result = await Service.TypeFrais.list({});
                    result = result.map((item: Build.TypeFrais) => {
                        return { ...item, codeTypeFrais: item.code, libTypeFrais: item.libelle };
                    });
                    break;
                case "typecarburant":
                    result = await Service.TypeCarburant.list({});
                    result = result.map((item: Build.TypeCarburant) => {
                        return { ...item, codeTypeCarburant: item.code, libTypeCarburant: item.libelle };
                    });
                    break;
                case "departarrives":
                    result = await Service.DepartArrive.list({});
                    break;
                case "villes":
                    result = await Service.Ville.list({});
                    result = result.map((item: Build.Ville) => {
                        return { ...item, codeVille: item.code, libelleVille: item.libelle };
                    });
                    break;
                case "categorieagents":
                    result = await Service.CategorieAgent.list({});
                    result = result.map((item: Build.CategorieAgent) => {
                        return { ...item, codeCategorieAgent: item.code, libelleCategorieAgent: item.libelle };
                    });
                    break;
                case "postes":
                    result = await Service.Poste.list({});
                    break;
                case "fonctions":
                    result = await Service.Fonction.list({});
                    break;
                case "moyentransports":
                    result = await Service.MoyenTransport.list({});
                    result = result.map((item: Build.MoyenTransport) => {
                        return { ...item, codeMoyenTransport: item.code, libelleMoyenTransport: item.libelle };
                    });
                    break;
                case "justifications":
                    result = await Service.Justification.list({});
                    break;
                case "carburants":
                    result = await Service.TypeCarburant.list({});
                    result = result.map((item: Build.TypeCarburant) => {
                        return { ...item, codeTypeCarburant: item.code, libelleTypeCarburant: item.libelle };
                    });
                    break;
                case "activites":
                    result = await Service.Activite.list({});
                    result = result.map((item: Build.Activite) => {
                        return { ...item, codeActivite: item.code, libelleActivite: item.libelle };
                    });
                    break;
                case "activitecis":
                    result = await Service.ActiviteCI.list({});
                    break;
                case "agents":
                    result = await Service.Agent.list({});
                    break;
                case "centreinputations":
                    result = await Service.CentreImputation.list({});
                    break;
                case "grillefrais":
                    result = await Service.GrilleFrais.list({});
                    break;
                case "grillekilometriques":
                    result = await Service.GrilleKilometrique.list({});
                    break;
                case "zoneinterventions":
                    result = await Service.ZoneIntervention.list({});
                    result = result.map((item: Build.ZoneIntervention) => {
                        return { ...item, codeZoneIntervention: item.code, libelleZoneIntervention: item.libelle };
                    });
                    break;
                case "itinerairedistances":
                    result = await Service.ItineraireDistance.list({});
                    break;
                default:
                    status = 404;
                    break;
            }
            reply.code(status).send(result);
        }
    });

    server.route({
        method: "GET",
        url: "/:type/search",
        handler: async (request: FastifyRequest<{ Params: { type: string; }, Querystring: { [key: string]: string; }; }>, reply: FastifyReply) => { // TODO: Check if paginated
            let result: any = {};
            let status = 200;
            switch (request.params.type) {
                case "typemissions":
                    result = await Service.TypeMission.search(request.query);
                    result = result.map((item: Build.TypeMission) => {
                        return { ...item, codeTypeMission: item.code, libTypeMission: item.libelle };
                    });
                    break;
                case "typefrais":
                    result = await Service.TypeFrais.search(request.query);
                    result = result.map((item: Build.TypeFrais) => {
                        return { ...item, codeTypeFrais: item.code, libTypeFrais: item.libelle };
                    });
                    break;
                case "typecarburant":
                    result = await Service.TypeCarburant.search(request.query);
                    result = result.map((item: Build.TypeCarburant) => {
                        return { ...item, codeTypeCarburant: item.code, libTypeCarburant: item.libelle };
                    });
                    break;
                case "departarrives":
                    result = await Service.DepartArrive.search(request.query);
                    break;
                case "villes":
                    result = await Service.Ville.search(request.query);
                    break;
                case "categorieagents":
                    result = await Service.CategorieAgent.search(request.query);
                    break;
                case "postes":
                    result = await Service.Poste.search(request.query);
                    break;
                case "fonctions":
                    result = await Service.Fonction.search(request.query);
                    break;
                case "moyentransports":
                    result = await Service.MoyenTransport.search(request.query);
                    break;
                case "justifications":
                    result = await Service.Justification.search(request.query);
                    break;
                case "carburants":
                    result = await Service.TypeCarburant.search(request.query);
                    break;
                case "activites":
                    result = await Service.Activite.search(request.query);
                    break;
                case "activitecis":
                    result = await Service.ActiviteCI.search(request.query);
                    break;
                case "agents":
                    result = await Service.Agent.search(request.query);
                    break;
                case "centreinputations":
                    result = await Service.CentreImputation.search(request.query);
                    break;
                case "grillefrais":
                    result = await Service.GrilleFrais.search(request.query);
                    break;
                case "grillekilometriques":
                    result = await Service.GrilleKilometrique.search(request.query);
                    break;
                case "zoneinterventions":
                    result = await Service.ZoneIntervention.search(request.query);
                    result = result.map((item: Build.ZoneIntervention) => {
                        return { ...item, codeZoneIntervention: item.code, libelleZoneIntervention: item.libelle };
                    });
                    break;
                case "itinerairedistances":
                    result = await Service.ItineraireDistance.search(request.query);
                    break;
                default:
                    status = 404;
                    break;
            }
            reply.code(status).send({ data: result });
        }
    });
    server.route({
        method: "GET",
        url: "/:type/paginate/:page",
        handler: async (request: FastifyRequest<{ Params: { type: string; page: number; }, Querystring: { [key: string]: string; }; }>, reply: FastifyReply) => { // TODO: Check if paginated
            let result: any = {};
            let status = 200;
            switch (request.params.type) {
                case "typemissions":
                    result = await Service.TypeMission.search(request.query, { page: request.params.page });
                    result = result.map((item: Build.TypeMission) => {
                        return { ...item, codeTypeMission: item.code, libTypeMission: item.libelle };
                    });
                    break;
                case "typefrais":
                    result = await Service.TypeFrais.search(request.query, { page: request.params.page });
                    result = result.map((item: Build.TypeFrais) => {
                        return { ...item, codeTypeFrais: item.code, libTypeFrais: item.libelle };
                    });
                    break;
                case "typecarburant":
                    result = await Service.TypeCarburant.search(request.query, { page: request.params.page });
                    result = result.map((item: Build.TypeCarburant) => {
                        return { ...item, codeTypeCarburant: item.code, libTypeCarburant: item.libelle };
                    });
                    break;
                case "departarrives":
                    result = await Service.DepartArrive.search(request.query, { page: request.params.page });
                    break;
                case "villes":
                    result = await Service.Ville.search(request.query, { page: request.params.page });
                    break;
                case "categorieagents":
                    result = await Service.CategorieAgent.search(request.query, { page: request.params.page });
                    break;
                case "postes":
                    result = await Service.Poste.search(request.query, { page: request.params.page });
                    break;
                case "fonctions":
                    result = await Service.Fonction.search(request.query, { page: request.params.page });
                    break;
                case "moyentransports":
                    result = await Service.MoyenTransport.search(request.query, { page: request.params.page });
                    break;
                case "justifications":
                    result = await Service.Justification.search(request.query, { page: request.params.page });
                    break;
                case "carburants":
                    result = await Service.TypeCarburant.search(request.query, { page: request.params.page });
                    result = result.map((item: Build.TypeCarburant) => {
                        return { ...item, codeTypeCarburant: item.code, libTypeCarburant: item.libelle };
                    });
                    break;
                case "activites":
                    result = await Service.Activite.search(request.query, { page: request.params.page });
                    break;
                case "activitecis":
                    result = await Service.ActiviteCI.search(request.query, { page: request.params.page });
                    result = result.map((item: Build.ActiviteCI) => {
                        return { ...item, codeact: item.codeActivite, libact: item.codeActivite };
                    });
                    break;
                case "agents":
                    result = await Service.Agent.search(request.query, { page: request.params.page });
                    break;
                case "centreinputations":
                    result = await Service.CentreImputation.search(request.query, { page: request.params.page });
                    break;
                case "grillefrais":
                    result = await Service.GrilleFrais.search(request.query, { page: request.params.page });
                    break;
                case "grillekilometriques":
                    result = await Service.GrilleKilometrique.search(request.query, { page: request.params.page });
                    break;
                case "zoneinterventions":
                    result = await Service.ZoneIntervention.search(request.query, { page: request.params.page });
                    result = result.map((item: Build.ZoneIntervention) => {
                        return { ...item, codeZoneIntervention: item.code, libelleZoneIntervention: item.libelle };
                    });
                    break;
                case "itinerairedistances":
                    result = await Service.ItineraireDistance.search(request.query, { page: request.params.page });
                    break;
                default:
                    status = 404;
                    break;
            }
            reply.code(status).send({ data: result });
        }
    });

    server.route({
        method: "GET",
        url: "/:type/count",
        handler: async (request: FastifyRequest<{ Params: { type: string; }; }>, reply: FastifyReply) => {
            let result: number = 0;
            let status: number = 200;
            switch (request.params.type) {
                case "typemissions":
                    result = await Service.TypeMission.count();
                    break;
                case "typefrais":
                    result = await Service.TypeFrais.count();
                    break;
                case "typecarburant":
                    result = await Service.TypeCarburant.count();
                    break;
                case "departarrives":
                    result = await Service.DepartArrive.count();
                    break;
                case "villes":
                    result = await Service.Ville.count();
                    break;
                case "categorieagents":
                    result = await Service.CategorieAgent.count();
                    break;
                case "postes":
                    result = await Service.Poste.count();
                    break;
                case "fonctions":
                    result = await Service.Fonction.count();
                    break;
                case "moyentransports":
                    result = await Service.MoyenTransport.count();
                    break;
                case "justifications":
                    result = await Service.Justification.count();
                    break;
                case "carburants":
                    result = await Service.TypeCarburant.count();
                    break;
                case "activites":
                    result = await Service.Activite.count();
                    break;
                case "activitecis":
                    result = await Service.ActiviteCI.count();
                    break;
                case "agents":
                    result = await Service.Agent.count();
                    break;
                case "centreinputations":
                    result = await Service.CentreImputation.count();
                    break;
                case "grillefrais":
                    result = await Service.GrilleFrais.count();
                    break;
                case "grillekilometriques":
                    result = await Service.GrilleKilometrique.count();
                    break;
                case "zoneinterventions":
                    result = await Service.ZoneIntervention.count();
                    break;
                case "itinerairedistances":
                    result = await Service.ItineraireDistance.count();
                    break;
                default:
                    status = 404;
                    break;
            }
            reply.code(status).send({ data: result });
        }
    });

    /**
     * UPDATE paths for referenceData requests
     */
    server.route({
        method: "PUT",
        url: "/:type/:id",
        handler: async (request: FastifyRequest<{ Params: { type: string; id: string; }; Body: any; }>, reply) => {
            let result: any[] = [];
            let body: any = null;
            let status = 200;
            switch (request.params.type) {
                case "typemissions":
                    body = {
                        code: (request.body as { codeTypeMission: string; libTypeMission: string; }).codeTypeMission,
                        libelle: (request.body as { codeTypeMission: string; libTypeMission: string; }).libTypeMission
                    };
                    console.log(body);
                    result = await Service.TypeMission.update(request.params.id, body);
                    break;
                case "typefrais":
                    body = {
                        code: (request.body as Build.TypeFrais).code,
                        libelle: (request.body as Build.TypeFrais).libelle
                    };
                    result = await Service.TypeFrais.update(request.params.id, body);
                    break;
                case "typecarburant":
                    body = {
                        code: (request.body as Build.TypeCarburant).code,
                        libelle: (request.body as Build.TypeCarburant).libelle
                    };
                    result = await Service.TypeCarburant.update(request.params.id, body);
                    break;
                case "departarrives":
                    result = await Service.DepartArrive.update(request.params.id, request.body as Partial<Build.DepartArrive>);
                    break;
                case "villes":
                    result = await Service.Ville.update(request.params.id, request.body as Partial<Build.Ville>);
                    break;
                case "categorieagents":
                    result = await Service.CategorieAgent.update(request.params.id, request.body as Partial<Build.CategorieAgent>);
                    break;
                case "postes":
                    result = await Service.Poste.update(request.params.id, request.body as Partial<Build.Poste>);
                    break;
                case "fonctions":
                    result = await Service.Fonction.update(request.params.id, request.body as Partial<Build.Fonction>);
                    break;
                case "moyentransports":
                    body = {
                        code: (request.body as { codeMoyenTransport: string; }).codeMoyenTransport,
                        libelle: (request.body as { libelleMoyenTransport: string; }).libelleMoyenTransport
                    };
                    result = await Service.MoyenTransport.update(request.params.id, body as Partial<Build.MoyenTransport>);
                    break;
                case "justifications":
                    result = await Service.Justification.update(request.params.id, request.body as Partial<Build.Justification>);
                    break;
                case "carburants":
                    result = await Service.TypeCarburant.update(request.params.id, request.body as Partial<Build.TypeCarburant>);
                    break;
                case "activites":
                    result = await Service.Activite.update(request.params.id, request.body as Partial<Build.Activite>);
                    break;
                case "activitecis":
                    result = await Service.ActiviteCI.update(request.params.id, request.body as Partial<Build.ActiviteCI>);
                    break;
                case "agents":
                    result = await Service.Agent.update(request.params.id, request.body as Partial<Build.Agent>);
                    break;
                case "centreinputations":
                    result = await Service.CentreImputation.update(request.params.id, request.body as Partial<Build.CentreImputation>);
                    break;
                case "grillefrais":
                    result = await Service.GrilleFrais.update(request.params.id, request.body as Partial<Build.GrilleFrais>);
                    break;
                case "grillekilometriques":
                    result = await Service.GrilleKilometrique.update(request.params.id, request.body as Partial<Build.GrilleKilometrique>);
                    break;
                case "zoneinterventions":
                    body = {
                        code: (request.body as { codeZoneIntervention: string; libZoneIntervention: string; }).codeZoneIntervention,
                        libelle: (request.body as { codeZoneIntervention: string; libZoneIntervention: string; }).libZoneIntervention
                    };
                    result = await Service.ZoneIntervention.update(request.params.id, body as Partial<Build.ZoneIntervention>);
                    break;
                case "itinerairedistances":
                    result = await Service.ItineraireDistance.update(request.params.id, request.body as Partial<Build.ItineraireDistance>);
                    break;
                case "natures":
                    const id = request.params.id;
                    const data = {
                        libelle: (request.body as { libNature: string; }).libNature,
                    };
                    result = await Service.Nature.update(id, data);
                    break;
                default:
                    status = 404;
                    break;
            }
            reply.code(status).send({ data: result });
        }
    });

    /**
     * DELETE paths for referenceData requests
     */
    server.route({
        method: "DELETE",
        url: "/:type/:id",
        handler: async (request: FastifyRequest<{ Params: { type: string; id: string; }; }>, reply) => {
            let result: any[] = [];
            let status = 200;
            switch (request.params.type) {
                case "typemissions":
                    result = await Service.TypeMission.delete(request.params.id);
                    break;
                case "typefrais":
                    result = await Service.TypeFrais.delete(request.params.id);
                    break;
                case "typecarburant":
                    result = await Service.TypeCarburant.delete(request.params.id);
                    break;
                case "departarrives":
                    result = await Service.DepartArrive.delete(request.params.id);
                    break;
                case "villes":
                    result = await Service.Ville.delete(request.params.id);
                    break;
                case "categorieagents":
                    result = await Service.CategorieAgent.delete(request.params.id);
                    break;
                case "postes":
                    result = await Service.Poste.delete(request.params.id);
                    break;
                case "fonctions":
                    result = await Service.Fonction.delete(request.params.id);
                    break;
                case "moyentransports":
                    result = await Service.MoyenTransport.delete(request.params.id);
                    break;
                case "justifications":
                    result = await Service.Justification.delete(request.params.id);
                    break;
                case "carburants":
                    result = await Service.TypeCarburant.delete(request.params.id);
                    break;
                case "activites":
                    result = await Service.Activite.delete(request.params.id);
                    break;
                case "activitecis":
                    result = await Service.ActiviteCI.delete(request.params.id);
                    break;
                case "agents":
                    result = await Service.Agent.delete(request.params.id);
                    break;
                case "centreinputations":
                    result = await Service.CentreImputation.delete(request.params.id);
                    break;
                case "grillefrais":
                    result = await Service.GrilleFrais.delete(request.params.id);
                    break;
                case "grillekilometriques":
                    result = await Service.GrilleKilometrique.delete(request.params.id);
                    break;
                case "zoneinterventions":
                    result = await Service.ZoneIntervention.delete(request.params.id);
                    break;
                case "itinerairedistances":
                    result = await Service.ItineraireDistance.delete(request.params.id);
                    break;
                case "natures":
                    result = await Service.Nature.delete(request.params.id);
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
