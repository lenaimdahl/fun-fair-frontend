import "../css/table.css";
import { useEffect, useState } from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
      title: {
        display: false,
      },
    },
  },
};

function convertEmoji(type) {
  switch (type) {
    case "😊":
      return 5;
    case "😍":
      return 4;
    case "😴":
      return 3;
    case "😔":
      return 2;
    case "😡":
      return 1;
    default:
      return "";
  }
}

function WeekTable({ moods }) {
  const [isLoading, setIsLoading] = useState(true);
  const [chart, setChart] = useState();

  useEffect(() => {
    if (!moods) return;
    const moodsCopy = moods.slice();
    const lastSevenMoods = moodsCopy.reverse().slice(0, 7);
    const moodsAsNumbers = lastSevenMoods.map((mood) => {
      return convertEmoji(mood.title);
    });

    const pointStyles = lastSevenMoods.map((mood) => {
      return mood.title;
    });
    console.log(lastSevenMoods, pointStyles);

    setChart({
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      datasets: [
        {
          label: "Mood",
          data: moodsAsNumbers,
          pointRadius: 10,
          pointStyle: pointStyles,
          borderColor: "#D9FDED",
          backgroundColor: "#D9FDED33",
          fill: true,
        },
      ],
    });

    setIsLoading(false);
  }, [moods]);

  if (isLoading) {
    // return <Spinner />;
  } else {
    return (
      <div>
        <div>
          <h2>current week</h2>
          <p></p>
        </div>
        <Line options={options} data={chart} />
      </div>
    );
  }
}

export default WeekTable;
