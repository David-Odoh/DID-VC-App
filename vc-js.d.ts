declare module 'vc-js' {
    import { DIDDocument } from 'did-resolver';

    interface JwtCredentialPayload {
        sub: string;
        nbf: number;
        vc: {
            '@context': string[];
            type: string[];
            credentialSubject: {
                [key: string]: any;
            };
        };
    }

    interface CreateVerifiableCredentialOptions {
        documentLoader?: (url: string) => any;
        suite?: any;
        [key: string]: any;
    }

    interface VerifyVerifiableCredentialOptions {
        documentLoader?: (url: string) => any;
        suite?: any;
        [key: string]: any;
    }

    function createVerifiableCredentialJwt(
        payload: JwtCredentialPayload,
        issuer: any,
        options?: CreateVerifiableCredentialOptions
    ): Promise<string>;

    function verifyCredential(
        credential: any,
        options?: VerifyVerifiableCredentialOptions
    ): Promise<{ verified: boolean, results: any[], error?: any }>;
}
