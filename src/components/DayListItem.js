import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss";

export default function DayListItem(props) {
  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  });

  const formatSpots = spotsRemaining => {
    if (spotsRemaining === 0) {
      return "no spots remaining";
    }
    if (spotsRemaining === 1) {
      return "1 spot remaining";
    }
    if (spotsRemaining === 2) {
      return "2 spots remaining";
    }
    if (spotsRemaining === 3) {
      return "3 spots remaining";
    }
    if (spotsRemaining === 4) {
      return "4 spots remaining";
    }
    if (spotsRemaining === 5) {
      return "5 spots remaining";
    }
  };

  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}
