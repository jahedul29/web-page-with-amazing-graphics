import { useEffect, useState } from "react";
import Lottie from "react-lottie";
import "./App.css";

import { FaHome } from "react-icons/fa";
// import { GiWatchtower } from "react-icons/gi";
import { MdBatteryChargingFull } from "react-icons/md";
import cloudAnimationData from "./assets/lotties/cloud.json";
import sunWithCloudAnimationData from "./assets/lotties/sun-with-cloud.json";
import sunAnimationData from "./assets/lotties/sun.json";
import Arrow from "./components/Arrow";
import GridSvg from "./components/GridSvg";
import Overlay from "./components/Overlay";
import {
  base_url,
  check,
  defaultLottieOptions,
  getColor,
  getFillColor,
} from "./utils";

type IEnergyData = {
  batt: string;
  batt_perc: string;
  date: string;
  grid: string;
  home: string;
  powerwall_connection_status: string;
  powerwall_connection_timeout: string;
  powerwall_response_time: string;
  solar: string;
  surplus: string;
  time: string;
  time_short: string;
};

function App() {
  const [energyData, setEnergyData] = useState<IEnergyData | null>(null);
  const [isLoading, setLoadingData] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const solarAnimationData =
    parseFloat(energyData?.solar || "0") > 4
      ? sunAnimationData
      : parseFloat(energyData?.solar || "0") > 1
      ? sunWithCloudAnimationData
      : cloudAnimationData;

  console.log({ energyData });

  const fetchData = async () => {
    setIsError(false);
    try {
      const response = await fetch(base_url);
      if (!response.ok) {
        console.error(response);
      }
      const data = await response.json();

      const propertiesToCheck = ["batt_perc", "batt", "solar", "home", "grid"];

      propertiesToCheck.forEach((property) => {
        if (
          parseFloat(data[property]) >= -0.099 &&
          parseFloat(data[property]) <= 0.099
        ) {
          data[property] = "0";
        }
      });

      setEnergyData(data);
      setLoadingData(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoadingData(false);
      setIsError(true);
    }
  };

  useEffect(() => {
    if (energyData === null) {
      setLoadingData(true);
      check();
    }
    const interval = setInterval(fetchData, 7000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen">
      {isLoading && <Overlay type="loading" />}
      {!isLoading && isError && <Overlay type="no-data" />}
      {!isLoading &&
        parseFloat(energyData?.powerwall_connection_status || "0") === 0 &&
        isLoading && <Overlay type="no-data" />}

      <div>
        <h2 className="text-white font-medium text-xl">
          {new Date(energyData?.date || "").toDateString()}
        </h2>
        <p className="text-white font-medium text-lg mt-3">
          Time: {energyData?.time}
        </p>
        <div className="flex flex-col items-center justify-center">
          <p
            className={`font-medium relative top-5 ${getColor(
              parseFloat(energyData?.solar || "0"),
              0,
              6
            )}`}
          >
            Solar: {parseFloat(energyData?.solar || "0")}
          </p>
          <div className="w-[120px] md:w-[250px] h-[120px] md:h-[250px]">
            <Lottie
              options={{
                ...defaultLottieOptions,
                animationData: solarAnimationData,
              }}
              // height={200}
              // width={200}
            />
          </div>
        </div>
        <div className="grid grid-cols-3 my-10 md:my-20">
          <div className="flex flex-col items-center justify-center ml-auto">
            <p
              className={`font-medium ${getColor(
                parseFloat(energyData?.home || "0"),
                0,
                9
              )}`}
            >
              Home: {parseFloat(energyData?.home || "0")}
            </p>
            <FaHome
              className={`text-[100px] md:text-[200px] ${getColor(
                parseFloat(energyData?.home || "0"),
                0,
                9
              )}`}
            />
          </div>
          <div className="flex flex-col items-center justify-center">
            <p
              className={`font-medium ${
                parseFloat(energyData?.grid || "0") === 0 ? "!text-[#000]" : ""
              } ${getColor(parseFloat(energyData?.grid || "0"), -6, 10)}`}
            >
              Grid: {parseFloat(energyData?.grid || "0")}
            </p>
            <Arrow
              type={parseFloat(energyData?.grid || "0") < 0 ? "right" : "left"}
              className={`text-[80px] md:text-[150px] ${
                parseFloat(energyData?.grid || "0") === 0 ? "!text-[#000]" : ""
              } ${getColor(parseFloat(energyData?.grid || "0"), -6, 10)}`}
            />
          </div>
          <div className="flex justify-center items-center mr-auto">
            <div>
              <p
                className={`font-medium ${getColor(
                  parseFloat(energyData?.grid || "0"),
                  -6,
                  10
                )}`}
              >
                Grid: {parseFloat(energyData?.grid || "0")}
              </p>

              <GridSvg
                className={`text-[100px] md:text-[200px] ${getFillColor(
                  parseFloat(energyData?.grid || "0"),
                  -6,
                  10
                )}`}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center items-end">
          <div className="w-[100px] md:w-[200px]">
            <p
              className={`font-medium ${getColor(
                parseFloat(energyData?.batt_perc || "0"),
                0,
                100
              )}`}
            >
              Battery Percentage: {parseFloat(energyData?.batt_perc || "0")}
            </p>
            <MdBatteryChargingFull
              className={`text-[100px] md:text-[200px] ${getColor(
                parseFloat(energyData?.batt_perc || "0"),
                0,
                100
              )}`}
            />
          </div>
          <div className="flex  flex-col justify-center items-center">
            <p
              className={`font-medium ${
                parseFloat(energyData?.batt || "0") === 0 ? "!text-[#000]" : ""
              } ${getColor(parseFloat(energyData?.batt || "0"), -5, 5)}`}
            >
              Batt: {parseFloat(energyData?.batt || "0")}
            </p>
            <Arrow
              type={parseFloat(energyData?.batt || "0") >= 0 ? "down" : "up"}
              className={`text-[100px] md:text-[200px] ${
                parseFloat(energyData?.batt || "0") === 0 ? "!text-[#000]" : ""
              } ${getColor(parseFloat(energyData?.batt || "0"), -5, 5)}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
