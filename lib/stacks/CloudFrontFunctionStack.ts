import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { AppendIndexHtmlFunction, DistributionDomainDeniedFunction } from '../constructs/cloudfront-function';

export class CloudFrontFunctionStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // 特化クラスを使用してCloudFront Functionsを作成
    const domainDeniedFn = new DistributionDomainDeniedFunction(this, 'DomainDenied');
    const appendIndexFn = new AppendIndexHtmlFunction(this, 'AppendIndex');

    // 関数のARNを出力に追加
    new cdk.CfnOutput(this, 'DomainDeniedFunctionArn', {
      value: domainDeniedFn.function.functionArn,
      description: 'Domain Denied Function ARN',
    });
    new cdk.CfnOutput(this, 'AppendIndexFunctionArn', {
      value: appendIndexFn.function.functionArn,
      description: 'Append Index Function ARN',
    });
  }
}
