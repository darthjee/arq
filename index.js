(function(module, env) {
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
