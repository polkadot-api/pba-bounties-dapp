import { DotQueries } from "@polkadot-api/descriptors";
import { typedApi } from "./chain";

export type Bounty = DotQueries["Bounties"]["Bounties"]["Value"] & {
  id: number;
  description: string | null;
};

export async function getBounties(): Promise<Bounty[]> {
  const bounties = await typedApi.query.Bounties.Bounties.getEntries();
  const descriptions =
    await typedApi.query.Bounties.BountyDescriptions.getEntries();

  return bounties.map((entry) => {
    const descriptionEntry = descriptions.find(
      (dE) => dE.keyArgs[0] === entry.keyArgs[0]
    );

    return {
      ...entry.value,
      id: entry.keyArgs[0],
      description: descriptionEntry?.value.asText() ?? null,
    };
  });
}
