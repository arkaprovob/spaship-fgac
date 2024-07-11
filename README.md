## Demo Application: SPAship Authentication Engine (Fine grained access control)

---

This demo application is designed to simulate SPAship's authentication engine workflow and test the policies configured for SPAship access control.

### Key Methods

The two key methods in this application are:

1. **getCriteriaForAction**: This method retrieves the criteria for a specific action from the configured metadata.

2. **checkAccess**: This method checks whether a user has access to perform a specified action based on the defined access control policies.

### Implementation Details

In the actual application:

- The values of the `actionToMetadataMapping` and `acl` variables are fetched from a database.
- Authentication context is provided during function calls, with details fetched from the access token and the method to be executed for an action.

#### withAccessCheck

This higher-order function wraps a resource access function with an access check. It throws an 'Access denied' error if the check fails.

#### actionToMetadataMapping

This is a crucial component of the FGAC system. It's a separate list of records that maps actions to their required criteria. 

Key benefits of this approach:
1. Flexibility: Easily add, remove, or modify criteria for different actions without changing core logic.
2. Reduced Complexity: Avoids hardcoding criteria within the access control logic.
3. Dynamic Criteria Matching: Allows for fetching relevant criteria based on the action.
4. Separation of Concerns: Manages mapping of actions to required criteria independently.
5. Easier Updates: Changes to action criteria only require updating this mapping.

The process works as follows:
1. The method processes the authContext.
2. It fetches relevant attributes from actionToMetadataMapping based on the action.
3. These attributes are extracted from the authContext.
4. A list is prepared with these extracted attributes.
5. This list is compared with the ACL to check if a user is allowed to perform the action.

In a production environment, this mapping would ideally be stored in a database for even greater flexibility.


  

### Consistent Naming Convention

An important aspect of this application is its adherence to a consistent naming convention for the ACL and metadata mapping throughout the access validation workflow.

### Testing

To test the application:

- You can either write a new test case against an ACL or use the existing test cases.

### Note

Please note that this is a demo application and is not intended for production use. Its purpose is to demonstrate the potential functionality of SPAship's authentication engine and to provide a testing ground for access control policies.
