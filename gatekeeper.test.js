const {withAccessCheck, authContext} = require('./gatekeeper.js');
const _ = require('lodash');

// Jest testing
describe('withAccessCheck', () => {
    let consoleOutput;
    const originalLog = console.log;
    beforeEach(() => {
        consoleOutput = [];
        console.log = (output) => consoleOutput.push(output);
    });
    afterEach(() => {
        console.log = originalLog;
    });

    test('should call updateApplication and log message when checkAccess returns true', () => {
        //_.get = jest.fn().mockReturnValue(true);
        const testAuthContext = authContext('arbhatta', 'test', 'home', 'qa', 'update', 'app_update');
        withAccessCheck(authContext => {
            console.log(`Application ${authContext.app_name} of property ${authContext.property}, in environment ${authContext.env} updated successfully by ${authContext.user}`);
        })(testAuthContext);
        expect(consoleOutput[0]).toContain('Application home of property test, in environment qa updated successfully by arbhatta');
    });

    test('should throw error when checkAccess returns false', () => {
        const testAuthContext = authContext('someuser', 'test', 'home', 'qa', 'update', 'app_update');
        expect(() => {
            withAccessCheck( authContext => {})(authContext());
        }).toThrow('Access denied');
    });
});