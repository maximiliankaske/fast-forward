export type Question = {
  id: string;
  title: string;
  description: string;
  type: "input" | "textarea" | "rating";
};

export type Template = {
  label: string;
  questions: Question[];
};
