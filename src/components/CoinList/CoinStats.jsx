import React from "react";
import { number_formatting, DateToString } from "../../utils/functions";

export default function CoinStats({
  close,
  high,
  low,
  name,
  open,
  time,
  volume,
}) {
  // 변동값
  const fluct = (Math.round((close - open) * 1e12) / 1e12 / open) * 100;
  return (
    <tr>
      <td>{name}</td>
      <td>{number_formatting(close)}</td>
      <td>{number_formatting(fluct)}</td>
      <td>{number_formatting(high)}</td>
      <td>{number_formatting(low)}</td>
      <td>{number_formatting(volume)}</td>
      <td>{DateToString(time)}</td>
    </tr>
  );
}
