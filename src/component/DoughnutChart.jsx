import "../css/App.css";
import { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: "bottom",
      align: "center",
      labels: {
        usePointStyle: true,
        pointStyle: "circle",
        color: "#F5F2FF",
        padding: 30,
      },
    },
  },
  title: {
    display: false,
  },
};

// function convertEmoji(type) {
//   switch (type) {
//     case "😊":
//       return 5;
//     case "😍":
//       return 4;
//     case "😴":
//       return 3;
//     case "😔":
//       return 2;
//     case "😡":
//       return 1;
//     default:
//       return "";
//   }
// }

function DoughnutChart({ moods }) {
  const [isLoading, setIsLoading] = useState(true);
  const [chart, setChart] = useState();

  useEffect(() => {
    // deal with async behavior
    if (!moods) return;
    console.log(moods);
    const moodsCopy = moods.slice();
    const moodCount = {
      happy: 0,
      inLove: 0,
      sleepy: 0,
      sad: 0,
      angry: 0,
    };

    // Count the occurrences of each mood
    moodsCopy.forEach((mood) => {
      switch (mood) {
        case "😊":
          moodCount.happy++;
          break;
        case "😍":
          moodCount.inLove++;
          break;
        case "😴":
          moodCount.sleepy++;
          break;
        case "😔":
          moodCount.sad++;
          break;
        case "😡":
          moodCount.angry++;
          break;
        default:
          break;
      }
    });
    // DONE: functionality to summarize all values
    // create an array with unique values, and sort descending >> [5,4,3,2,1]
    const moodsUniqueSorted = [...new Set(moodsCopy)].sort((a, b) => b - a);
    // get the total sum for each number of [5,4,3,2,1]
    const moodsSummarized = moodsUniqueSorted.map(
      (num) => moods.join("").split(num).length - 1
    );
    // DONE: draw chart
    setChart({
      labels: ["Happy", "in Love", "sleepy", "sad", "angry"],
      datasets: [
        {
          label: "Mood",
          data: moodsSummarized,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    });

    setIsLoading(false);
  }, [moods]);

  if (isLoading) {
    // return <Spinner />;
  } else {
    return (
      <div className="doughnut-container">
        <Doughnut options={options} data={chart} />
      </div>
    );
  }
}

export default DoughnutChart;
