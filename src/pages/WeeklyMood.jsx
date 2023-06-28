import LineChart from "../component/LineChart";
import { useEffect, useState } from "react";
import { BackendAPI } from "../api/BackendAPIHandler";
import DoughnutChart from "../component/DoughnutChart";

function convertType(type) {
  switch (type) {
    case "happy":
      return "😊";
    case "sad":
      return "😔";
    case "angry":
      return "😡";
    case "in love":
      return "😍";
    case "sleepy":
      return "😴";
    default:
      return "";
  }
}

function WeeklyMood() {
  const [moods, setMoods] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const backendAPIInstance = new BackendAPI();

  useEffect(() => {
    const fetchMoods = async () => {
      try {
        const data = await backendAPIInstance.getMoods();
        const convertedData = data.moods.map((mood) => {
          return {
            id: mood._id,
            title: convertType(mood.title),
            startDate: new Date(mood.timestamp),
            endDate: new Date(mood.timestamp).setHours(0, 30, 0, 0),
          };
        });
        setMoods(convertedData);
      } catch (error) {
        console.log("Error fetching moods:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMoods();
  }, []);

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div>
            <LineChart moods={moods} />
          </div>
          <div>
            <DoughnutChart moods={moods} />
          </div>
        </>
      )}
    </div>
  );
}

export default WeeklyMood;
