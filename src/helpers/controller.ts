import { client } from "../db";
class Controller<T> {
    collection: any;
    constructor (collection: string) {
        this.collection = client[collection];
    }
    async create (data: Omit<T, 'id' | 'createdAt' | 'updatedAt'>) {
        try {
            return await this.collection.create({
                data
            });
        } catch (error: any) {
            if (!error.statusCode) error.statusCode = "500";
            throw error;
        }
    }
    async createDefault (data: T) {
        try {
            return await this.collection.create({
                data
            });
        } catch (error: any) {
            if (!error.statusCode) error.statusCode = "500";
            throw error;
        }
    }
    async getById (id: string, options?: { include?: { [key: string]: boolean; }; }) {
        try {
            return await this.collection.findUnique({
                where: {
                    id
                },
                ...options
            });
        } catch (error: any) {
            if (!error.statusCode) error.statusCode = "404";
            throw error;
        }
    }
    async getAll (options?: { where?: { [key: string]: string; }; include?: { [key: string]: boolean; }; }) {
        try {
            return await this.collection.findMany({
                where: {
                    ...options?.where
                },
                ...options
            });
        } catch (error: any) {
            if (!error.statusCode) error.statusCode = "500";
            throw error;
        }
    }
    async count (query?: { [key: string]: string; }) {
        try {
            return await this.collection.count({
                where: {
                    ...query
                }
            });
        } catch (error: any) {
            if (!error.statusCode) error.statusCode = "500";
            throw error;
        }
    }

    async update (id: string, data: Partial<T>, options?: { include?: { [key: string]: boolean; }; }) {
        try {
            return await this.collection.update({
                where: {
                    id
                },
                data,
                ...options
            });
        } catch (error: any) {
            if (!error.statusCode) error.statusCode = "500";
            throw error;
        }
    }
    async delete (id: string) {
        try {
            return await this.collection.delete({
                where: {
                    id
                }
            });
        } catch (error: any) {
            if (!error.statusCode) error.statusCode = "500";
            throw error;
        }
    }
    async search (query: { [key: string]: string | null; }, options?: { take: number, skip: number, orderBy?: { [key: string]: "asc" | "desc"; }, include?: { [key: string]: boolean; }; }): Promise<T[]> {
        try {
            return await this.collection.findMany({
                where: {
                    ...query
                },
                ...options
            });
        } catch (error: any) {
            if (!error.statusCode) error.statusCode = "500";
            throw error;
        }
    }
    async vagueSearch (query: { [key: string]: string; }, options?: { take?: number, skip?: number, orderBy?: { [key: string]: "asc" | "desc"; }, vague?: boolean, include?: { [key: string]: boolean; }; }): Promise<{ record: T[], count: number, items: number, pages: number, currentPage: number; }> {
        const where = Object.keys(query).length !== 0 ? {
            OR: Object.keys(query).map(key => ({
                [key]: {
                    contains: query[key],
                }
            }))
        } : query;
        try {
            const record = await this.collection.findMany({
                where,
                ...options
            });
            const count = await this.collection.count({
                where
            });
            const items = await this.collection.count();
            const pages = Math.ceil(items / (options?.take || 10));
            const currentPage = Math.floor((options?.skip || 0) / (options?.take || 10)) + 1;

            // Only in this project because Joël doesn't understand proper structure
            for (let i = 0; i < record.length; i++) {
                record[i]._id = record[i].id;
            }
            return {
                record,
                count,
                items,
                pages,
                currentPage,

            };
        } catch (error: any) {
            if (!error.statusCode) error.statusCode = "500";
            throw error;
        }
    }
}
export default Controller;