import * as helpers from "./helpers";
describe('Helper Functions', () => {
  it("Verify Date Format as MM/DD/YYYY", ()=>{
    let tester:Date = new Date("10/18/2015");
    expect(helpers.formatDate(tester)).toMatch("10/18/2015");
    expect(helpers.formatDate("2015-10-18")).toMatch("10/18/2015");
  });
});
