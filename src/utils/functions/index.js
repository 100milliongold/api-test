export function Log(...params) {
  console.log(...params);
  return { ...params };
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function number_formatting(number) {
  number = parseFloat(number);
  number = Math.round(number * 100) / 100;
  return numberWithCommas(number);
}

export function DateToString(time) {
  let datetime = new Date(time);
  const year = datetime.getFullYear().toString();
  const month = datetime.getMonth().toString();
  const date = datetime.getDate().toString();
  const hour = datetime.getHours().toString();
  const min = datetime.getMinutes().toString();
  const sec = datetime.getSeconds().toString();

  return `${year}-${month.padStart(2, "0")}-${date.padStart(
    2,
    "0"
  )} ${hour.padStart(2, "0")}:${min.padStart(2, "0")}:${sec.padStart(2, "0")}`;
}
