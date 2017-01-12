var region = process.env.AWS_REGION,
    EC2 = require('./lib/ec2');

var ec2 = new EC2({
  region: region
});

ec2.checkStatus();
