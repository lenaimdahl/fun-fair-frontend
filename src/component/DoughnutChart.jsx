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
      onHover: handleHover,
      onLeave: handleLeave,
    },
  },
  title: {
    display: false,
  },
};

function handleHover(evt, item, legend) {
  legend.chart.data.datasets[0].backgroundColor.forEach(
    (color, index, colors) => {
      colors[index] =
        index === item.index || color.length === 9 ? color : color + "4D";
    }
  );
  legend.chart.update();
}
// doughnut hover behavior: Removes the alpha channel from background colors
function handleLeave(evt, item, legend) {
  legend.chart.data.datasets[0].backgroundColor.forEach(
    (color, index, colors) => {
      colors[index] = color.length === 9 ? color.slice(0, -2) : color;
    }
  );
  legend.chart.update();
}

function DoughnutChart({ moods }) {
  const [isLoading, setIsLoading] = useState(true);
  const [chart, setChart] = useState();

  useEffect(() => {
    if (!moods) return;
    console.log("mood]", moods);

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
    });

    const totalMoods = moodsCopy.length;
    const percentages = Object.keys(moodCount).map((key) => {
      const count = moodCount[key];
      const percentage =
        count > 0 ? ((count / totalMoods) * 100).toFixed(2) : 0;
      return {
        label: key,
        percentage,
      };
    });

    console.log("the totalMoods]", totalMoods);
    console.log("the percentage]", percentages);

    const labels = percentages.map(
      (mood) => `${mood.label} ${mood.percentage}%`
    );
    const data = percentages.map((mood) => mood.percentage);
    const backgroundColor = [
      "rgba(255, 99, 132, 0.2)",
      "rgba(54, 162, 235, 0.2)",
      "rgba(255, 206, 86, 0.2)",
      "rgba(75, 192, 192, 0.2)",
      "rgba(153, 102, 255, 0.2)",
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

    setIsLoading(false);
  }, [moods]);

  if (isLoading) {
    // return <Spinner />;
  } else {
    return (
      <div>
        <div className="doughnut-container">
          <br />
          {chart && <Doughnut options={options} data={chart} />}
          <br />
        </div>
      </div>
    );
  }
}

export default DoughnutChart;
