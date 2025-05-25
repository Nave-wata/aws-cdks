import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import { Construct } from 'constructs';

/**
 * CloudFront Function ベースコンストラクタ
 */
abstract class CloudFrontFunctionBase extends Construct {
  public readonly function: cloudfront.Function;

  protected constructor(scope: Construct, id: string, props: {
    filePath: string;
    functionName?: string;
    comment?: string;
    runtime?: cloudfront.FunctionRuntime,
  }) {
    super(scope, id);

    this.function = new cloudfront.Function(this, 'Function', {
      code: cloudfront.FunctionCode.fromFile({
        filePath: props.filePath,
      }),
      functionName: props.functionName,
      comment: props.comment,
      runtime: props.runtime || cloudfront.FunctionRuntime.JS_2_0,
    });
  }
}

/**
 * CloudFront Function コンストラクタ
 *
 * CloudFront が割り当てるドメインに対してアクセスできないようにする（403 ステータスコード）
 */
export class DistributionDomainDeniedFunction extends CloudFrontFunctionBase {
  constructor(scope: Construct, id: string) {
    super(scope, id, {
      filePath: 'lib/functions/cloudfront/distribution-domain-denied.js',
      functionName: 'distributionDomainDenied',
      comment: 'Denies access to the default CloudFront distribution domain',
    });
  }
}

/**
 * CloudFront Function コンストラクタ
 *
 * URI の末尾に index.html をつける
 */
export class AppendIndexHtmlFunction extends CloudFrontFunctionBase {
  constructor(scope: Construct, id: string) {
    super(scope, id, {
      filePath: 'lib/functions/cloudfront/append-index-html-to-access-uri.js',
      functionName: 'appendIndexHtmlToAccessUri',
      comment: 'Appends index.html to URIs that end with / or have no file extension',
    });
  }
}