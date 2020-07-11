# Node vs Deno runtime tester

This is a small CDK module that creates infrastructure in AWS to test Node vs Deno performance in Lambda functions.

## Pre-req's

You'll need to install [this](https://github.com/hayd/deno-lambda) Lambda layer and provide the resulting ARN in the 
next step.

## To Run

```shell script
$ npm i
$ npm run build:deno
$ npm run build:deno:remap
$ npm run cdk deploy -c denoLambdaLayer=arn:aws:lambda:us-east-1:1234567890123:layer:deno:1"
```

The `build:deno` grabs dependencies for packaging and the `build:deno:remap` sets a remapping folder per the 
Lambda Layer [instructions](https://github.com/hayd/deno-lambda#deno_dir-remapping). 

Invoke the Lambda provided by the Output of the stack, providing an event that follows this shape:

```json
{
  "timeToRun": 5000,
  "delay": 100
}
```

Where timeToRun and delay are both expressed in milliseconds. In the example, the Node and Deno Lambda function will
each be called every 100ms for 5 seconds (for a total of 50 times each). Be mindful that if you make the rate too fast
you risk running over your provisioned throughput on the DynamoDB table.

## The Blog

Read more about this at [my blog](https://matthewbonig.com/2020/07/05/deno-vs-node/).
