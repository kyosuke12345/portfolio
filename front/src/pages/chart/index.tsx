import { useState } from "react";
import { useDidMount } from "rooks";
import { get } from "api/fetch";
import URL from "api/url";
import { Box, Alert, AlertTitle } from "@mui/material";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "redux/modules/loadingModule";
import {
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
  VictoryCandlestick,
} from "victory";

type StockData = {
  x: string;
  open: number;
  close: number;
  high: number;
  low: number;
};

const ChartScreen: React.VFC = () => {
  const dispatch = useDispatch();
  const [stockData, setStockData] = useState<StockData[]>([]);
  useDidMount(() => {
    dispatch(showLoading());
    const fetchData = async () => {
      const result = await get<StockData[]>(
        URL.GET_STOCK_DATA() + "?" + new Date().toString()
      );
      setStockData(result);
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
        {stockData.length > 0 && (
          <VictoryChart
            scale={{ x: "time", y: "linear" }}
            domainPadding={{ x: 10 }}
            theme={VictoryTheme.material}
          >
            <VictoryAxis dependentAxis />
            <VictoryAxis />
            <VictoryCandlestick
              candleColors={{ positive: "white", negative: "black" }}
              data={stockData}
              candleWidth={10}
            />
          </VictoryChart>
        )}
      </Box>
    </>
  );
};

export default ChartScreen;
