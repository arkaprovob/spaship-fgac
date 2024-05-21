const _ = require('lodash');


// This is a mocked criteria list mapped with actions used for testing purposes.
// In a real application, this data would come from a database table.
let actionToMetadataMapping = [
    {"action_name":"app_update","criteria":["property","env","app_name"]},
    {"action_name":"add_app","criteria":["property","env","app_name"]},
    {"action_name":"delete_app","criteria":["property","env","app_name"]},
    {"action_name":"add_environment","criteria":["property","env"]},
    {"action_name":"edit_environment","criteria":["property","env"]},
    {"action_name":"delete_environment","criteria":["property","env"]},
    {"action_name":"add_sync","criteria":["property","env"]},
    {"action_name":"update_sync","criteria":["property","env"]}
]


// This is a mocked Access Control List used for testing purposes.
// In a real application, this data would come from a database table.
let acl = [
    {"user":"arbhatta","target":{"property":"test","env":"qa","app_name":"home"},"action_type":"update","action":"app_update"},
    {"user":"schowd","target":{"property":"test","env":"qa","app_name":"home"},"action_type":"create","action":"app_create"},
    {"user":"nmore","target":{"property":"test","env":"qa","app_name":"home"},"action_type":"delete","action":"app_delete"},
    {"user":"stumulwar","target":{"property":"test","env":"qa"},"action_type":"create","action":"environment_create"},
    {"user":"mclayton","target":{"property":"test","env":"qa"},"action_type":"edit","action":"environment_edit"},
    {"user":"rcoffman","target":{"property":"test","env":"qa"},"action_type":"delete","action":"environment_delete"},
    {"user":"arbhatta","target":{"property":"test","env":"dev"},"action_type":"create","action":"sync_create"},
    {"user":"arbhatta","target":{"property":"test","env":"qa","app_name":"home"},"action_type":"update","action":"sync_update"}
]

/**
 * Dynamically generates an authentication context.
 * This method is added to simulate the structure of the authContext in the real application.
 *
 * @param {string} uname - The username.
 * @param {string} property - The property name.
 * @param {string} app - The application name.
 * @param {string} env - The environment.
 * @param {string} actionType - Type of action.
 * @param {string} actionName - Name of the action.
 * @returns {Object} - Returns an authentication context.
 */
function authContext(uname,property,app,env,actionType,actionName) {
    return {
        "user": uname,
        "property": property,
        "app_name": app,
        "env": env,
        "method": actionType,
        "action": actionName
    };
}


/**
 * Fetches the action and target attribute mapping from existing records.
 * In a real application, this data would be fetched from a database.
 *
 * @param {string} actionName - The name of the action for which the criteria is to be fetched.
 * @returns {Array} - Returns an array of criteria if the action is found, otherwise returns an empty array.
 */
function getCriteriaForAction(actionName) {
    let metadataList = actionToMetadataMapping.find(action => action.action_name === actionName)
    return metadataList ? metadataList.criteria : []
}


/**
 * Verifies the Access Control List from existing records and authenticates a user for a requested action.
 * In the actual application, only the in-memory part would be replaced with database operations.
 *
 * @param {Object} authContext - The authentication context.
 * @returns {boolean} - Returns true if access is granted, false otherwise.
 */
function checkAccess(authContext) {
    let action = _.get(authContext, 'action');
    let criteria = getCriteriaForAction(action);

    let target = _.pick(authContext, criteria);

    let searchCriteria = {
        "user": _.get(authContext, 'user'),
        "target": target,
        "action_type": _.get(authContext, 'method'),
        "action": _.get(authContext, 'action')
    };

    return _.some(acl, aclItem => _.isEqual(aclItem, searchCriteria));
}


/**
 * This function takes a function as an argument, in actual application which would be the resource access function.
 * It returns a new function that first checks the access rights from authContext.
 * If the access check passes (i.e., checkAccess returns true), it calls the original function with the authContext.
 * If the access check fails (i.e., checkAccess returns false), it throws an 'Access denied' error.
 * This is used to ensure that the original function is only called if the user has the necessary access rights.
 *
 * @param {Function} originalFunction - The original function that should be called if the access check passes.
 * @returns {Function} - A new function that includes the access check.
 */
function withAccessCheck(originalFunction) {
    return function(authContext) {
        if (!checkAccess(authContext)) {
            throw new Error('Access denied');
        }
        return originalFunction(authContext);
    };
}

module.exports = {
    authContext,
    withAccessCheck
};