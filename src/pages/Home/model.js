import createClientModel from '../../modules/model/createClientModel';

const model = new (createClientModel('/api/load_file', {
  compareFiles: {path: '/compare_files'}
}))();

export default model;
