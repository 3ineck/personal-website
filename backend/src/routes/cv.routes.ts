import { Router } from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cvPath = path.resolve(__dirname, '../../assets/cv.pdf');

export const cvRouter = Router();

cvRouter.get('/', (_req, res, next) => {
  if (!fs.existsSync(cvPath)) {
    return res.status(404).json({ error: 'CV file not found' });
  }
  res.download(cvPath, 'Raphael_Eineck_CV.pdf', (err) => {
    if (err) next(err);
  });
});
