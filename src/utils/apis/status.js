import { ApiException } from "./Exceptions";

/**
 * API 에서 status code 분석
 */
export const parsseStatus = (status_code) => {
  switch (status_code) {
    case 200:
      return true;
    case 401:
      throw new ApiException({
        msg: "잘못된 요청 - 요청 형식이 유효하지 않음",
        status_code,
      });
    case 403:
      throw new ApiException({
        msg: "금지됨 - 요청한 리소스에 대한 접근 권한이 없음",
        status_code,
      });
    case 404:
      throw new ApiException({ msg: "찾을 수 없음", status_code });
    case 429:
      throw new ApiException({
        msg: "요청 한도 초과 - API 호출 횟수 제한 초과",
        status_code,
      });
    case 500:
      throw new ApiException({
        msg: "내부 서버 오류 - 서버에 문제가 발생함",
        status_code,
      });
    case 100:
    case 106:
      throw new ApiException({
        msg:
          "자산 이름(Asset Name)이 올바르지 않음. 자산 목록 조회하기에서 전체 목록을 확인할 수 있습니다.",
        status_code,
      });
    case 103:
      throw new ApiException({
        msg: "주문 종류(Type)가 올바르지 않음",
        status_code,
      });
    case 101:
    case 104:
      throw new ApiException({
        msg:
          "거래 쌍(Trading Pair)이 올바르지 않음. 거래쌍 목록 조회하기에서 전체 목록을 확인할 수 있습니다.",
        status_code,
      });
    case 105:
      throw new ApiException({
        msg:
          "거래 쌍(Trading Pair)이 일시적으로 비활성화 되어있음. 거래쌍 목록 조회하기에서 전체 목록을 확인할 수 있습니다.",
        status_code,
      });
    case 107:
      throw new ApiException({
        msg: "주문 수량이 올바르지 않음.",
        status_code,
      });
    case 108:
      throw new ApiException({
        msg: "주문 가격이 올바르지 않음.",
        status_code,
      });
    case 201:
      throw new ApiException({ msg: "주문을 위한 잔고가 부족.", status_code });
    case 202:
      throw new ApiException({
        msg: "주문 고유번호가 일치하지 않음.",
        status_code,
      });
    case 203:
      throw new ApiException({
        msg: "주문 수량 X 주문 가격이 너무 큼.",
        status_code,
      });
    case 204:
      throw new ApiException({
        msg: "현재 매수 주문이 허용되지 않음. 공지사항을 확인하십시오.",
        status_code,
      });
    case 206:
      throw new ApiException({
        msg: "주문 옵션들이 서로 상충됨.",
        status_code,
      });
    case 10010:
      throw new ApiException({
        msg: "출금지갑주소가 올바르지 않음.",
        status_code,
      });
    case 10041:
      throw new ApiException({ msg: "거래소가 올바르지 않음.", status_code });
    case 10155:
      throw new ApiException({ msg: "API키가 올바르지 않음.", status_code });
    case 10202:
      throw new ApiException({ msg: "주문 결제 수량이 부족.", status_code });
    default:
      throw new ApiException({ msg: "알수 없는 status 코드", status_code });
  }
};
