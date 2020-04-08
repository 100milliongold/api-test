import React from "react";
import style from "./CoinList.module.css";
import CoinStats from "./CoinStats";

export function Table({ assets, data, isData, isError }) {
  return (
    <div>
      <div className={style.TableHeader}>
        <table className={style.Table}>
          <colgroup>
            <col width="14%" />
            <col width="14%" />
            <col width="14%" />
            <col width="14%" />
            <col width="14%" />
            <col width="14%" />
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
              <th>갱신시간</th>
            </tr>
          </thead>
        </table>
      </div>
      <div className={style.TableBody}>
        <table className={style.Table}>
          <colgroup>
            <col width="14%" />
            <col width="14%" />
            <col width="14%" />
            <col width="14%" />
            <col width="14%" />
            <col width="14%" />
            <col width="*" />
          </colgroup>
          <tbody>
            {
              /* 로딩중 */
              !isData && (
                <tr>
                  <td className={style.Loading} colSpan={7}>
                    <p>loading</p>
                  </td>
                </tr>
              )
            }
            {}
            {
              /* 정상 */
              isData &&
                isError === null &&
                data !== undefined &&
                data.map((item, index) => (
                  <CoinStats
                    key={index}
                    {...item}
                    name={`${assets[item.name.split("-")[0]]} (${
                      item.name.split("-")[0]
                    })`}
                  />
                ))
            }
            {
              /* 비정상적인 출력 */
              isData && isError !== null && (
                <tr>
                  <td className={style.Loading} colSpan={7}>
                    <p>{`데이터 가져오기 실패 : ${
                      isError.message || "알수 없는 에러발생"
                    }`}</p>
                  </td>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}

export const MemoizedTable = React.memo(Table);
