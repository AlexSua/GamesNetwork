'use strict';


module.exports = function (Juego) {
  // Juego.disableRemoteMethod('find', true);


  Juego.find = function (cb) {
    let response = [{"id":1},{"id":2}];
    cb(null,response);
  };

  // Juego.once('attached',function(){
  //
  //   Juego.find2 =  Juego.find;
  //   Juego.find = function (query,options,cb) {
  //     let response = [{"id":1},{"id":2}];
  //     Juego.find2(query,options,cb);
  //   };
  // });

  Juego.remoteMethod(
    'find', {
      http: {
        path: '/',
        verb: 'get'
      },
      returns: {
        arg: 'juegos',
        type: 'array'
      }
    }
  );
};
