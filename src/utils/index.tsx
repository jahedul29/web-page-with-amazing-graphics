export const getColor = (value: number, min: number, max: number): string => {
  const range = max - min;
  const step = range / 5;

  if (value < min || value > max) {
    console.log("Invalid Value");
    return "";
  }

  if (value < min + step) {
    return "text-[#F00000] ";
  } else if (value < min + 2 * step) {
    return "text-[#EE6300] ";
  } else if (value < min + 3 * step) {
    return "text-[#EE8B00] ";
  } else if (value < min + 4 * step) {
    return "text-[#006FEE] ";
  } else {
    return "text-[#53BD15] ";
  }
};

export const getGridImageUrl = (
  value: number,
  min: number,
  max: number
): string => {
  const range = max - min;
  const step = range / 5;

  if (value < min || value > max) {
    console.log("Invalid Value");
    return "";
  }

  if (value < min + step) {
    return "text-[#F00000] ";
  } else if (value < min + 2 * step) {
    return "text-[#EE6300] ";
  } else if (value < min + 3 * step) {
    return "text-[#EE8B00] ";
  } else if (value < min + 4 * step) {
    return "text-[#006FEE] ";
  } else {
    return "text-[#53BD15] ";
  }
};

export const defaultLottieOptions = {
  loop: true,
  autoplay: true,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};
