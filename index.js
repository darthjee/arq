(function(module, env) {
  env.AWS_ACCESS_KEY_ID = env.ACCESS_KEY_ID;
  env.AWS_SECRET_ACCESS_KEY = env.SECRET_ACCESS_KEY;

  var region = env.REGION,
      instanceId = process.env.INSTANCE_ID,
      Machine = require('./lib/machine');

  module.exports = {
    handler: function() {
      var machine = new Machine(instanceId, region);
      machine.toggleState();
    }
  };
})(module, process.env);
