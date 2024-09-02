import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { readFile } from '../patrimoine-economique/data/data';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000;

app.get('/api/possessions', async (req, res) => {
    const dataPath = path.join(__dirname, './data/data.json');
    const result = await readFile(dataPath);
    
    if (result.status === "OK") {
        res.json(result.data);
    } else {
        res.status(500).json({ error: "Error reading data" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
