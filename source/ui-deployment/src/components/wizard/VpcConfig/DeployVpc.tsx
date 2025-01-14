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

import { FormField, RadioGroup, RadioGroupProps } from '@cloudscape-design/components';
import { InfoLink } from '@/components/commons';
import { VpcFormFieldProps, vpcToolsContent } from './helpers';
import { getBooleanString } from '../utils';

export const DeployVpc = (props: VpcFormFieldProps) => {
    const onDeployVpcChange = (detail: RadioGroupProps.ChangeDetail) => {
        const isVpcRequired = detail.value === 'Yes';

        if (!isVpcRequired) {
            props.onChangeFn({ isVpcRequired: isVpcRequired, inError: false });
        } else {
            props.onChangeFn({ isVpcRequired: isVpcRequired });
        }
    };

    return (
        <FormField
            label="Do you want to deploy this use case with a VPC?"
            info={
                <InfoLink
                    onFollow={() => props.setHelpPanelContent!(vpcToolsContent.default)}
                    ariaLabel={'Information about deploying use case in a VPC'}
                />
            }
            stretch={true}
            data-testid="deploy-in-vpc-field"
            description="Deploy the use case in a virtual private cloud (VPC)."
        >
            <RadioGroup
                onChange={({ detail }) => onDeployVpcChange(detail)}
                items={[
                    {
                        value: 'Yes',
                        label: 'Yes'
                    },
                    {
                        value: 'No',
                        label: 'No'
                    }
                ]}
                value={getBooleanString(props.vpcData.isVpcRequired)}
                data-testid="deploy-in-vpc-radio-group"
            />
        </FormField>
    );
};

export default DeployVpc;
