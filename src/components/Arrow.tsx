import { FaLongArrowAltUp } from "react-icons/fa";

const Arrow = ({
  type = "up",
  className = "",
}: {
  type: "down" | "up" | "left" | "right";
  className?: string;
}) => {
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
      }`}
    >
      <FaLongArrowAltUp className={className} />
    </div>
  );
};

export default Arrow;
