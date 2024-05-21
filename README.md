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

### Consistent Naming Convention

An important aspect of this application is its adherence to a consistent naming convention for the ACL and metadata mapping throughout the access validation workflow.

### Testing

To test the application:

- You can either write a new test case against an ACL or use the existing test cases.

### Note

Please note that this is a demo application and is not intended for production use. Its purpose is to demonstrate the potential functionality of SPAship's authentication engine and to provide a testing ground for access control policies.