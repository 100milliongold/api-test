import React from "react";

export default function CoinStats({
  close,
  high,
  low,
  name,
  open,
  time,
  volume,
}) {
  return (
    <tr>
      <td>{name}</td>
      <td>{close}</td>
      <td>{close - open}</td>
      <td>{high}</td>
      <td>{low}</td>
      <td>{volume}</td>
    </tr>
  );
}
