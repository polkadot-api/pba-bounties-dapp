import { useEffect, useState } from "react";
import { typedApi } from "./chain";
import { DotQueries } from "@polkadot-api/descriptors";

type Bounty = DotQueries["Bounties"]["Bounties"]["Value"] & {
  id: number;
};
export const BountiesList = () => {
  const [bounties, setBounties] = useState<Bounty[] | null>(null);

  useEffect(() => {
    const subscription =
      typedApi.query.Bounties.Bounties.watchEntries().subscribe(
        ({ entries, deltas }) => {
          if (!deltas) return;

          setBounties(
            entries.map(
              ({ args, value }): Bounty => ({
                ...value,
                id: args[0],
              })
            )
          );
        }
      );

    return () => subscription.unsubscribe();
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
