import { useEffect, useState } from "react";
import { typedApi } from "./chain";
import { DotQueries } from "@polkadot-api/descriptors";

type Bounty = DotQueries["Bounties"]["Bounties"]["Value"] & {
  id: number;
};
export const BountiesList = () => {
  const [bounties, setBounties] = useState<Bounty[] | null>(null);

  useEffect(() => {
    typedApi.query.Bounties.Bounties.getEntries().then((entries) => {
      setBounties(
        entries.map(
          ({ keyArgs, value }): Bounty => ({
            ...value,
            id: keyArgs[0],
          })
        )
      );
    });
  }, []);

  if (!bounties) {
    return <div>Loading…</div>;
  }

  return (
    <ul className="space-y-0.5">
      {bounties.map((bounty) => (
        <li key={bounty.id} className="flex gap-1 p-2">
          <div>{bounty.id}</div>
          <div className="grow">{bounty.proposer}</div>
          <div>{bounty.value}</div>
        </li>
      ))}
    </ul>
  );
};
