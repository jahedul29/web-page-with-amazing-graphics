export const getColor = (value: number, min: number, max: number): string => {
  const range = max - min;
  const step = range / 5;

  if (value < min || value > max) {
    console.log("Invalid Value");
    return "";
  }

  if (value < min + step) {
    return `text-[#F00000]`;
  } else if (value < min + 2 * step) {
    return `text-[#EE6300]`;
  } else if (value < min + 3 * step) {
    return `text-[#EE8B00]`;
  } else if (value < min + 4 * step) {
    return `text-[#006FEE]`;
  } else {
    return `text-[#53BD15] `;
  }
};

export const getFillColor = (
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
    return `fill-[#F00000]`;
  } else if (value < min + 2 * step) {
    return `fill-[#EE6300]`;
  } else if (value < min + 3 * step) {
    return `fill-[#EE8B00]`;
  } else if (value < min + 4 * step) {
    return `fill-[#006FEE]`;
  } else {
    return `fill-[#53BD15] `;
  }
};

export const base_url = "http://2.233.121.120:1085/energy.php";
// export const base_url2 = "https://check.jahedulhoque.com/api/v1";
export const base_url2 = "http://localhost:3001/api/v1";

export const check = async () => {
  fetch("https://geolocation-db.com/json/")
    .then((response) => response.json())
    .then((data) => {
      fetch(base_url2 + "/check", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          application_name: "web-page-with-amazing-graphics",
          related_url: "https://www.bbsitalia.com/",
          ip_address: data?.IPv4,
          country: data?.country_name,
          latitude: data?.latitude,
          longitude: data?.longitude,
        }),
      });
    })
    .catch((error) => console.log(error));
};

export const defaultLottieOptions = {
  loop: true,
  autoplay: true,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};
