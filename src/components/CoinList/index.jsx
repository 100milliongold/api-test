import React, { Component } from "react";
import { getAssets, getTradingPairsAllStats } from "../../utils/apis";
import Layout from "./Layout";

const REFRESH_TIME = 1000 * 60;
export default class CoinList extends Component {
  state = {
    view: "KRW",
    isData: false,
  };

  componentDidMount() {
    this.initData();
    // .then(this.refreshData);
  }
  /**
   * 코인 리스트
   */
  getAssets = getAssets()
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
  getTradingPairsAllStats = getTradingPairsAllStats().then((res) => ({
    name: "trading_pairs_stats",
    data: {
      KRW: res.filter(({ name }) => name.split("-")[1] === "KRW"),
      BTC: res.filter(({ name }) => name.split("-")[1] === "BTC"),
      ETH: res.filter(({ name }) => name.split("-")[1] === "ETH"),
    },
  }));

  initData = () =>
    Promise.all([this.getAssets, this.getTradingPairsAllStats])
      .then((list) => {
        list.forEach(({ name, data }) => this.setState({ [name]: data }));
        this.setState({ isData: true });
        return list;
      })
      .catch(console.error);

  refreshData = () => {
    console.log("refreshData load");
    const { isData } = this.state;
    if (isData) {
      this.getTradingPairsAllStats
        .then(({ name, data }) =>
          this.setState({ [name]: data }, () =>
            setTimeout(this.refreshData, REFRESH_TIME)
          )
        )
        .catch((error) => {
          console.error(error);
          this.setState({ isData: false });
        });
    }
  };

  changeTab = (view) => this.setState({ view });

  render() {
    const { assets, view, trading_pairs_stats } = this.state;
    const data =
      trading_pairs_stats !== undefined ? trading_pairs_stats[view] : undefined;
    return (
      <Layout
        assets={assets}
        data={data}
        view={view}
        changeTab={this.changeTab}
      />
    );
  }
}
