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
      labels: {
        usePointStyle: true,
        pointStyle: "circle",
        color: "black",
        padding: 30,
      },
    },
    title: {
      color: "white",
      display: true,
      text: "Your mood in the last four weeks!",
    },
  },
};

function DoughnutChart({ moods }) {
  const [chart, setChart] = useState();

  useEffect(() => {
    if (!moods) {
      return;
    }

    const moodsCopy = moods.slice().reverse().slice(0, 28);
    const moodCount = {
      happy: 0,
      inLove: 0,
      sleepy: 0,
      sad: 0,
      angry: 0,
    };

    // Count the occurrences of each mood
    for (const mood of moodsCopy) {
      switch (mood.title) {
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
    }

    const totalMoods = moodsCopy.length;
    const percentages = Object.entries(moodCount).map(([label, count]) => {
      const percentage =
        count > 0 ? ((count / totalMoods) * 100).toFixed(2) : 0;
      return {
        label,
        percentage,
      };
    });

    const labels = percentages.map(
      (mood) => `${mood.label}: ${mood.percentage}%`
    );
    const data = percentages.map((mood) => mood.percentage);
    const backgroundColor = [
      "rgba(255, 99, 132, 0.4)",
      "rgba(54, 162, 235, 0.4)",
      "rgba(255, 206, 86, 0.4)",
      "rgba(75, 192, 192, 0.4)",
      "rgba(153, 102, 255, 0.4)",
    ];
    const borderColor = [
      "rgba(255, 99, 132, 1)",
      "rgba(54, 162, 235, 1)",
      "rgba(255, 206, 86, 1)",
      "rgba(75, 192, 192, 1)",
      "rgba(153, 102, 255, 1)",
    ];

    setChart({
      labels,
      datasets: [
        {
          label: "Mood",
          data,
          backgroundColor,
          borderColor,
          borderWidth: 1,
        },
      ],
    });
  }, [moods]);

  return (
    <div className="doughnut-container">
      {chart && <Doughnut options={options} data={chart} />}
    </div>
  );
}

export default DoughnutChart;
