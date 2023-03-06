import React from "react";

export default function TrendItem() {

  return (
    <div className="trend-list-item">
      <div className="left-part">
        <span className="top-part">Clothes - Ashgabat</span>
        <span className="trend-name">Collins'</span>
        <span className="bottom-part">102 posts</span>
      </div>
      <button className="clear-btn">
        <span className="material-icons-outlined">more_horiz</span>
        <div className="popover">
            <a href="#!" className="clear-btn first">
                <span className="material-icons-outlined icon">sentiment_satisfied</span>
                <span className="text">I liked this tag</span>
            </a>
            <a href="#!" className="clear-btn second">
                <span className="material-icons-outlined icon">sentiment_dissatisfied</span>
                <span className="text">I didn't like this tag</span>
            </a>
        </div>
      </button>
    </div>
  );
}
