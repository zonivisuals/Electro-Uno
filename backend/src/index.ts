import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import contracAbi from '../src/ElectroUnoABI.json'

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

