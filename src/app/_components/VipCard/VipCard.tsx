import { Card } from "~/components/ui/card";
import Image from "next/image";
import img1 from "public/Official_Photograph_of_Prime_Minister_Narendra_Modi_Portrait.png"
import img2 from "public/Dharmendra-Pradhan.webp"
const vipData = [{
  img: img1,
  title: "Shri Narendra Modi",
  description: "Prime Minister of India"
}, {
  img: img2,
  title: "Shri Dharmendra Pradhan",
  description: "Prime Minister of India"
}, {
  img: img2,
  title: " Prof. Chandra Charu Tripathi",
  description: "Director, NITTTR"
}]

export default function VipCard() {
  return <Card className="flex w-[70rem] p-7">
    <div className="w-[50%] text-sm flex flex-col">
      <div className="text-primary font-bold text-2xl">ABOUT NITTTR</div>
      <div >National Institute of Technical Teachers' Training and Research, Bhopal is a unique premier institution, established in 1965 by Ministry of Education, Government of India for teacher training </div>
    </div>
    <div className="flex w-full gap-10 justify-center items-center">
      {vipData.map((data, index) => {
        return <div key={data.title + index} className="flex flex-col justify-center items-center">

          <Image
            key={"asd"}
            className="w-28 h-28  object-cover rounded-full"
            src={data.img}
            alt=""
          />
          <div className="text-center">{data.title}</div>
          <div className="text-center text-xs">{data.description}</div>
        </div>
      })}
    </div>
  </Card>
}
