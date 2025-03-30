import { FC } from "react";
import { typedApi } from "./chain";
import { formatDOT } from "./lib/format";
import { usePromise } from "./lib/usePromise";
import { Bounty, getBounties } from "./bounty.state";

export const BountiesList = () => {
  const bounties = usePromise(() => getBounties());

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
  return (
    <li className="flex gap-1 p-2">
      <div>{bounty.id}</div>
      <div className="grow">{bounty.description}</div>
      <div>{formatDOT(bounty.value)}</div>
    </li>
  );
};
