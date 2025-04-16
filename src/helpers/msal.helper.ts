//@ts-nocheck

// import { LoggerCore } from '../core';
const { authenticate } = require("ldap-authentication");

const msal: any = require("@azure/msal-node");
const graph = require("@microsoft/microsoft-graph-client");

const msalConfig: any = {
    auth: {
        clientId: process.env.AD_CLIENT,
        clientSecret: process.env.AD_CLIENT_SECRET,
        authority: "https://login.microsoftonline.com/" + process.env.AD_TENANT,
    },
    cache: {
        // cachePlugin
    },
    system: {
        loggerOptions: {
            loggerCallback(loglevel, message, containsPii) {
                console.log("auth logger", message);
            },
            piiLoggingEnabled: false,
            // logLevel: msal.LogLevel.Verbose,
        },
    },
};

export class MsalHelper {
    static async connect(login: string, password: string) {
        try {
            const cca = new msal.ConfidentialClientApplication(msalConfig);
            const usernamePasswordRequest = {
                scopes: ["user.read"],
                username: login,
                password: password,
            };

            try {
                const response = await cca.acquireTokenByUsernamePassword(
                    usernamePasswordRequest,
                );
                return response;
            } catch (error: any) {
                error.statusCode = 400;
                if (error.errorCode === "invalid_grant") {
                    return error.errorCode;
                }
                throw error;
            }
        } catch (error: any) {
            error.statusCode = 400;
            throw error;
        }
    }

    static user(token: string) {
        return new Promise((resolve, reject) => {
            // assuming you have the access token in 'accessToken' variable
            const client = graph.Client.init({
                authProvider: (done) => {
                    done(null, token);
                },
            });

            client
                .api("/me")
                .get()
                .then((user) => {
                    resolve(user);
                })
                .catch((err: any) => {
                    console.log(err);
                    reject(err);
                });
        }).catch((err: any) => {
            // LoggerCore.log({type: 'error', content: err, location: 'MsalHelper', method: 'user'});
            return { error: true, data: err };
        });
    }

    // static auth(login: string, password: string) {
    //   return new Promise(async (resolve, reject) => {
    //     try {
    //       authenticate({
    //         ldapOpts: {
    //           url: process.env.AD_URI,
    //         },
    //         userDn: login,
    //         userPassword: password,
    //         usernameAttribute: process.env.AD_USERNAME_ATTRIBUTE,
    //         username: login.split("@")[0],
    //         userSearchBase: process.env.AD_USER_SEARCH_BASE,
    //       })
    //         .then((data: any) => {
    //           resolve(data);
    //         })
    //         .catch((err: any) => {
    //           if (err.lde_message) {
    //             resolve({ warning: true, data: err });
    //           } else {
    //             reject(err);
    //           }
    //         });
    //     } catch (err: any) {
    //       reject(err);
    //     }
    //   }).catch((err: any) => {
    //     // LoggerCore.log({type: 'error', content: err, location: 'MsalHelper', method: 'auth'})
    //     return { error: true, data: err };
    //   });
    // }
    static async auth(login: string, password: string) {
        try {
            const data = await authenticate({
                ldapOpts: {
                    url: process.env.AD_URI,
                },
                userDn: login,
                userPassword: password,
                usernameAttribute: process.env.AD_USERNAME_ATTRIBUTE,
                username: login.split("@")[0],
                userSearchBase: process.env.AD_USER_SEARCH_BASE,
            });
            return data;
        } catch (err: any) {
            if (err.lde_message) {
                return { warning: true, data: err };
            }
            return { error: true, data: err };
        }
    }
}
