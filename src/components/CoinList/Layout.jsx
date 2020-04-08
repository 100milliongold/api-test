import React from "react";
import Tabs from "../Tabs";

import { MemoizedTable } from "./Table";

export default function Layout({
  view,
  changeTab,
  assets,
  data,
  isData,
  isError,
}) {
  return (
    <>
      <Tabs
        changeTab={changeTab}
        onClick={changeTab}
        value={view}
        list={[{ name: "KRW" }, { name: "BTC" }, { name: "ETH" }]}
      />
      <MemoizedTable
        assets={assets}
        data={data}
        isData={isData}
        isError={isError}
      />
    </>
  );
}
