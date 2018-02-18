'use strict';

module.exports = function(Usuario) {

    // Usuario.once('attached',function(){
    //     Usuario.find=function (query,options,cb){
    //         let app = Usuario.app;
    //         let JuegoUsuario = app.models.JuegoUsuario;
    //         JuegoUsuario.find({
    //             where:{idUsuario:1},
    //             include:{
    //                 relation:"juego"
    //             }
    //         },function(err,data){
    //             console.log(err,data);
    //         })
    //     }
    // })


 //Metodos no usados
 Usuario.disableRemoteMethodByName('createChangeStream');
};
