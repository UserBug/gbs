import xhr from './../xhr';
import querystring from 'querystring';

function createClientModel(path, structure) {
  function ClientModel() {}
  for (let method in structure) {
    structure[method].type = structure[method].type || 'POST';
    structure[method].type = structure[method].type.toLowerCase();
    ClientModel.prototype[method] = function (params) {
      return new Promise((res, rej) => {
        const request = { url:  path + structure[method].path };

        if (params) {
          if (structure[method].type === 'get') {
            request.url += querystring.stringify(params);
          } else {
            request.json = params;
          }
        }

        xhr[structure[method].type](request).then((response) => {
          res(!response.body ? null : (typeof response.body === 'string' ? JSON.parse(response.body) : response.body));
        }).catch((err) => {
          rej(err);
        })
      });
    };
  }
  
  return ClientModel;
}

export default createClientModel;
