const assert = require("assert");
const parseArgs = require("../bin/parseArgs");
describe("file-ls", () => {
  describe("#parseArgs()", () => {
    it("parseArgs params problem", () => {
      assert.equal([1, 2, 3].indexOf(4), -1);
      const { isAll, isList, args } = parseArgs();
      assert.equal(isAll, true);
      assert.equal(isList, true);
      assert.equal(args.length, 3);
      assert.equal(args[0], "test/test.arg.js");
    });
  });
});
