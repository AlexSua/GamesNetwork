var server = require('./server');
var ds = server.dataSources.db;
var lbTables = ['Usuario', 'AccessToken', 'ACL', 'RoleMapping', 'Role','Juego'];
ds.automigrate(lbTables, function(er) {
  if (er) throw er;
  console.log('Loopback tables [' + lbTables + '] created in ', ds.adapter.name);
  ds.disconnect();
});