import { api } from "~/trpc/server";
import Checkout from "../_components/Checkout/Checkout";

export default async function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {

  const { roomDetails } = await api.room.getRoomById.mutate({ hostelId: searchParams?.id as string })
  if (roomDetails) {
    return <Checkout roomDetails={roomDetails}></Checkout>
  }
  else {
    return <div>INVALID ROOM ID</div>
  }
}
