import React from "react";
import { ProgressBar } from "react-bootstrap";

export const ScoreProgress = ({ achievements }) => {
  const score = achievements.length * 10;
  return <ProgressBar now={score} label={`${score}%`} className="mb-3" />;
};