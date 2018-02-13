'use strict';
var Request = require('request');

module.exports = function (Juegousuario) {

  Juegousuario.observe("before save", function (ctx, next) {

    let app = Juegousuario.app;
    let Juego = app.models.Juego;
    let idJuego = ctx.instance.idJuego;

    Juego.exists(idJuego, function (err, exists) {
      if (exists) {
        next();

      } else {
        const requestPromise = new Promise((resolve, reject) => {
          const options = {
            url: `https://api-2445582011268.apicast.io/games/${idJuego}?fields=id,name,cover,popularity,total_rating,first_release_date,summary`,
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

        requestPromise.then(data => {

          let json = JSON.parse(data)[0];
          Juego.create({
            "id": json.id,
            "nombre": json.name,
            "ano": json.first_release_date?first_release_date:null,
            "resumen": json.summary ? json.summary : "",
            "urlImagen": json.cover ? json.cover.url.replace("t_thumb", "t_1080p") : "",
            "valoracionIgdb": json.total_rating ? json.total_rating : "",
            "popularidadIgdb": json.popularity ? json.popularity : ""
          }, function (err, obj) {
            if (err)
              next(err);
            else
              next();
          });
        }).catch(err => {
          const customErr = new Error('No se puede obtener ese juego. Sorry bro ;)');
          customErr.status = 504;
          next(customErr);
        });
      }
    });
  });
}

