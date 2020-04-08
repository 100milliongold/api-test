/**
 * API 에러
 * @param {Exception}} param0 message , status code
 */
export function ApiException({ msg, status_code }) {
  this.message = msg;
  this.name = "ApiException";
  this.status_code = status_code;
}
/**
 * 문자열 출력 정의
 */
ApiException.prototype.toString = function () {
  const { msg, name, status_code } = this;
  return `${name} : CODE-${status_code} ${msg}`;
};
