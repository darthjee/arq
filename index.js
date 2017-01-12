var region = process.env.AWS_REGION,
    instanceId = process.env.INSTANCE_ID,
    Machine = require('./lib/machine');

var machine = new Machine(instanceId, region);

machine.toggleState();
