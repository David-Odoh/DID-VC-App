import { ethers } from 'ethers';
import  {createVerifiableCredentialJwt} from 'did-jwt-vc';
import { EthrDID } from 'ethr-did';

// Get a new Ethereum public key
export const getPublicKey = () => {
    const wallet = ethers.Wallet.createRandom();
    return wallet.address;
};

// Define the structure of the property
// interface Property {
//     address: string;
//     rent: string;
// }

// Sign a verifiable credential
export const signVC = async (issuer, subject, property) => {
    const wallet = ethers.Wallet.createRandom();
    const ethrDid = new EthrDID({ identifier: wallet.address, privateKey: wallet.privateKey });

    const vcPayload = {
        sub: subject,
        nbf: Math.floor(Date.now() / 1000),
        vc: {
            '@context': ['https://www.w3.org/2018/credentials/v1'],
            type: ['VerifiableCredential', 'PropertyRentalCredential'],
            credentialSubject: {
                property,
            },
        },
    };

    const vcJwt = await createVerifiableCredentialJwt(vcPayload, ethrDid);
    return vcJwt;
};
