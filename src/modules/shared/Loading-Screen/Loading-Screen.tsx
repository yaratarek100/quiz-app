import { BeatLoader } from "react-spinners";

export default function LoadingScreen() {
  return (
    <>
      <div className="h-screen flex justify-center items-center bg-red">
        <BeatLoader />
      </div>
      
    </>
  )
}
