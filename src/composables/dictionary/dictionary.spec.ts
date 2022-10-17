import createFetchMock from "vitest-fetch-mock";
import { vi } from "vitest";

const fetchMock = createFetchMock(vi);
fetchMock.enableMocks();
fetchMock.mockResponse("ABRICOT\nBANANE\nCITRON");

import { describe, expect, it } from "vitest";
import { useDictionary } from "@/composables/dictionary/dictionary";

describe("useDictionary", () => {
  it("checks that an existing word is valid", async () => {
    const { isWordValid } = useDictionary();
    expect(await isWordValid("BANANE")).toBeTruthy();
  });

  it("checks that a nonexistent word is invalid", async () => {
    const { isWordValid } = useDictionary();
    expect(await isWordValid("FRAMBOUHAZE")).toBeFalsy();
  });
});
