export type Question = {
  id: string;
  title: string;
  description: string;
  type: "input" | "textarea" | "rating";
};

export type Pack = {
  label: string;
  questions: Question[];
};

const forms: Record<string, Pack> = {
  "the-starter-pack": {
    label: "The Starter Pack",
    questions: [
      {
        id: "q1",
        title: "What was our biggest achievement?",
        description:
          "It could be a milestone that was reached, a workshop attembded or a meeting with a collegue where you had a mindblowing experience.",
        type: "input",
      },
      {
        id: "q2",
        title: "Did you have everything needed to accomplish your tasks?",
        description:
          "Are you missing a tool to make tasks more productive. More time from others, or something else?",
        type: "input",
      },
      {
        id: "q3",
        title: "Lorem?",
        description: "Lorem",
        type: "input",
      },
    ],
  },
};

export default forms;
