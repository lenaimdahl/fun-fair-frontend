import { useContext, useEffect, useState } from "react";
import LineChart from "../component/LineChart";
import { GlobalContext } from "../context/global.context";
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
  const { backendAPIInstance } = useContext(GlobalContext);
  const [moods, setMoods] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { moods: data } = await backendAPIInstance.getMoods();
        const convertedData = data
          .map((mood) => {
            return {
              id: mood._id,
              title: convertType(mood.title),
              date: mood.timestamp,
            };
          })
          .sort((moodA, moodB) => {
            return new Date(moodA.date) - new Date(moodB.date);
          });

        setMoods(convertedData);
      } catch (error) {
        console.error("Error fetching moods:", error);
      } finally {
        setIsLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="weekly-mood-page">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="weekly-mood-box">
          <h2>Your mood charts</h2>
          <div className="all-charts-box">
            <LineChart moods={moods} />
            <DoughnutChart moods={moods} />
          </div>
        </div>
      )}
    </div>
  );
}

export default WeeklyMood;
