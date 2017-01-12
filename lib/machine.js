(function(module) {
  var AWS = require('aws-sdk');

  function Machine(config) {
    this.client = new AWS.EC2(config);
  }

  var fn = Machine.prototype;

  fn.checkStatus = function() {
    this.client.describeInstanceStatus({}, function(){
      console.info(arguments[1].InstanceStatuses[0].InstanceState.Name)
    });
  };

  module.exports = Machine;
})(module);
