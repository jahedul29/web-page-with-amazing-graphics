import Lottie from "react-lottie";
import loadingAnimation from "../assets/lotties/loading.json";
import noDataAnimation from "../assets/lotties/no-data.json";
import { defaultLottieOptions } from "../utils";

const Overlay = ({ type }: { type?: "loading" | "no-data" }) => {
  return (
    <div className="fixed inset-0 bg-gray-700 opacity-80 z-10 flex items-center justify-center flex flex-col">
      {type === "no-data" && (
        <h2 className="text-red-500 font-medium text-5xl">
          DATA NOT AVAILABLE
        </h2>
      )}

      <Lottie
        options={{
          ...defaultLottieOptions,
          animationData:
            type === "loading"
              ? loadingAnimation
              : type === "no-data"
              ? noDataAnimation
              : "",
        }}
        height={200}
        width={200}
      />
    </div>
  );
};

export default Overlay;
