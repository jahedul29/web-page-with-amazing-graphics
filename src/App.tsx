import { useEffect, useState } from "react";
import Lottie from "react-lottie";
import "./App.css";

import batteryFullAnimationData from "./assets/lotties/battery-full.json";
import batteryLowAnimationData from "./assets/lotties/battery-low.json";
import cloudAnimationData from "./assets/lotties/cloud.json";
import gridRedAnimation from "./assets/lotties/grid-low.json";
import gridGreenAnimation from "./assets/lotties/grid.json";
import homeGreenAnimationData from "./assets/lotties/home-green.json";
import homeRedAnimationData from "./assets/lotties/house-red.json";
import sunWithCloudAnimationData from "./assets/lotties/sun-with-cloud.json";
import sunAnimationData from "./assets/lotties/sun.json";
import Arrow from "./components/Arrow";
import Overlay from "./components/Overlay";

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

  const solarAnimationData =
    parseFloat(energyData?.solar || "0") > 4
      ? sunAnimationData
      : parseFloat(energyData?.solar || "0") > 1
      ? sunWithCloudAnimationData
      : cloudAnimationData;

  const homeAnimationData =
    parseFloat(energyData?.home || "0") > 3
      ? homeRedAnimationData
      : homeGreenAnimationData;

  const batteryAnimationData =
    parseFloat(energyData?.batt_perc || "0") > 19
      ? batteryFullAnimationData
      : batteryLowAnimationData;

  const gridAnimationData =
    parseFloat(energyData?.grid || "0") > -4 &&
    parseFloat(energyData?.grid || "0") < 8
      ? gridGreenAnimation
      : gridRedAnimation;

  const defaultOptions = {
    loop: true,
    autoplay: true,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  console.log({ energyData });

  const fetchData = async () => {
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
      {!isLoading &&
        parseFloat(energyData?.powerwall_connection_status || "0") === 0 &&
        isLoading && <Overlay type="no-data" />}

      <div>
        <h2 className="text-white font-medium text-xl">
          {new Date(energyData?.date || "").toDateString()}
        </h2>
        <div className="flex items-center justify-center">
          <Lottie
            options={{ ...defaultOptions, animationData: solarAnimationData }}
            height={200}
            width={200}
          />
        </div>
        <div className="grid grid-cols-2">
          <div>
            <Lottie
              options={{ ...defaultOptions, animationData: homeAnimationData }}
              height={300}
              width={300}
            />
          </div>
          <div className="flex justify-center">
            <Lottie
              options={{
                ...defaultOptions,
                animationData: batteryAnimationData,
              }}
              height={300}
              width={200}
              style={{
                margin: 0,
              }}
            />
            <Arrow
              type={parseFloat(energyData?.batt || "0") > 0 ? "down" : "up"}
            />
          </div>
        </div>
        <div className="flex justify-center">
          {parseFloat(energyData?.batt || "0") > 0 && <Arrow type={"right"} />}

          <Lottie
            options={{ ...defaultOptions, animationData: gridAnimationData }}
            height={300}
            width={300}
            style={{
              margin: 0,
            }}
          />
          {parseFloat(energyData?.batt || "0") <= 0 && <Arrow type={"right"} />}
        </div>
      </div>
    </div>
  );
}

export default App;
