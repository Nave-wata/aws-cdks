#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { CloudFrontFunctionStack } from '../lib/stacks/CloudFrontFunctionStack';

const app = new cdk.App();
new CloudFrontFunctionStack(app, 'CloudFrontFunctionStack');
