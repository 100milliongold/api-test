import React from "react";
import { MemoizedTabs } from "../Tabs";

import Table from "./Table";

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
      <MemoizedTabs
        changeTab={changeTab}
        onClick={changeTab}
        value={view}
        list={[{ name: "KRW" }, { name: "BTC" }, { name: "ETH" }]}
      />
      <Table assets={assets} data={data} isData={isData} isError={isError} />
    </>
  );
}
