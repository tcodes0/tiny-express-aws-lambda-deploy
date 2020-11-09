import * as cdk from '@aws-cdk/core'
import * as lambda from '@aws-cdk/aws-lambda'
import * as apigateway from '@aws-cdk/aws-apigateway'
import * as cloudfront from '@aws-cdk/aws-cloudfront'
import * as path from 'path'

export class CdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    // lambda
    const fn = new lambda.Function(this, 'MyLambda', {
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: 'index.index.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, '../build'), {
        exclude: ['cdk'],
      }),
    })

    // ApiGW
    const apigw = new apigateway.LambdaRestApi(this, 'MyApi', {
      handler: fn,
      proxy: true,
    })

    // CF
    const feCf = new cloudfront.CloudFrontWebDistribution(this, 'MyCf', {
      defaultRootObject: '/',
      originConfigs: [
        {
          customOriginSource: {
            domainName: `${apigw.restApiId}.execute-api.${this.region}.${this.urlSuffix}`,
          },
          originPath: '/' + apigw.deploymentStage.stageName,
          behaviors: [
            {
              isDefaultBehavior: true,
            },
          ],
        },
      ],
      enableIpV6: true,
    })

    // Output
    new cdk.CfnOutput(this, 'myOut', {
      value: feCf.domainName,
    })
  }
}

const app = new cdk.App()
new CdkStack(app, 'CdkStack')
