import { useState } from "react";
import { useDidMount } from "rooks";
import { get } from "api/fetch";
import URL from "api/url";
import { Box, Alert, AlertTitle } from "@mui/material";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "redux/modules/loadingModule";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);
import { isUndefined } from "utils/typeguard";

type StockData = {
  day: string;
  open: number;
  close: number;
  high: number;
  low: number;
};

const ChartScreen: React.VFC = () => {
  const dispatch = useDispatch();
  const [labels, setLabels] = useState<string[]>([]);
  const [data, setData] =
    useState<{ label: string; data: number[]; borderColor: string }>();
  useDidMount(() => {
    dispatch(showLoading());
    const fetchData = async () => {
      const result = await get<StockData[]>(
        URL.GET_STOCK_DATA() + "?" + new Date().toString()
      );
      setData({
        label: "BTC",
        data: result.map((row) => row.close),
        borderColor: "rgb(20, 47, 248)",
      });
      setLabels(result.map((row) => row.day));
    };
    fetchData();
    dispatch(hideLoading());
  });
  return (
    <>
      <Box sx={{ mb: 2 }}>
        <Alert severity="info">
          <AlertTitle>BTCのチャート</AlertTitle>
        </Alert>
      </Box>
      <Box>
        {labels.length > 0 && !isUndefined(data) && (
          <Line data={{ labels: labels, datasets: [data] }} />
        )}
      </Box>
    </>
  );
};

export default ChartScreen;
