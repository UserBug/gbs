import createServerAPI from '../../modules/model/createServerAPI';
import model from './';

const router = createServerAPI({
  compareFiles: {path: '/compare_files'}
}, model);

export default router;
