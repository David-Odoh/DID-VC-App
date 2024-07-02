import { NextApiRequest, NextApiResponse } from 'next';
import { getPublicKey } from '../../utils';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const publicKey = getPublicKey();
    const did = `did:ethr:${publicKey}`;
    res.status(200).json({ did });
}
