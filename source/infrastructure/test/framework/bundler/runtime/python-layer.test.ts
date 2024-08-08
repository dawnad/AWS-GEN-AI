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
import { PythonLayerAssetOptions } from '../../../../lib/framework/bundler/runtime/python-layer';
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
        bundlerAssetOption = new PythonLayerAssetOptions();
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
                `echo "Executing unit tests" && python3 -m venv .venv-test && source .venv-test/bin/activate && pip install poetry && poetry install && poetry run pytest --cov --cov-report=term-missing && deactivate && echo "local bundling failed for ${path.dirname(__dirname).split('/').slice(0, -3).join('/')}/${fakeModule} and hence building with Docker image" && rm -fr .venv* && rm -fr dist && rm -fr .coverage && rm -fr coverage && python3 -m pip install poetry --upgrade && poetry build && poetry install --only main && poetry run pip install -t /asset-output/python/ dist/*.whl && find /asset-output | grep -E "(/__pycache__$|.pyc$|.pyo$|.coverage$)" | xargs rm -rf`
            ])
        );
    });

    it('should generate the following commands for a local build', () => {
        const localBuild = (bundlerAssetOption as any).localBuild;
        expect(JSON.stringify(localBuild.bundle(stack, fakeModule, 'fake-output-dir'))).toBe(
            JSON.stringify([
                'cd fake-module',
                'echo "Executing unit tests"',
                'python3 -m venv .venv-test',
                'source .venv-test/bin/activate',
                'pip install poetry',
                'poetry install',
                'poetry run pytest --cov --cov-report=term-missing',
                'deactivate',
                'echo local bundling fake-module',
                'cd fake-module',
                'rm -fr .venv*',
                'rm -fr dist',
                'rm -fr coverage',
                'rm -fr .coverage',
                'python3 -m venv .venv',
                '. .venv/bin/activate',
                'python3 -m pip install poetry --upgrade',
                'poetry build',
                'poetry install --only main',
                'cd fake-module',
                'poetry run pip install -t fake-output-dir/python/ dist/*.whl',
                'deactivate',
                'find fake-output-dir | grep -E "(/__pycache__$|.pyc$|.pyo$|.coverage$|dist$|.venv*$)" | xargs rm -rf',
                'rm -fr fake-output-dir/requirements.txt'
            ])
        );
    });
});