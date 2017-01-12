(function(module) {
  var AWS = require('aws-sdk'),
      _ = require('underscore');

  function Machine(instanceId, region) {
    this.instanceId = instanceId;
    this.client = new AWS.EC2({ region: region });

    _.bindAll(this, '_parseStatusResponse', '_parseState');
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
        this._parseState(response.InstanceStatuses[0].InstanceState.Name);
      } else {
        this._parseState('stopped');
      }
    }
  };

  fn._parseState = function(state) {
    console.info(state);
    if (state == 'running') {
      this.shutdown();
    } else {
      this.start();
    }
  };

  fn.shutdown = function() {};
  fn.start = function() {};
  fn.toggleState = function() {};

  module.exports = Machine;
})(module);
