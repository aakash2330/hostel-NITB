
import TiltComponent from "../_components/tiltComponent";

const saranRoomPictures = ["https://aakash2330-drippy.s3.amazonaws.com/NITTTR/saran/fwdsaranguesthouselatestphotograph/_DSC0346+(2).JPG", "https://aakash2330-drippy.s3.amazonaws.com/NITTTR/saran/fwdsaranguesthouselatestphotograph/DSC_0127.JPG", "https://aakash2330-drippy.s3.amazonaws.com/NITTTR/saran/fwdsaranguesthouselatestphotograph/DSC_0136.JPG", "https://aakash2330-drippy.s3.amazonaws.com/NITTTR/saran/fwdsaranguesthouselatestphotograph/DSC_0137.JPG", "https://aakash2330-drippy.s3.amazonaws.com/NITTTR/saran/fwdsaranguesthouselatestphotograph/DSC_0140.JPG"]
const executeRoomPictures = ["https://aakash2330-drippy.s3.amazonaws.com/NITTTR/fwdexecutivehostelphotograph/DSC_1095.JPG", "https://aakash2330-drippy.s3.amazonaws.com/NITTTR/fwdexecutivehostelphotograph/DSC_1107.JPG", "https://aakash2330-drippy.s3.amazonaws.com/NITTTR/fwdexecutivehostelphotograph/DSC_1115.JPG", "https://aakash2330-drippy.s3.amazonaws.com/NITTTR/fwdexecutivehostelphotograph/DSC_1120.JPG"]
const viswesawraiyaguesthousePictures = ["https://aakash2330-drippy.s3.amazonaws.com/NITTTR/fwdviswesawraiyaguesthouse/_DSC0140.JPG", "https://aakash2330-drippy.s3.amazonaws.com/NITTTR/fwdviswesawraiyaguesthouse/DSC_0067.JPG", "https://aakash2330-drippy.s3.amazonaws.com/NITTTR/fwdviswesawraiyaguesthouse/DSC_0111.JPG", "https://aakash2330-drippy.s3.amazonaws.com/NITTTR/fwdviswesawraiyaguesthouse/DSC_1422.JPG"]
const Page = () => {
  return (
    <div className="flex flex-gol gap-10 flex-wrap">
      <div>
        <div className="text-2xl text-center font-bold">Saran</div>
        <div className="grid grid-cols-1 md:grid-cols-4  gap-5 w-full h-full justify-center items-center">
          {saranRoomPictures.map((img) => {
            return <TiltComponent img={img}></TiltComponent>
          })}
        </div>
      </div>

      <div>
        <div className="text-2xl text-center font-bold">Executive</div>
        <div className="grid grid-cols-1 md:grid-cols-4  gap-5 w-full h-full justify-center items-center">
          {executeRoomPictures.map((img) => {
            return <TiltComponent img={img}></TiltComponent>
          })}
        </div>
      </div>

      <div>
        <div className="text-2xl text-center font-bold">Vishwasariya</div>
        <div className="grid grid-cols-1 md:grid-cols-4  gap-5 w-full h-full justify-center items-center">
          {viswesawraiyaguesthousePictures.map((img) => {
            return <TiltComponent img={img}></TiltComponent>
          })}
        </div>
      </div>
    </div>
  )
};
export default Page;


