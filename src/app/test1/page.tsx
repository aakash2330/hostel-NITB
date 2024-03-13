import TiltComponent from "../_components/tiltComponent";

import img1 from "public/IMG_5599.png"
import img2 from "public/IMG_5622.png"
import img3 from "public/IMG_5624.png"
import img4 from "public/IMG_5624.png"
import img5 from "public/IMG_5621.png"
import img6 from "public/IMG_5622.png"
import img7 from "public/IMG_5621.png"
import img8 from "public/IMG_5599.png"


const Test = () => {
  return (
    <div className="grid grid-cols-4 gap-5 w-full h-full justify-center items-center">
      {[img1, img2, img3, img4, img5, img6, img7, img8].map((img) => {
        return <TiltComponent img={img}></TiltComponent>
      })}
    </div>
  )
};
export default Test;


