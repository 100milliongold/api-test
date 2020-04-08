import React, { Component } from "react";
import { ApiException } from "../../utils/apis/Exceptions";

import {
  getAssets,
  getTradingPairsAllStats,
  cancelApiData,
} from "../../utils/apis";
import Layout from "./Layout";

const REFRESH_TIME = 1000 * 60;
export default class CoinList extends Component {
  state = {
    view: "KRW",
    isData: false, // false : 데이터 가져오는중 , true : 요청완료
    isError: null,
  };

  componentDidMount() {
    this.initData().then((res) => {
      const { isError } = this.state;
      if (isError === null) {
        setTimeout(this.refreshData, REFRESH_TIME);
      }
    });
  }

  componentWillUnmount() {
    cancelApiData();
  }

  /**
   * 에러 처리
   */
  errorHandler = (isError) => {
    console.error(isError);
    if (!(isError instanceof ApiException)) {
      isError = new ApiException({ msg: "알수없는에러", status_code: null });
    }
    this.setState({ isError, isData: true });
    return isError;
  };

  /**
   * 코인 리스트
   */
  getAssets = () =>
    getAssets()
      .then((data) =>
        data.reduce(
          (memo, { id, name }, index, arr) => ({ ...memo, [id]: name }),
          {}
        )
      )
      .then((data) => ({ name: "assets", data }));

  /**
   * 24 시간 동안의 코인거래량
   */
  getTradingPairsAllStats = () =>
    getTradingPairsAllStats().then((res) => ({
      name: "trading_pairs_stats",
      data: {
        KRW: res.filter(({ name }) => {
          const [, target] = name.split("-");
          return target === "KRW";
        }),
        BTC: res.filter(({ name }) => {
          const [, target] = name.split("-");
          return target === "BTC";
        }),
        ETH: res.filter(({ name }) => {
          const [, target] = name.split("-");
          return target === "ETH";
        }),
      },
    }));

  /**
   * component 로드시 최초 실행
   */
  initData = () =>
    Promise.all([this.getAssets(), this.getTradingPairsAllStats()])
      .then((list) => {
        list.forEach(({ name, data }) => this.setState({ [name]: data }));
        this.setState({ isData: true });
        return list;
      })
      .catch(this.errorHandler);

  /**
   *
   */
  refreshData = () => {
    const { isError } = this.state;
    if (isError === null) {
      this.getTradingPairsAllStats()
        .then(({ name, data }) =>
          this.setState({ [name]: data }, () =>
            setTimeout(this.refreshData, REFRESH_TIME)
          )
        )
        .catch(this.errorHandler);
    }
  };

  changeTab = (view) => this.setState({ view });

  render() {
    const { assets, view, trading_pairs_stats, isError, isData } = this.state;
    const data =
      trading_pairs_stats !== undefined ? trading_pairs_stats[view] : undefined;
    return (
      <Layout
        isData={isData}
        isError={isError}
        assets={assets}
        data={data}
        view={view}
        changeTab={this.changeTab}
      />
    );
  }
}
