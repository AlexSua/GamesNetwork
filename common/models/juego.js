'use strict';

var Request = require('request');

module.exports = function (Juego) {
  // Juego.disableRemoteMethod('find', true);

  //
  // Juego.find = function (cb) {
  //   let response = [{"id":1},{"id":2}];
  //   cb(null,response);
  // };


  Juego.igdb = function (name, page, callback) {


    const requestPromise = new Promise((resolve, reject) => {

      if (!page || page === "" || page <= 1) {
        page = 1;
      }
      let off = page - 1;
      let offset = off * 50;
      const options = {
        url: `https://api-2445582011268.apicast.io/games/?search=${name}&limit=50&fields=id,name,cover&limit=50&offset=${offset}`,
        headers: {
          'User-Agent': 'request',
          'Accept': 'application/json',
          'user-key': '6493ce9732b3569e2bab672142a06ae6'
        }
      };

      Request.get(options, (error, response, body) => {
        if (error) {
          reject(error);
        } else if (response.statusCode && response.statusCode === 500) {
          return reject(response.statusCode);
        } else {
          resolve(body);
        }
      });

    });

    return requestPromise.then(data => {
      let array = [];
      array = JSON.parse(data);
      let nextPage = (+page) + (+1);
      let url = "/juegos/igdb?name=" + name + "&page=" + nextPage;
      if (array.length < 50) {
        url = "";
      };
      return callback(null, array, url);
    })
      .catch(err => {
        const customErr = new Error('No funciona');
        customErr.status = 504;
        return callback(customErr);
      });
  };


  // Juego.once('attached',function(){
  //
  //   Juego.find2 =  Juego.find;
  //   Juego.find = function (query,options,cb) {
  //     let response = [{"id":1},{"id":2}];
  //     Juego.find2(query,options,cb);
  //   };
  // });
  //
  // Juego.remoteMethod(
  //   'find', {
  //     http: {
  //       path: '/',
  //       verb: 'get'
  //     },
  //     returns: {
  //       arg: 'juegos',
  //       type: 'array'
  //     }
  //   }
  // );

  Juego.remoteMethod(
    'igdb', {
      http: {path: '/IGDB', verb: 'get'},
      accepts: [{arg: 'name', type: 'string', http: {source: 'query'}},
        {arg: 'page', type: 'number', http: {source: 'query'}}],
      returns: [{arg: 'juegos', type: 'array'}, {arg: 'paginaSiguiente', type: 'string'}]
    }
  );
};
