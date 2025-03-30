import { typedApi } from "./chain";
import { createBountiesSdk } from "@polkadot-api/sdk-governance";

const bountiesSdk = createBountiesSdk(typedApi);

export async function getBounties() {
  return bountiesSdk.getBounties();
}
