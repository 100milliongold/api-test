import React from 'react';
import { render, } from '@testing-library/react';
import Table from '../components/CoinList/Table';
import { ApiException } from "../utils/apis/Exceptions";

describe("<Table />", () => {
  it("스냅샷 테스트", () => {
    const utils = render(<Table
      isData={false}
      isError={null}
      assets={undefined}
      data={undefined}
    />);
    expect(utils.container).toMatchSnapshot();
  });
  it("정상 테스트", () => {
    const success_utils = render(<Table
      isData={true}
      isError={null}
      assets={{
        "ETH": '이더리움',
        "BTC": '비트코인',
        "KRW": '대한민국 원',
        "BCH": '비트코인 캐시',
      }}
      data={[
        {
          "name": "ETH-KRW",
          "open": 780000,
          "high": 784000,
          "low": 756000,
          "close": 763500,
          "volume": 1602.93236136,
          "time": "2018-03-14T05:13:08.364Z"
        }, {
          "name": "BTC-KRW",
          "open": 10308000,
          "high": 10362500,
          "low": 9901000,
          "close": 10074000,
          "volume": 1687.88476801,
          "time": "2018-03-14T05:12:08.245Z"
        }, {
          "name": "BCH-KRW",
          "open": 1234000,
          "high": 1234000,
          "low": 1120000,
          "close": 1149500,
          "volume": 35.12077207,
          "time": "2018-03-14T04:40:06.535Z"
        }
      ]}
    />);
    success_utils.getByText("비트코인 (BTC)");
    success_utils.getByText("이더리움 (ETH)");
    success_utils.getByText("비트코인 캐시 (BCH)");

  });
  it("로딩 테스트", () => {
    const loading_utils = render(<Table
      isData={false}
      isError={null}
      assets={undefined}
      data={undefined}
    />);
    loading_utils.getByText("loading");
  });
  it("데이터 가져오기 실패 시 테스트", () => {
    const fail_utils = render(<Table
      isData={true}
      isError={new ApiException({ msg: "test error", status_code: 404 })}
      assets={undefined}
      data={undefined}
    />);
    fail_utils.getByText(/데이터 가져오기 실패 :/);
  });
});