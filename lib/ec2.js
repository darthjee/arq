(function(module) {
  var AWS = require('aws-sdk');

  function EC2(config) {
    this.client = new AWS.EC2(config);
  }

  var fn = EC2.prototype;

  fn.checkStatus = function() {
    this.client.describeInstanceStatus({}, function(){
      console.info(arguments)
    });
  };

  module.exports = EC2;
})(module);
