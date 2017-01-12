(function(module) {
  var AWS = require('aws-sdk'),
      _ = require('underscore');

  function Machine(instanceId, region) {
    this.instanceId = instanceId;
    this.client = new AWS.EC2({ region: region });

    _.bindAll(this, '_parseStatusResponse');
  }

  var fn = Machine.prototype;

  fn.checkStatus = function() {
    this.client.describeInstanceStatus({
      InstanceIds: [ this.instanceId ]
    }, this._parseStatusResponse);
  };

  fn._parseStatusResponse = function(err, response){
    if (err) {
      console.info(err);
    } else {
      if (response.InstanceStatuses[0]) {
        console.info(response.InstanceStatuses[0].InstanceState.Name)
      } else {
        console.info('nope')
      }
    }
  };


  module.exports = Machine;
})(module);
