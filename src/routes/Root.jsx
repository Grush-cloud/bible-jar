import { Link } from "react-router-dom";
import { useState } from "react";
function Logo({ color }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      x="0px"
      y="0px"
      viewBox="-489 491 100 125"
      className="bible-logo"
      fill={color} // Set the fill color dynamically based on the prop
    >
      <path d="M-451.5,561.8v-33.3h-16.7v-8.3h16.7v-16.7h8.3v16.7h16.7v8.3h-16.7v33.3H-451.5z M-393.2,591v-83.3l-8.3-8.3v83.3h-66.7  c-4.2,0-8.3-2.1-8.3-8.3h66.7V491h-62.5c-12.5,0-12.5,0-12.5,12.5v70.8c0,12.5,10.4,16.7,20.8,16.7H-393.2z" />
    </svg>
  );
}

export default function Root() {
  const emotions = [
    { name: "thankful", label: "Thankful", color: "red" },
    { name: "happy", label: "Happy", color: "green" },
    { name: "angry", label: "Angry", color: "blue" },
    { name: "anxious", label: "Anxious", color: "orange" },
    { name: "lonely", label: "Lonely", color: "purple" },
    { name: "sad", label: "Sad", color: "pink" },
  ];

  return (
    <>
      <div className="wrapper">
        <h1>Tap me when...</h1>

        <div className="inner-wrapper">
          <section className="emotion-contents">
            <div className="column">
              {emotions.slice(0, emotions.length / 2).map((emotion) => (
                <div className="emotion-wrapper" key={emotion.name}>
                  <Logo color={emotion.color} />
                  <Link
                    className="emotion"
                    to={`/display/${emotion.name}`}
                    style={{
                      textShadow: `0 0 2px black`,
                      color: emotion.color,
                      textDecoration: "none",
                    }} // Set the text color dynamically based on the prop
                  >
                    {emotion.label}
                  </Link>
                </div>
              ))}
            </div>

            <div className="column">
              {emotions.slice(emotions.length / 2).map((emotion) => (
                <div className="emotion-wrapper" key={emotion.name}>
                  <Logo color={emotion.color} />
                  <Link
                    className="emotion"
                    to={`/display/${emotion.name}`}
                    style={{
                      textShadow: `0 0 2px black`,
                      color: emotion.color,
                      textDecoration: "none",
                    }} // Set the text color dynamically based on the prop
                  >
                    {emotion.label}
                  </Link>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
