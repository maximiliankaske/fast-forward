import { Survey } from "@/types/templates";
import React from "react";

interface Props {
  survey: Survey;
}

const Archived = ({ survey }: Props) => {
  return (
    <div>
      <p>Template ID: {survey.templateId}</p>
      <p>Due to: {survey.dueTo}</p>
    </div>
  );
};

export default Archived;
