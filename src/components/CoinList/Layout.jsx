import React from "react";
import CoinStats from "./CoinStats";
import Tabs from "../Tabs";

export default function Layout({ assets, view, changeTab, data }) {
  return (
    <div>
      <Tabs
        changeTab={changeTab}
        onClick={changeTab}
        value={view}
        list={[{ name: "KRW" }, { name: "BTC" }, { name: "ETH" }]}
      />
      <table>
        <colgroup>
          <col width="10%" />
          <col width="*" />
        </colgroup>
        <thead>
          <tr>
            <th>이름</th>
            <th>현재가</th>
            <th>변동</th>
            <th>최고가</th>
            <th>최저가</th>
            <th>거래대금</th>
          </tr>
        </thead>
        <tbody>
          {data !== undefined ? (
            data.map((item, index) => (
              <CoinStats
                key={index}
                {...item}
                name={`${assets[item.name.split("-")[0]]} (${
                  item.name.split("-")[0]
                })`}
              />
            ))
          ) : (
            <tr>
              <td colSpan={6}>
                <p>loading</p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
