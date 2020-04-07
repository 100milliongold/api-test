import { GET  } from './methods'

const BASIC_URL = `https://api.gopax.co.kr`;
const CORS_URL = `https://cors-anywhere.herokuapp.com`
const config = {
    method: GET,
    headers: {
        'Access-Control-Request-Method': 'GET,HEAD',
        'Accept': 'application/json',
    },
}

function ApiException({msg , status_code}) {
    this.message = msg;
    this.name = "ApiException";
    this.status_code = status_code
}
ApiException.prototype.toString = function () {
    const { msg , name ,status_code} = this
    return `${name} : CODE-${status_code} ${msg}`
}

const parsseStatus = (status_code ) => {
    switch ( status_code ) {
        case 200: return true;
        case 401: throw new ApiException({msg : "잘못된 요청 - 요청 형식이 유효하지 않음", status_code })
        case 403: throw new ApiException({msg : "금지됨 - 요청한 리소스에 대한 접근 권한이 없음", status_code })
        case 404: throw new ApiException({msg : "찾을 수 없음", status_code })
        case 429: throw new ApiException({msg : "요청 한도 초과 - API 호출 횟수 제한 초과", status_code })
        case 500: throw new ApiException({msg : "내부 서버 오류 - 서버에 문제가 발생함", status_code })
        case 100: 
        case 106: throw new ApiException({msg : "자산 이름(Asset Name)이 올바르지 않음. 자산 목록 조회하기에서 전체 목록을 확인할 수 있습니다.", status_code })
        case 103: throw new ApiException({msg: "주문 종류(Type)가 올바르지 않음", status_code }) 
        case 101:
        case 104: throw new ApiException({msg : "거래 쌍(Trading Pair)이 올바르지 않음. 거래쌍 목록 조회하기에서 전체 목록을 확인할 수 있습니다.", status_code })
        case 105: throw new ApiException({msg : "거래 쌍(Trading Pair)이 일시적으로 비활성화 되어있음. 거래쌍 목록 조회하기에서 전체 목록을 확인할 수 있습니다.", status_code })
        case 107: throw new ApiException({msg : "주문 수량이 올바르지 않음.", status_code })
        case 108: throw new ApiException({msg : "주문 가격이 올바르지 않음.", status_code })
        case 201: throw new ApiException({msg : "주문을 위한 잔고가 부족.", status_code })
        case 202: throw new ApiException({msg : "주문 고유번호가 일치하지 않음.", status_code })
        case 203: throw new ApiException({msg : "주문 수량 X 주문 가격이 너무 큼.", status_code })
        case 204: throw new ApiException({msg : "현재 매수 주문이 허용되지 않음. 공지사항을 확인하십시오.", status_code })
        case 206: throw new ApiException({msg : "주문 옵션들이 서로 상충됨.", status_code })
        case 10010: throw new ApiException({msg : "출금지갑주소가 올바르지 않음.", status_code })
        case 10041: throw new ApiException({msg : "거래소가 올바르지 않음.", status_code })
        case 10155: throw new ApiException({msg : "API키가 올바르지 않음.", status_code })
        case 10202: throw new ApiException({msg : "주문 결제 수량이 부족.", status_code })
        default: throw new ApiException({msg : "알수 없는 status 코드", status_code })
    }
}

const getApiData = ({ url = ''}) => {
    // Default options are marked with *
    return fetch(`${CORS_URL}/${BASIC_URL}${url}` , config)
        .then(response => {
            // console.log(response);
            const { status  } = response
            return (parsseStatus(status)) ? response.text() : undefined
        }) // parses JSON response into native JavaScript objects 
        .then(text => (text ? JSON.parse(text) : undefined))
        .catch (error => console.error('Error:', error))
}



/**
 * 자산 목록 조회하기
    GOPAX 지갑에서 취급하는 모든 자산의 목록을 조회할 수 있습니다.
 */
export const getAssets = () => getApiData({ url: `/assets`});
/**
 * 거래쌍 목록 조회하기
GOPAX 거래소에서 취급하는 모든 거래쌍의 목록을 조회할 수 있습니다.
 */
export const getTradingPairs = () => getApiData({url : `/trading-pairs`});
/**
 * Ticker 조회하기
GOPAX 거래쌍에 대해 최근 체결된 거래의 티커를 조회할 수 있습니다. 티커에 대한 설명은 다음을 참조할 수 있습니다. https://www.investopedia.com/ask/answers/12/what-is-a-stock-ticker.asp
 */
export const getTradingPairsTickets = ({tradingPair}) => getApiData({url : `/trading-pairs/${tradingPair}/ticker`});
/**
 * Orderbook 조회하기
GOPAX 거래쌍에 대해 오더북의 상태를 조회할 수 있습니다.
 */
export const getTradingPairsOrderbook = ({ tradingPair, level = undefined }) => getApiData({url : `/trading-pairs/${tradingPair}/book${ level ? `?level=${level}` : "" }`});
/**
 * 최근 체결 거래 조회하기
GOPAX 거래쌍에 대해 최근 발생한 체결 거래들을 조회할 수 있습니다.
 */
export const getTradingPairsTrades = ({ tradingPair, ...params }) => getApiData({
    url: `/trading-pairs/${tradingPair}/trades?${
        params !== undefined ? Object.entries(params).map(([key, value]) => `${key}=${value}`).join("&") : ""
    }`});
/**
 * 최근 24시간 통계 조회하기
GOPAX 거래쌍에 대해 최근 24시간의 통계치를 조회할 수 있습니다.
 * @param {*} param0 
 */
export const getTradingPairsStats = ({ tradingPair }) => getApiData({ url: `/trading-pairs/${tradingPair}/stats`});
/**
 * 모든 거래쌍의 최근 24시간 통계 조회하기
GOPAX 모든 거래쌍에 대해 최근 24시간의 통계치를 조회할 수 있습니다.
 * @param {*} param0 
 */
export const getTradingPairsAllStats = () => getApiData({ url: `/trading-pairs/stats`});
/**
 * 과거 기록 조회하기
GOPAX 거래쌍에 대해 과거 통계치를 조회할 수 있습니다.
 * @param {*} param0 
 */
export const getTradingPairsCandles = ({ tradingPair, ...params }) => getApiData({
    url: `/trading-pairs/${tradingPair}/candles?${
        params !== undefined ? Object.entries(params).map(([key, value]) => `${key}=${value}`).join("&") : ""
        }`});
