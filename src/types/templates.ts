export type Question = {
  id: string;
  title: string;
  description: string;
  // icon: string;
  type: "input" | "textarea" | "rating";
};

export type Template = {
  label: string;
  questions: Question[];
  // data added by the user
  // all not mandatory fields
  dueTo?: string | null;
  notifications?: boolean | null;
};
