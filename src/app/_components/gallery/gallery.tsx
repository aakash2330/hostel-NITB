"use client"
import { useEffect } from "react";
import TiltComponent from "../tiltComponent";
const saranRoomPictures = ["https://aakash2330-drippy.s3.amazonaws.com/NITTTR/saran/fwdsaranguesthouselatestphotograph/_DSC0346+(2).JPG", "https://aakash2330-drippy.s3.amazonaws.com/NITTTR/saran/fwdsaranguesthouselatestphotograph/DSC_0127.JPG", "https://aakash2330-drippy.s3.amazonaws.com/NITTTR/saran/fwdsaranguesthouselatestphotograph/DSC_0136.JPG", "https://aakash2330-drippy.s3.amazonaws.com/NITTTR/saran/fwdsaranguesthouselatestphotograph/DSC_0137.JPG", "https://aakash2330-drippy.s3.amazonaws.com/NITTTR/saran/fwdsaranguesthouselatestphotograph/DSC_0140.JPG"]
const executeRoomPictures = ["https://aakash2330-drippy.s3.amazonaws.com/NITTTR/fwdexecutivehostelphotograph/DSC_1095.JPG", "https://aakash2330-drippy.s3.amazonaws.com/NITTTR/fwdexecutivehostelphotograph/DSC_1107.JPG", "https://aakash2330-drippy.s3.amazonaws.com/NITTTR/fwdexecutivehostelphotograph/DSC_1115.JPG", "https://aakash2330-drippy.s3.amazonaws.com/NITTTR/fwdexecutivehostelphotograph/DSC_1120.JPG"]
const viswesawraiyaguesthousePictures = ["https://aakash2330-drippy.s3.amazonaws.com/NITTTR/fwdviswesawraiyaguesthouse/DSC_0067.JPG", "https://aakash2330-drippy.s3.amazonaws.com/NITTTR/fwdviswesawraiyaguesthouse/DSC_0067.JPG", "https://aakash2330-drippy.s3.amazonaws.com/NITTTR/fwdviswesawraiyaguesthouse/DSC_0111.JPG", "https://aakash2330-drippy.s3.amazonaws.com/NITTTR/fwdviswesawraiyaguesthouse/DSC_1422.JPG"]

export default function Gallery({ location }: { location: "executive" | "saran" | "vishveshvaraya" }) {

  useEffect(() => {
    document.getElementById(location)?.scrollIntoView();
  }, [])

  return <div className="flex flex-gol gap-10 flex-wrap">
    <div>
      <div id="saran" className="text-2xl text-center font-bold">Saran</div>
      <div className="grid grid-cols-1 md:grid-cols-4  gap-5 w-full h-full justify-center items-center">
        {saranRoomPictures.map((img, index) => {
          return <TiltComponent key={img + index} img={img}></TiltComponent>
        })}
      </div>
    </div>

    <div>
      <div id="executive" className="text-2xl text-center font-bold">Executive</div>
      <div className="grid grid-cols-1 md:grid-cols-4  gap-5 w-full h-full justify-center items-center">
        {executeRoomPictures.map((img, index) => {
          return <TiltComponent key={img + index} img={img}></TiltComponent>
        })}
      </div>
    </div>

    <div>
      <div id="vishveshvaraya" className="text-2xl text-center font-bold">Vishveshvaraya</div>
      <div className="grid grid-cols-1 md:grid-cols-4  gap-5 w-full h-full justify-center items-center">
        {viswesawraiyaguesthousePictures.map((img, index) => {
          return <TiltComponent img={img} key={img + index}></TiltComponent>
        })}
      </div>
    </div>
  </div>
}
