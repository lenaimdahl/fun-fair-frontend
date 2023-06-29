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
    // deal with async behavior
    if (!moods) return;
    const moodsCopy = moods.slice();

    // DONE: functionality to summarize all values
    // create an array with unique values, and sort descending >> [5,4,3,2,1]
    const moodsUniqueSorted = [...new Set(moodsCopy)].sort((a, b) => b - a);
    // get the total sum for each number of [5,4,3,2,1]
    const moodsSummarized = moodsUniqueSorted.map(
      (num) => moods.join("").split(num).length - 1
    );

    // DONE: draw chart
    setChart({
      labels: ["happy", "in love", "sleepy", "sad", "angry"],
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
