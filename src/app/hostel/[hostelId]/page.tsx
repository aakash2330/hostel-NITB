import ProductHeroSlider from "~/app/_components/single-hostel";
import { api } from "~/trpc/server";


export default async function Page({ params }: { params: { hostelId: string } }) {
  const { roomDetails } = await api.room.getRoomById.mutate({ hostelId: params.hostelId })
  if (roomDetails) {
    return <ProductHeroSlider roomDetails={roomDetails}></ProductHeroSlider>
  }
  else {
    return <div>INVALID ROOM ID</div>
  }
}
