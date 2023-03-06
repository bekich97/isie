import React from "react";

export default function ServiceCard({
  image = require("../assets/imgs/service1.png"),
  text = "Error",
}) {
  return (
    <div className="col-lg-4 col-md-4">
      <div
        className="card"
        style={{
          backgroundImage: `url(${image})`,
        }}
      >
        <div className="text-wrapper">
          <p>{text}</p>
        </div>
      </div>
    </div>
  );
}
