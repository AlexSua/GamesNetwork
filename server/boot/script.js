module.exports = function (server) {
  let User = server.models.Usuario;
  let Role = server.models.Role;
  let RoleMapping = server.models.RoleMapping;

  User.create(
    {username: 'admin', email: 'admin@gamesnetwork.es', password: 'admin'}
    , function (err, user) {
      if (err) return console.log('%j', err);

      Role.create({name: 'admin'}, function (err, role) {

        if (err) return console.log(err);

        console.log(role);

        // Make admin an admin
        role.principals.create({
          principalType: RoleMapping.USER,
          principalId: user.id
        }, function (err, principal) {
          if (err) return console.log(err);
          console.log(principal);
        });
      });
    });

}
