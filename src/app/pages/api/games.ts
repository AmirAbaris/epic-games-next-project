import path from 'path';
import fs from 'fs';
import type { NextApiRequest, NextApiResponse } from 'next';

const filePath = path.join(process.cwd(), '/data/game-items.json');

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const jsonData = fs.readFileSync(filePath, 'utf-8');
            const data = JSON.parse(jsonData);
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}