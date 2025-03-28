import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title} from "chart.js";
import { IconRefresh } from "@tabler/icons-react";
import { IconLogout2 } from "@tabler/icons-react";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title
);

// Definir tipos
interface LogEntry {
  status?: string;
  logLevel?: string;
  //eslint-disable-next-line
  [key: string]: any;
}

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
    borderColor: string;
    borderWidth: number;
    hoverBackgroundColor: string;
  }[];
}

const Inicio = () => {
  const [chartData1, setChartData1] = useState<ChartData | null>(null);
  const [chartData2, setChartData2] = useState<ChartData | null>(null);
  const [groupBy, setGroupBy] = useState<"status" | "logLevel">("status");
  const [totalCount1, setTotalCount1] = useState<number>(0);
  const [totalCount2, setTotalCount2] = useState<number>(0);
  const [logData1, setLogData1] = useState<LogEntry[]>([]);
  const [logData2, setLogData2] = useState<LogEntry[]>([]);

  // Obtener los datos de la API una sola vez al montar el componente
  const getData = useCallback(async () => {
    try {
      const response1 = await axios.get<LogEntry[]>(
        "https://ej02.onrender.com/api/logs"
      );
      const response2 = await axios.get<LogEntry[]>(
        "https://ej02.onrender.com/api/logs"
      );
      const data1 = response1.data;
      const data2 = response2.data;
      setLogData1(data1);
      setLogData2(data2);
      setTotalCount1(data1.length);
      setTotalCount2(data2.length);
      // Llamar a la función para reorganizar los datos
      reorganizeData(data1, setChartData1, "status");
      reorganizeData(data2, setChartData2, "status");
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  }, []);

  // Función para reorganizar los datos según el groupBy
  const reorganizeData = (
    logData: LogEntry[],
    setChartData: (data: ChartData) => void,
    groupBy: "status" | "logLevel"
  ) => {
    const countBy: Record<string, number> = logData.reduce(
      (acc: Record<string, number>, log: LogEntry) => {
        const key = String(log[groupBy] || "Desconocido");
        acc[key] = (acc[key] || 0) + 1;
        return acc;
      },
      {}
    );

    const labels = Object.keys(countBy);
    const data = Object.values(countBy);
    const colors = labels.map((label) =>
      groupBy === "status"
        ? label === "200"
          ? "#27e5df"
          : label === "500"
          ? "#e74c3c"
          : "#f39c12"
        : label.toUpperCase() === "INFO"
        ? "#2ecc71"
        : label.toUpperCase() === "ERROR"
        ? "#e74c3c"
        : "#3498db"
    );

    setChartData({
      labels,
      datasets: [
        {
          label: groupBy === "status" ? "Status HTTP" : "Log Level",
          data,
          backgroundColor: colors,
          borderColor: "#007BFF",
          borderWidth: 1,
          hoverBackgroundColor: "#ff9900",
        },
      ],
    });
  };

  // Actualizar los datos cuando se presiona el botón de actualizar
  const handleUpdateData = () => {
    getData();
  };

  // Cambiar la agrupación (solo reorganiza los datos)
  const handleGroupByChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newGroupBy = e.target.value as "status" | "logLevel";
    setGroupBy(newGroupBy);
    reorganizeData(logData1, setChartData1, newGroupBy);
    reorganizeData(logData2, setChartData2, newGroupBy);
  };

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
  };

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <div className="d-flex bg-dark">
      <div className="container w-75 mt-5">
        <h1 className="text-center text-white">Inicio</h1>

        <div className="mb-4 p-2">
          <label className="text-white mr-2">Agrupar por:</label>
          <select
            className="form-select mt-2"
            value={groupBy}
            onChange={handleGroupByChange}
          >
            <option value="status">Status HTTP</option>
            <option value="logLevel">Nivel de Log</option>
          </select>
        </div>

        <div className="text-white d-flex flex-row justify-content-between">
          <p>Total de registros servidor 5001: {totalCount1}</p>
          <p>Total de registros servidor 5002: {totalCount2}</p>
        </div>

        <h2 className="text-white">Servidor 1 - con rate limit</h2>
        <div className="d-flex justify-content-center align-items-center mb-5">
          {chartData1 ? (
            <Bar data={chartData1} options={{ responsive: true }} />
          ) : (
            <p className="text-white">Cargando...</p>
          )}
        </div>

        <h2 className="text-white">Servidor 2 - sin rate limit</h2>
        <div className="d-flex justify-content-center align-items-center">
          {chartData2 ? (
            <Bar data={chartData2} options={{ responsive: true }} />
          ) : (
            <p className="text-white">Cargando...</p>
          )}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", position: "fixed", bottom: "30px", right: "30px", zIndex: 1000 }}>
        <button onClick={handleUpdateData} className="btn btn-primary mb-2">
          <IconRefresh style={{ color: "white" }} stroke={2} />
        </button>

        <button onClick={handleLogout} className="btn btn-danger">
          <IconLogout2 style={{ color: "white" }} stroke={2} />
        </button>
      </div>
    </div>
  );
};

export default Inicio;
