/**********************************************************************************************************************
 *  Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.                                                *
 *                                                                                                                    *
 *  Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance    *
 *  with the License. A copy of the License is located at                                                             *
 *                                                                                                                    *
 *      http://www.apache.org/licenses/LICENSE-2.0                                                                    *
 *                                                                                                                    *
 *  or in the 'license' file accompanying this file. This file is distributed on an 'AS IS' BASIS, WITHOUT WARRANTIES *
 *  OR CONDITIONS OF ANY KIND, express or implied. See the License for the specific language governing permissions    *
 *  and limitations under the License.                                                                                *
 **********************************************************************************************************************/
import * as cdk from 'aws-cdk-lib';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';
import { StaticWebsite } from './static-site';

export class UIDistribution extends cdk.NestedStack {
    /**
     * The bucket in which the website will be hosted
     */
    public websiteBucket: s3.Bucket;

    /**
     * The CloudFront distribution for the website
     */
    public cloudFrontDistribution: cloudfront.Distribution;

    constructor(scope: Construct, id: string, props: cdk.NestedStackProps) {
        super(scope, id, props);

        const accessLoggingBucket = new cdk.CfnParameter(cdk.Stack.of(this), 'AccessLoggingBucketArn', {
            type: 'String',
            allowedPattern: '^arn:(aws|aws-cn|aws-us-gov):s3:::\\S+$',
            description: 'Arn of the S3 bucket to use for access logging.'
        });

        const customResourceLambdaArn = new cdk.CfnParameter(cdk.Stack.of(this), 'CustomResourceLambdaArn', {
            type: 'String',
            allowedPattern: '^arn:(aws|aws-cn|aws-us-gov):lambda:\\S+:\\d{12}:function:\\S+$',
            description: 'Arn of the Lambda function to use for custom resource implementation.'
        });

        const customResourceRoleArn = new cdk.CfnParameter(cdk.Stack.of(this), 'CustomResourceRoleArn', {
            type: 'String',
            allowedPattern: '^arn:(aws|aws-cn|aws-us-gov):iam::\\S+:role/\\S+$',
            description: 'Arn of the IAM role to use for custom resource implementation.'
        });

        // this will be in a separate stack
        const staticWebsite = new StaticWebsite(this, 'Website', {
            accessLoggingBucket: s3.Bucket.fromBucketArn(
                this,
                'AccessLoggingBucket',
                accessLoggingBucket.valueAsString
            ),
            customResourceLambdaArn: customResourceLambdaArn.valueAsString,
            customResourceRoleArn: customResourceRoleArn.valueAsString,
            cloudFrontUUID: this.getUUID()
        });
        this.websiteBucket = staticWebsite.webS3Bucket;
        this.cloudFrontDistribution = staticWebsite.cloudfrontDistribution;

        // create cdk cfn output for the website bucket arn
        new cdk.CfnOutput(this, 'WebAssetsBucketArn', {
            value: this.websiteBucket.bucketArn
        });
    }

    public getUUID(): string {
        const useCaseUUID = new cdk.CfnParameter(cdk.Stack.of(this), 'UseCaseUUID', {
            type: 'String',
            description: 'UUID to identify this deployed use case within an application',
            allowedPattern: '^[0-9a-fA-F]+$',
            constraintDescription: 'Please provide an 8 character long UUID'
        }).valueAsString;

        return useCaseUUID;
    }
}
