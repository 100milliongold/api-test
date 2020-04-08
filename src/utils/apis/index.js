import { getApiData, cancel } from "./fetch";

/**
 * api 취소
 */
export const cancelApiData = () => {
  cancel();
};

/**
 * 자산 목록 조회하기
    GOPAX 지갑에서 취급하는 모든 자산의 목록을 조회할 수 있습니다.
 */
export const getAssets = () => getApiData({ url: `/assets` });
// const test = require("../functions/sample1.json");
// export const getAssets = () =>
//   new Promise((resolver, rejects) => resolver(test));

/**
 * 거래쌍 목록 조회하기
GOPAX 거래소에서 취급하는 모든 거래쌍의 목록을 조회할 수 있습니다.
 */
export const getTradingPairs = () => getApiData({ url: `/trading-pairs` });
/**
 * Ticker 조회하기
GOPAX 거래쌍에 대해 최근 체결된 거래의 티커를 조회할 수 있습니다. 티커에 대한 설명은 다음을 참조할 수 있습니다. https://www.investopedia.com/ask/answers/12/what-is-a-stock-ticker.asp
 */
export const getTradingPairsTickets = ({ tradingPair }) =>
  getApiData({ url: `/trading-pairs/${tradingPair}/ticker` });
/**
 * Orderbook 조회하기
GOPAX 거래쌍에 대해 오더북의 상태를 조회할 수 있습니다.
 */
export const getTradingPairsOrderbook = ({ tradingPair, level = undefined }) =>
  getApiData({
    url: `/trading-pairs/${tradingPair}/book${level ? `?level=${level}` : ""}`,
  });

// const test2 = require("../functions/sample1.json");
// export const getTradingPairsOrderbook = () =>
//   new Promise((resolver, rejects) => resolver(test2));

/**
 * 최근 체결 거래 조회하기
GOPAX 거래쌍에 대해 최근 발생한 체결 거래들을 조회할 수 있습니다.
 */
export const getTradingPairsTrades = ({ tradingPair, ...params }) =>
  getApiData({
    url: `/trading-pairs/${tradingPair}/trades?${
      params !== undefined
        ? Object.entries(params)
            .map(([key, value]) => `${key}=${value}`)
            .join("&")
        : ""
    }`,
  });
/**
 * 최근 24시간 통계 조회하기
GOPAX 거래쌍에 대해 최근 24시간의 통계치를 조회할 수 있습니다.
 * @param {*} param0 
 */
export const getTradingPairsStats = ({ tradingPair }) =>
  getApiData({ url: `/trading-pairs/${tradingPair}/stats` });
/**
 * 모든 거래쌍의 최근 24시간 통계 조회하기
GOPAX 모든 거래쌍에 대해 최근 24시간의 통계치를 조회할 수 있습니다.
 * @param {*} param0 
 */
export const getTradingPairsAllStats = () =>
  getApiData({ url: `/trading-pairs/stats` });
/**
 * 과거 기록 조회하기
GOPAX 거래쌍에 대해 과거 통계치를 조회할 수 있습니다.
 * @param {*} param0 
 */
export const getTradingPairsCandles = ({ tradingPair, ...params }) =>
  getApiData({
    url: `/trading-pairs/${tradingPair}/candles?${
      params !== undefined
        ? Object.entries(params)
            .map(([key, value]) => `${key}=${value}`)
            .join("&")
        : ""
    }`,
  });
