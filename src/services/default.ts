import bcrypt from "bcryptjs";
import { client } from "../db";
import { Organisation, Profil, Role, Societe, User } from "../services";
/**
 * Default service with initialization logic that runs once at app startup
 */

let initialized = false;

/**
 * Initialization function that runs once at app startup
 * @returns {Promise<void>}
 */
export async function init (): Promise<void> {
  if (initialized) {
    console.log('Service already initialized');
    return;
  }



  try {
    console.log('Initializing default service...');
    // Add your one-time initialization logic here
    const organisationService = Organisation;
    const profileService = Profil;
    const rolesService = Role;
    const societeService = Societe;
    const usersService = User;
    const adminOrganisation = await organisationService.findOne({ name: 'admin' });
    const adminProfile = await profileService.findOne({ id: 'default' });
    const adminRole = await rolesService.findOne({ name: 'admin' });
    const sodSociete = await societeService.findOne({ name: "SODECI" });
    const adminUser = await usersService.getById("default");

    if (!sodSociete) {
      console.log("Creating default society...");
      await societeService.createDefault({
        id: "6716a3b27bf781b53b3edaac",
        slug: "SOD",
        name: "SODECI",
        code: "SOD",
        status: "active",
        userId: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    if (!adminOrganisation) {
      console.log("Creating default organisation...");
      await organisationService.createDefault({
        id: "default",
        name: "admin",
        status: "active",
        societyId: "6716a3b27bf781b53b3edaac",
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: null
      });
    }
    if (!adminRole) {
      console.log('Creating default admin role...');
      await rolesService.createDefault({
        name: 'admin',
        status: 'active',
        userId: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        id: "default"
      });
    }
    if (!adminProfile) {
      console.log("Creating default profile...");
      await profileService.createDefault({
        id: "default",
        isDefault: true,
        organisationId: "default",
        roleId: "default",
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
    if (!adminUser) {
      console.log('Creating default admin user...');
      const password = await client.password.create({
        data: {
          value: bcrypt.hashSync("p@SSw0*r;Jod24", 10),
          createdAt: new Date(),
          updatedAt: new Date()
        }
      });
      await client.user.create({
        data: {
          email: 'admin@super.com',
          firstname: 'Admin',
          lastname: 'Default',
          passwordId: password.id,
          roleId: 'default',
          status: 'active',
          isEmailConfirmed: true,
          profileId: 'default',
          userId: 'default',
          id: "default",
          matricule: null,
          lastLoginDate: new Date(),
          createdAt: new Date(),
          updatedAt: new Date()
        }
      });
    }


    initialized = true;
    console.log('Default service initialized successfully');
  } catch (error) {
    console.error('Failed to initialize default service:', error);
    throw error;
  }
}

// Export the initialization state for testing or other purposes
export const isInitialized = (): boolean => initialized;
