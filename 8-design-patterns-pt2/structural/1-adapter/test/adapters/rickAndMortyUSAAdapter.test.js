import { jest } from "@jest/globals";
import RickAndMortyUSAAdapter from "../../src/business/adapters/rickAndMortyUSAAdapter";
import RickAndMortyUSA from "../../src/business/integrations/rickAndMortyUSA";

describe("#RickAndMortyUSA", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("#getCharacters should, be an adapter for RickAndMortUSA.getCharactersJSON", async () => {
    const usaIntegration = jest
      .spyOn(RickAndMortyUSA, RickAndMortyUSA.getCharactersFromXML.name)
      .mockResolvedValue([]);

    const result = await RickAndMortyUSAAdapter.getCharacters();
    expect(result).toEqual([]);

    expect(usaIntegration).toHaveBeenCalled();
  });
});
