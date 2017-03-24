import express from 'express';
import homeApi from '../models/home/api';

const router = new express.Router()
  .use('/load_file', homeApi);

export default router;
