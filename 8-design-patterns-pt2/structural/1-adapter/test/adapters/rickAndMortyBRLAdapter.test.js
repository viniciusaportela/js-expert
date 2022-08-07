import { jest } from "@jest/globals";
import RickAndMortyBRLAdapter from "../../src/business/adapters/rickAndMortyBRLAdapter.js";
import RickAndMortyBRL from "../../src/business/integrations/rickAndMortyBRL.js";

describe("#RickAndMortyBRL", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("#getCharacters should, be an adapter for RickAndMortBRL.getCharactersJSON", async () => {
    const brlIntegration = jest
      .spyOn(RickAndMortyBRL, RickAndMortyBRL.getCharactersFromJSON.name)
      .mockResolvedValue([]);

    const result = await RickAndMortyBRLAdapter.getCharacters();
    expect(result).toEqual([]);

    expect(brlIntegration).toHaveBeenCalled();
  });
});
