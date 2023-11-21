import Lottie from "react-lottie";
import arrowAnimationData from "../assets/lotties/arrow.json";

const Arrow = ({ type = "up" }: { type: "down" | "up" | "left" | "right" }) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: arrowAnimationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div
      className={`transition-all duration-1000 ${
        type === "up"
          ? "rotate-0"
          : type === "down"
          ? "rotate-180"
          : type === "left"
          ? "-rotate-90"
          : type === "right"
          ? "rotate-90"
          : ""
      } `}
    >
      <Lottie
        options={defaultOptions}
        height={300}
        width={150}
        style={{
          marginLeft: "auto",
          color: "red",
        }}
      />
    </div>
  );
};

export default Arrow;
