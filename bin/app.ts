#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { CloudFrontFunctionStack } from '../lib/stacks/cloud-front-function-stack';

const app = new cdk.App();
new CloudFrontFunctionStack(app, 'CloudFrontFunctionStack');
