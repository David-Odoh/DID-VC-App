import express from 'express';
import { getPublicKey, signVC } from './utils.js';

const app = express();
app.use(express.json());

app.get('/api/', (req, res) => {
    res.send('Welcome')
});

app.get('/api/did', (req, res) => {
    const publicKey = getPublicKey();
    const did = `did:ethr:${publicKey}`;
    res.json({ did });
});

app.post('/api/vc', async (req, res) => {
    const { issuer, subject, property } = req.body;
    const vc = await signVC(issuer, subject, property);
    res.json({ vc });
});

app.listen(3001, () => {
    console.log('Server is running on http://localhost:3001');
});
