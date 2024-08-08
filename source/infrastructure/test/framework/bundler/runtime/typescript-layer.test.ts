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
 *********************************************************************************************************************/

import * as cdk from 'aws-cdk-lib';
import * as s3_assets from 'aws-cdk-lib/aws-s3-assets';
import path from 'path';
import { BundlerAssetOptions } from '../../../../lib/framework/bundler/base-asset-options';
import { TypescriptLayerAssetOptions } from '../../../../lib/framework/bundler/runtime/typescript-layer';
import { BundlerEnvValues } from './setup';

describe('When bundling JS lambda functions', () => {
    let bundlerAssetOption: BundlerAssetOptions;
    let assetOption: s3_assets.AssetOptions;
    let stack: cdk.Stack;
    const fakeModule = 'fake-module';
    const envValues = new BundlerEnvValues();

    beforeAll(() => {
        envValues.backupEnv();
        envValues.deleteEnvValues();
        stack = new cdk.Stack();
        bundlerAssetOption = new TypescriptLayerAssetOptions();
        assetOption = bundlerAssetOption.options(stack, fakeModule);
    });

    afterAll(() => {
        envValues.restoreEnv();
    });

    it('should generate the following commands for a docker build', () => {
        expect(JSON.stringify(assetOption.bundling?.command)).toBe(
            JSON.stringify([
                'bash',
                '-c',
                `echo "Executing unit tests" && npm install && npm run test && echo "local bundling failed for ${path.dirname(__dirname).split('/').slice(0, -3).join('/')}/${fakeModule} and hence building with Docker image" && rm -fr /asset-input/node_modules && mkdir -p /asset-output/nodejs && npm install && npm run build && rm -fr ./node_modules && npm ci --omit=dev && mkdir -p /asset-output/nodejs && cp -au /asset-input/node_modules /asset-output/nodejs/ && mkdir -p /asset-output/nodejs/node_modules/fake-module && cp -au /asset-input/dist/* /asset-output/nodejs/node_modules/fake-module/ && rm -fr /asset-output/.coverage`
            ])
        );
    });

    it('should generate the following commands for a local build', () => {
        const jsLocalBuild = (bundlerAssetOption as any).localBuild;
        expect(JSON.stringify(jsLocalBuild.bundle(stack, fakeModule, 'fake-output-dir'))).toBe(
            JSON.stringify([
                'echo "Executing unit tests"',
                'cd fake-module',
                'npm install',
                'npm run test',
                'echo local bundling fake-module',
                'cd fake-module',
                'rm -fr node_modules',
                'rm -fr dist',
                'npm install',
                'npm run build',
                'rm -fr ./node_modules',
                'npm ci --omit=dev',
                'mkdir -p fake-output-dir/nodejs',
                'cp -R fake-module/node_modules fake-output-dir/nodejs/',
                'mkdir -p fake-output-dir/nodejs/node_modules/fake-module',
                'cp -R fake-module/dist/* fake-output-dir/nodejs/node_modules/fake-module/',
                'rm -fr fake-output-dir/.coverage'
            ])
        );
    });
});
