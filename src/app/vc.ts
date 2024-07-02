import { NextApiRequest, NextApiResponse } from 'next';
import { signVC } from '../../utils';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { issuer, subject, property } = req.body;
    const vc = await signVC(issuer, subject, property);
    res.status(200).json({ vc });
}
