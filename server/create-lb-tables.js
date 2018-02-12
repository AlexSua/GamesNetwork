var server = require('./server');
var ds = server.dataSources.db;
ds.automigrate();
// ds.discoverModelDefinitions();
