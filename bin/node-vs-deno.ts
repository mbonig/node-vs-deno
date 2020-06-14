#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { NodeVsDenoStack } from '../lib/node-vs-deno-stack';

const app = new cdk.App();
new NodeVsDenoStack(app, 'NodeVsDenoStack');
