(function(module) {
  var AWS = require('aws-sdk'),
      _ = require('underscore');

  function Machine(instanceId, region) {
    this.instanceId = instanceId;
    this.client = new AWS.EC2({ region: region });

    _.bindAll(this, '_buildStatusResponseParser', '_parseState', 'shutdown', 'start');
  }

  var fn = Machine.prototype;
  fn._checkStatus = function(callback) {
    this.client.describeInstanceStatus({
      InstanceIds: [ this.instanceId ]
    }, callback);
  };

  fn._buildStatusResponseParser = function(callback) {
    return function(err, response) {
      if (err) {
        console.info(err);
      } else {
        if (response.InstanceStatuses[0]) {
          callback(response.InstanceStatuses[0].InstanceState.Name);
        } else {
          callback('stopped');
        }
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

  fn.shutdown = function() {
    console.info('stopping');
    this.client.stopInstances({
      InstanceIds: [ this.instanceId ]
    });
  };

  fn.start = function() {
    console.info('starting');
    this.client.startInstances({
      InstanceIds: [ this.instanceId ]
    });
  };

  fn.toggleState = function() {
    this._checkStatus(
      this._buildStatusResponseParser(this._parseState)
    );
  };

  module.exports = Machine;
})(module);
