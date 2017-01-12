(function(module) {
  var AWS = require('aws-sdk'),
      _ = require('underscore');

  function Machine(instanceId, region) {
    this.instanceId = instanceId;
    this.client = new AWS.EC2({ region: region });
    this.filters = { InstanceIds: [ this.instanceId ] };

    _.bindAll(this, '_buildStatusResponseParser', '_parseState', 'shutdown', 'start', '_debug');
  }

  var fn = Machine.prototype;
  fn._checkStatus = function(callback) {
    this.client.describeInstanceStatus(
      this.filters,
    callback);
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
    this.client.stopInstances(this.filters, this._debug);
  };

  fn.start = function() {
    console.info('starting');
    this.client.startInstances(this.filters, this._debug);
  };

  fn.toggleState = function() {
    this._checkStatus(
      this._buildStatusResponseParser(this._parseState)
    );
  };

  fn._debug = function(err, response) {
    console.info(response);
  };

  module.exports = Machine;
})(module);
