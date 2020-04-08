import { GET } from "./methods";
import { parsseStatus } from "./status";

const controller = new AbortController();
const signal = controller.signal;

const BASIC_URL = `https://api.gopax.co.kr`;
// const BASIC_URL = ``;

const CORS_URL = `https://cors-anywhere.herokuapp.com`;
// const CORS_URL = ``;

/**
 * fetch 설정
 */
const config = {
  signal,
  method: GET,
  headers: {
    "Access-Control-Request-Method": "GET,HEAD",
    Accept: "application/json",
  },
};

export function cancel() {
  controller.abort();
}

/**
 * fetch 을 통한 api 호출
 * @param {json} param0
 */
export const getApiData = ({ url = "" }) => {
  // Default options are marked with *
  return fetch(`${CORS_URL}/${BASIC_URL}${url}`, config)
    .then((response) => {
      // console.log(response);
      const { status } = response;
      return parsseStatus(status) ? response.text() : undefined;
    }) // parses JSON response into native JavaScript objects
    .then((text) => (text ? JSON.parse(text) : undefined));
};
