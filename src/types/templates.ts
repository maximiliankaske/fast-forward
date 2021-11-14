export type Question = {
  id: string;
  title: string;
  description: string;
  // icon: string;
  type: "input" | "textarea" | "rating";
};

export type Template = MinSurvey & {
  label: string;
  description: string;
  questions: Question[];
  surveyId?: string | null;
};

// data added by the user
// all not mandatory fields
export type MinSurvey = {
  dueTo?: string | null;
  notifications?: boolean | null;
};

export type Survey = MinSurvey & {
  templateId: string;
  startAt: string | null;
  cancelled: boolean;
};
