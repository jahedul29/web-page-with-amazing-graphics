import { useEffect, useState } from "react";
import Lottie from "react-lottie";
import "./App.css";

import { FaHome } from "react-icons/fa";
import { MdBatteryChargingFull } from "react-icons/md";
// import batteryFullAnimationData from "./assets/lotties/battery-full.json";
// import batteryLowAnimationData from "./assets/lotties/battery-low.json";
import { GiWatchtower } from "react-icons/gi";
import cloudAnimationData from "./assets/lotties/cloud.json";
import sunWithCloudAnimationData from "./assets/lotties/sun-with-cloud.json";
import sunAnimationData from "./assets/lotties/sun.json";
import Arrow from "./components/Arrow";
import Overlay from "./components/Overlay";
import { defaultLottieOptions, getColor } from "./utils";

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
      const response = await fetch("http://2.233.121.120:1085/energy.php");
      if (!response.ok) {
        console.error(response);
      }
      const data = await response.json();
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
        <div className="flex flex-col items-center justify-center">
          <p
            className={`font-medium relative top-10 ${getColor(
              parseFloat(energyData?.solar || "0"),
              0,
              6
            )}`}
          >
            Solar: {parseFloat(energyData?.solar || "0")}
          </p>
          <Lottie
            options={{
              ...defaultLottieOptions,
              animationData: solarAnimationData,
            }}
            height={200}
            width={200}
          />
        </div>
        <div className="flex justify-center items-center gap-80 my-20">
          <div>
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
              className={`text-[200px] ${getColor(
                parseFloat(energyData?.home || "0"),
                0,
                9
              )}`}
            />
          </div>
          <div className="flex justify-center">
            <div>
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
                className={`text-[200px] ${getColor(
                  parseFloat(energyData?.batt_perc || "0"),
                  0,
                  100
                )}`}
              />
            </div>
            <div className="flex  flex-col justify-center items-center">
              <p
                className={`font-medium ${getColor(
                  parseFloat(energyData?.batt || "0"),
                  -5,
                  5
                )}`}
              >
                Batt: {parseFloat(energyData?.batt || "0")}
              </p>
              <Arrow
                type={parseFloat(energyData?.batt || "0") >= 0 ? "down" : "up"}
                className={`text-[150px] ${getColor(
                  parseFloat(energyData?.batt || "0"),
                  -5,
                  5
                )}`}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center">
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
            <GiWatchtower
              className={`text-[200px] ${getColor(
                parseFloat(energyData?.grid || "0"),
                -6,
                10
              )}`}
            />
          </div>
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
            <Arrow
              type={parseFloat(energyData?.grid || "0") <= 0 ? "right" : "left"}
              className={`text-[150px] ${getColor(
                parseFloat(energyData?.grid || "0"),
                -6,
                10
              )}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
