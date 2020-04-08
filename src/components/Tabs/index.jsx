import React from "react";
import style from "./Tabs.module.css";

export default function Tabs({ value, list = [], onClick }) {
  return (
    <div className={style.wrap}>
      <ul className={style.taplist}>
        {list.map(({ name }, index) => (
          <li
            key={index}
            className={value === name ? style.active : ""}
            onClick={(e) => onClick(name)}
          >
            <p>{name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

Tabs.defaultProps = {
  onClick: () => console.warn("onClick not defind"),
};
