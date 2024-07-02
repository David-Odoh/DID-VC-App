'use client'

import { useState } from 'react';
import { ethers } from 'ethers';

interface VC {
    address: string;
    rent: string;
}

export default function Home() {
    const [did, setDid] = useState<string>('');
    const [vc, setVc] = useState<string>('');

    const requestDID = async () => {
        const response = await fetch('/api/did', {
            method: 'GET',
        });
        const data = await response.json();
        setDid(data.did);
    };

    const issueVC = async () => {
        const issuer = did; 
        const subject = did; 
        const property: VC = { address: '14 Any St', rent: '1000 USD/month' };

        try {
            const response = await fetch('/api/vc', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ issuer, subject, property }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            setVc(data.vc);
        } catch (error) {
            console.error('Error issuing VC:', error);
        }
    };

    const sendVC = async () => {
        if (!(window as any).ethereum) {
            alert('MetaMask is not installed!');
            return;
        }

        await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.providers.Web3Provider((window as any).ethereum);
        const signer = await provider.getSigner();
        const recipientAddress = process.env.NEXT_PUBLIC_SENDER_ADDRESS; 
        await signer.sendTransaction({
            to: recipientAddress,
            value: ethers.utils.parseEther('0'),
            data: ethers.utils.hexlify(ethers.utils.toUtf8Bytes(vc)),
        });
    };

    return (
        <div>
            <h1>Property Rental DID & VC Application</h1>
            <button style={{'border': '1px solid'}} className='px-2 mt-2' onClick={requestDID}>Create DID</button>
            <p>DID: {did}</p>

            <button style={{'border': '1px solid'}} className='px-2 mt-2' onClick={issueVC}>Issue VC</button>
            <p>VC: {vc}</p>

            <button style={{'border': '1px solid'}} className='px-2 mt-2' onClick={sendVC}>Send VC via MetaMask</button>
        </div>
    );
}
