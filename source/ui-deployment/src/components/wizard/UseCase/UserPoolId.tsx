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

import React from 'react';
import { Input, InputProps, FormField } from '@cloudscape-design/components';
import { updateNumFieldsInError } from '../utils';
import { UserPoolFieldProps, isUserPoolIdValid } from './UserPool';
import { InfoLink } from 'components/commons';
import { TOOLS_CONTENT } from '../tools-content';
const { useCase: useCaseToolsContent } = TOOLS_CONTENT;


export const UserPoolId = (props: UserPoolFieldProps) => {
    const [userPoolIdError, setUserPoolIdError] = React.useState('');

    const onUserPoolIdChange = (detail: InputProps.ChangeDetail) => {
        props.onChangeFn({ userPoolId: detail.value });
        let errors = '';
        if (detail.value.length === 0) {
            errors += 'Required field. ';
        }

        if (!isUserPoolIdValid(detail.value)) {
            errors += 'USER POOL ID is invalid.';
        }
        updateNumFieldsInError(errors, userPoolIdError, props.setNumFieldsInError);
        setUserPoolIdError(errors);
    };

    React.useEffect(() => {
        onUserPoolIdChange({ value: props.userPoolId } as InputProps.ChangeDetail);
    }, []);

    return (
        <FormField
            label={
                <span>
                    Cognito User Pool Id <i>- required</i>{' '}
                </span>
            }
            errorText={userPoolIdError}
            data-testid="user-pool-id-field"
            description="The Id of the Cognito User Pool to be used for the use case."
            info={<InfoLink onFollow={() => props.setHelpPanelContent!(useCaseToolsContent.byoUserPool)} />}
        >
            <Input
                placeholder="Cognito User Pool Id..."
                autoFocus
                value={props.userPoolId}
                onChange={({ detail }) => onUserPoolIdChange(detail)}
                disabled={props.disabled}
                autoComplete={false}
                data-testid="user-pool-id-input"
            />
        </FormField>
    );
};

export default UserPoolId;