import React from "react";

export default function Tabs({ view, list = [], onClick }) {
  return (
    <div>
      <ul>
        {list.map(({ name }, index) => (
          <li key={index} className={view === "" ? "active" : ""}>
            <p onClick={(e) => onClick(name)}>{name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

Tabs.defaultProps = {
  onClick: () => console.warn("onClick not defind"),
};
