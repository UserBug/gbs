import express from 'express';

// eslint-disable-next-line no-unused-vars
let structure = {
  getData: { // Method name of model
    type: 'GET', // Request type, POST by default
    path: '/get_data', // Path to method /section/api/model/get_data
  }
};

function getParamsFromBody(req) {
  let params = undefined;
  if (req.json) {
    params = req.json;
  } else if (req.body) {
    if (typeof req.body === 'string') {
      try {
        params = JSON.parse(req.body);
      } catch (err) {
        throw {parse:'Cant parse request body'};
      }
    } else {
      params = req.body;
    }
  }
  return params;
}

function catchFunction(res, err) {
  const code = err.status || err.statusCode || 500;
  let errors;
  errors = [String(err)];
  res.status(code).send(JSON.stringify({errors}));
}

function createRouterFunction(modelFunction) {
  const fn = (req, res, next) => {
    let params;
    try {
      params = getParamsFromBody(req);
    } catch (err) {
      res.status(400).send(JSON.stringify({err}));
    }

    modelFunction(params, req, res, next).then((result) => {
      res.status(200).send(result ? JSON.stringify(result) : '');
    }).catch(catchFunction.bind(null, res))
  };

  return fn;
}

function createServerAPI(structure, model) {
  const router = express();
  
  for (let method in structure) {
    if (typeof model[method] !== 'function') {
      throw new Error(
        'createServerAPI: Method "' + method +'" from structure not found in model "' + model.constructor.name + '"'
      );
    }
    structure[method].type = structure[method].type || 'POST';
    structure[method].type = structure[method].type.toLowerCase();
    router[structure[method].type](
      structure[method].path, createRouterFunction(model::model[method])
    );
  }
  
  return router;
}

export {
  createServerAPI as default,
  createServerAPI,
  createRouterFunction
};
