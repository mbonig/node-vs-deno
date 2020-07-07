#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { NodeVsDenoStack } from '../lib/node-vs-deno-stack';

const app = new cdk.App();
const denoLambdaLayer = app.node.tryGetContext('denoLambdaLayer');
if (!denoLambdaLayer){
  throw new Error("Please provide a denoLambdaLayer arn, the result of installing this Deno Lambda Runtime Layer: https://github.com/hayd/deno-lambda")
}

new NodeVsDenoStack(app, 'NodeVsDenoStack',{denoLambdaLayer});
