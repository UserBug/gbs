import compareText from '../../modules/compareText';

class LoadFileModel {
  async compareFiles(params) {
    return {
      rows: compareText(params.firstFile || '', params.secondFile || '')
    }
  }
}

export default new LoadFileModel();
