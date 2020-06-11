import * as helpers from "./helpers";
describe('Helper Functions', () => {
  it("Verify Date Format as MM/DD/YYYY", () => {
    const tester: Date = new Date("10/18/2015");
    expect(helpers.formatDate(tester)).toMatch("10/18/2015");
    expect(helpers.formatDate("2015-10-18")).toMatch("10/18/2015");
  });

  it("Verify #getContextualDateInformation returns the right response", () => {
    let endDate = new Date(new Date().getTime() - (1000 * 3600 * 24 * 30)).toString();
    let startDate = new Date().toDateString();
    expect(helpers.getContextualDateInformation(startDate, endDate)).toEqual("Class ended 30 days ago");

    endDate = new Date(new Date().getTime() - (1000 * 3600 * 24)).toString();
    expect(helpers.getContextualDateInformation(startDate, endDate)).toEqual("Class ended 1 day ago");

    startDate = endDate;
    endDate = new Date(new Date().getTime() + (1000 * 3600 * 24 * 31)).toString();
    expect(helpers.getContextualDateInformation(startDate, endDate)).toEqual("Class ends in 30 days");

    endDate = new Date(new Date().getTime() + (1000 * 3600 * 24)).toString();
    expect(helpers.getContextualDateInformation(startDate, endDate)).toEqual("Class ends today");

    startDate = new Date(new Date().getTime() + (1000 * 3600 * 24)).toString();
    expect(helpers.getContextualDateInformation(startDate, endDate)).toEqual("Class starts in 1 day");

    startDate = new Date(new Date().getTime() + (1000 * 3600 * 24 * 30)).toString();
    expect(helpers.getContextualDateInformation(startDate, endDate)).toEqual("Class starts in 30 days");
  });
});
