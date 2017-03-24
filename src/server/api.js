import express from 'express';
import loadFileApi from './../models/loadFile/api';

const router = new express.Router()
  .use('/load_file', loadFileApi);

export default router;
