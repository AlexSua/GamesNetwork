var server = require('./server');
var ds = server.dataSources.db;
var lbTables = ['Usuario', 'AccessToken', 'ACL', 'RoleMapping', 'Role','Juego','JuegosUsuario'];
// ds.automigrate();
ds.discoverModelDefinitions();
