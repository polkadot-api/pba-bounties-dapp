import { DotQueries } from "@polkadot-api/descriptors";
import { FC } from "react";
import { typedApi } from "./chain";
import { formatDOT } from "./lib/format";
import { usePromise } from "./lib/usePromise";

type Bounty = DotQueries["Bounties"]["Bounties"]["Value"] & {
  id: number;
};
export const BountiesList = () => {
  const bounties = usePromise(async () => {
    const entries = await typedApi.query.Bounties.Bounties.getEntries();
    return entries.map(
      ({ keyArgs, value }): Bounty => ({
        ...value,
        id: keyArgs[0],
      })
    );
  });

  if (!bounties) {
    return <div>Loading…</div>;
  }

  return (
    <ul className="space-y-0.5">
      {bounties.map((bounty) => (
        <BountyItem key={bounty.id} bounty={bounty} />
      ))}
    </ul>
  );
};

const BountyItem: FC<{
  bounty: Bounty;
}> = ({ bounty }) => {
  const description = usePromise(async () => {
    const description =
      await typedApi.query.Bounties.BountyDescriptions.getValue(bounty.id);
    return description?.asText();
  });

  return (
    <li className="flex gap-1 p-2">
      <div>{bounty.id}</div>
      <div className="grow">{description}</div>
      <div>{formatDOT(bounty.value)}</div>
    </li>
  );
};
