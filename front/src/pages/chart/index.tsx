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

type Response = {
  btc: StockData[];
  eth: StockData[];
  sol: StockData[];
};

type DataType = {
  label: string;
  data: number[];
  borderColor: string;
};

const BORDRE_COLOR = {
  btc: "rgb(51, 206, 255)",
  eth: "rgb(70, 255, 51)",
  sol: "rgb(255, 165, 51)",
};

const ChartScreen: React.VFC = () => {
  const dispatch = useDispatch();
  const [labels, setLabels] = useState<string[]>([]);
  const [datas, setDatas] = useState<DataType[]>();
  useDidMount(() => {
    dispatch(showLoading());
    const fetchData = async () => {
      const result = await get<Response>(
        URL.GET_STOCK_DATA() + "?" + new Date().toString()
      );
      const dl: DataType[] = [];
      for (const key in result) {
        const dicKey = key as keyof Response;
        dl.push({
          label: key.toUpperCase(),
          data: result[dicKey].map((row) => row.close),
          borderColor: BORDRE_COLOR[dicKey],
        });
      }

      setDatas(dl);
      setLabels(result.btc.map((row) => row.day));
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
        {labels.length > 0 && !isUndefined(datas) && (
          <Line data={{ labels: labels, datasets: datas }} />
        )}
      </Box>
    </>
  );
};

export default ChartScreen;
