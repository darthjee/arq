(function(module) {
  var AWS = require('aws-sdk');

  function Machine(instanceId, region) {
    this.instanceId = instanceId;
    this.client = new AWS.EC2({ region: region });
  }

  var fn = Machine.prototype;

  fn.checkStatus = function() {
    this.client.describeInstanceStatus({
      InstanceIds: [ this.instanceId ]
    }, function(err, response){
      if (err) {
        console.info(err);
      } else {
        if (response.InstanceStatuses[0]) {
          console.info(response.InstanceStatuses[0].InstanceState.Name)
        } else {
          console.info('nope')
        }
      }
    });
  };

  module.exports = Machine;
})(module);
