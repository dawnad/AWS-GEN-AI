"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.metrics = exports.logger = exports.tracer = void 0;
const logger_1 = require("@aws-lambda-powertools/logger");
const metrics_1 = require("@aws-lambda-powertools/metrics");
const tracer_1 = require("@aws-lambda-powertools/tracer");
const constants_1 = require("./utils/constants");
const serviceName = { serviceName: 'UseCaseManagement' };
exports.tracer = new tracer_1.Tracer(serviceName);
exports.logger = new logger_1.Logger(serviceName);
exports.metrics = new metrics_1.Metrics({
    namespace: constants_1.CloudWatchNamespace.USE_CASE_DEPLOYMENTS,
    serviceName: serviceName.serviceName
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG93ZXItdG9vbHMtaW5pdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3Bvd2VyLXRvb2xzLWluaXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozt3SEFXd0g7OztBQUV4SCwwREFBdUQ7QUFDdkQsNERBQXlEO0FBQ3pELDBEQUF1RDtBQUN2RCxpREFBd0Q7QUFFeEQsTUFBTSxXQUFXLEdBQUcsRUFBRSxXQUFXLEVBQUUsbUJBQW1CLEVBQUUsQ0FBQztBQUU1QyxRQUFBLE1BQU0sR0FBRyxJQUFJLGVBQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUNqQyxRQUFBLE1BQU0sR0FBRyxJQUFJLGVBQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUNqQyxRQUFBLE9BQU8sR0FBRyxJQUFJLGlCQUFPLENBQUM7SUFDL0IsU0FBUyxFQUFFLCtCQUFtQixDQUFDLG9CQUFvQjtJQUNuRCxXQUFXLEVBQUUsV0FBVyxDQUFDLFdBQVc7Q0FDdkMsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAqICBDb3B5cmlnaHQgQW1hem9uLmNvbSwgSW5jLiBvciBpdHMgYWZmaWxpYXRlcy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIikuIFlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2UgICAgKlxuICogIHdpdGggdGhlIExpY2Vuc2UuIEEgY29weSBvZiB0aGUgTGljZW5zZSBpcyBsb2NhdGVkIGF0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICpcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICpcbiAqICBvciBpbiB0aGUgJ2xpY2Vuc2UnIGZpbGUgYWNjb21wYW55aW5nIHRoaXMgZmlsZS4gVGhpcyBmaWxlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuICdBUyBJUycgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyAqXG4gKiAgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZXhwcmVzcyBvciBpbXBsaWVkLiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgICAgKlxuICogIGFuZCBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICpcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tICdAYXdzLWxhbWJkYS1wb3dlcnRvb2xzL2xvZ2dlcic7XG5pbXBvcnQgeyBNZXRyaWNzIH0gZnJvbSAnQGF3cy1sYW1iZGEtcG93ZXJ0b29scy9tZXRyaWNzJztcbmltcG9ydCB7IFRyYWNlciB9IGZyb20gJ0Bhd3MtbGFtYmRhLXBvd2VydG9vbHMvdHJhY2VyJztcbmltcG9ydCB7IENsb3VkV2F0Y2hOYW1lc3BhY2UgfSBmcm9tICcuL3V0aWxzL2NvbnN0YW50cyc7XG5cbmNvbnN0IHNlcnZpY2VOYW1lID0geyBzZXJ2aWNlTmFtZTogJ1VzZUNhc2VNYW5hZ2VtZW50JyB9O1xuXG5leHBvcnQgY29uc3QgdHJhY2VyID0gbmV3IFRyYWNlcihzZXJ2aWNlTmFtZSk7XG5leHBvcnQgY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcihzZXJ2aWNlTmFtZSk7XG5leHBvcnQgY29uc3QgbWV0cmljcyA9IG5ldyBNZXRyaWNzKHtcbiAgICBuYW1lc3BhY2U6IENsb3VkV2F0Y2hOYW1lc3BhY2UuVVNFX0NBU0VfREVQTE9ZTUVOVFMsXG4gICAgc2VydmljZU5hbWU6IHNlcnZpY2VOYW1lLnNlcnZpY2VOYW1lXG59KTtcbiJdfQ==