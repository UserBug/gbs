import {defaults} from 'lodash';
import xhrModule from 'xhr';
import defaultConfig from './defaultConfig';

class xhr {}
for (let method of ['get', 'post', 'put', 'del', 'head']) {
  xhr[method] = function (config) {
    return new Promise((res, rej) => {
      xhrModule[method](defaults({}, config, defaultConfig), (err, resp, body)=>{
        if (err) {
          rej(err);
        } else if (!resp || !resp.statusCode) {
          rej(new Error('xhr: Invalid answer'), resp);
        } else if (resp.statusCode === 200) {
          res({resp, body});
        } else {
          let errorMessage = '';
          if (body) {
            if (body.errors && body.errors instanceof Array && body.errors[0]) {
              errorMessage = String(body.errors[0]);
            } else if (body.error) {
              errorMessage = String(body.error);
            }
          }
          rej(errorMessage);
        }
      })
    });
  }
}

export default xhr;
