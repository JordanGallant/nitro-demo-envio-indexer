import assert from "assert";
import { 
  TestHelpers,
  IToken_Approval
} from "generated";
const { MockDb, IToken } = TestHelpers;

describe("IToken contract Approval event tests", () => {
  // Create mock db
  const mockDb = MockDb.createMockDb();

  // Creating mock for IToken contract Approval event
  const event = IToken.Approval.createMockEvent({/* It mocks event fields with default values. You can overwrite them if you need */});

  it("IToken_Approval is created correctly", async () => {
    // Processing the event
    const mockDbUpdated = await IToken.Approval.processEvent({
      event,
      mockDb,
    });

    // Getting the actual entity from the mock database
    let actualITokenApproval = mockDbUpdated.entities.IToken_Approval.get(
      `${event.chainId}_${event.block.number}_${event.logIndex}`
    );

    // Creating the expected entity
    const expectedITokenApproval: IToken_Approval = {
      id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
      owner: event.params.owner,
      spender: event.params.spender,
      value: event.params.value,
    };
    // Asserting that the entity in the mock database is the same as the expected entity
    assert.deepEqual(actualITokenApproval, expectedITokenApproval, "Actual ITokenApproval should be the same as the expectedITokenApproval");
  });
});
