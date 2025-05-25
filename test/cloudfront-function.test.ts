// test/cloudfront-function.test.ts
import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { AppendIndexHtmlFunction, DistributionDomainDeniedFunction } from '../lib/constructs/cloudfront-function';

test('DistributionDomainDeniedFunction Created', () => {
  const app = new cdk.App();
  const stack = new cdk.Stack(app, 'TestStack');

  // 関数を作成
  new DistributionDomainDeniedFunction(stack, 'DomainDenied');

  // テンプレートを検証
  const template = Template.fromStack(stack);
  template.hasResourceProperties('AWS::CloudFront::Function', {
    Name: 'distributionDomainDenied',
    FunctionConfig: {
      Comment: 'Denies access to the default CloudFront distribution domain',
      Runtime: 'cloudfront-js-2.0',
    }
  });
});

test('AppendIndexHtmlFunction Created', () => {
  const app = new cdk.App();
  const stack = new cdk.Stack(app, 'TestStack');

  // 関数を作成
  new AppendIndexHtmlFunction(stack, 'AppendIndex');

  // テンプレートを検証
  const template = Template.fromStack(stack);
  template.hasResourceProperties('AWS::CloudFront::Function', {
    Name: 'appendIndexHtmlToAccessUri',
    FunctionConfig: {
      Comment: 'Appends index.html to URIs that end with / or have no file extension',
      Runtime: 'cloudfront-js-2.0',
    }
  });
});
