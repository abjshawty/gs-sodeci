export class Define {
    static defaultPort: number = 3003
    static clientSuccessCode: number = 200
    static clientErrorCode: number = 422
    static systemErrorCode: number = 500
    static apiAuthorisationErrorCode: number = 401
    static badRequestErrorCode: number = 400
    static notfoundErrorCode: number = 404

    static errorTryCatchMessage: string = "Une erreur inattendue s'est produite."
    static DEBUG: string = "debug"
    static PROD: string = "production"
}