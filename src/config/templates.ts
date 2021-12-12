import { QuestionType } from "@prisma/client";

const forms = {
  "the-starter-pack": {
    title: "The Starter Pack",
    description: "Start with something simple",
    questions: [
      {
        title: "What was our biggest achievement?",
        description:
          "It could be a milestone that was reached, a workshop attembded or a meeting with a collegue where you had a mindblowing experience.",
        type: QuestionType.RATING,
      },
      {
        title: "Did you have everything needed to accomplish your tasks?",
        description:
          "Are you missing a tool to make tasks more productive. More time from others, or something else?",
        type: QuestionType.TEXTAREA,
      },
      {
        title: "Lorem?",
        description: "Lorem",
        type: QuestionType.INPUT,
      },
      {
        title: "Lorem?",
        description: "Lorem",
        type: QuestionType.INPUT,
      },
    ],
  },
  "the-vibe-pack": {
    title: "The Vibe Pack",
    description: "Check the team vibe with tricky questions",
    questions: [
      {
        title: "What's good and went well this month?",
        description:
          "It could be a milestone that was reached, a workshop attembded or a meeting with a collegue where you had a mindblowing experience.",
        type: QuestionType.RATING,
      },
      {
        title: "Do you had enough time with everyone in the team?",
        description:
          "Are you missing a tool to make tasks more productive. More time from others, or something else?",
        type: QuestionType.INPUT,
      },
      {
        title: "Lorem?",
        description: "Lorem",
        type: QuestionType.INPUT,
      },
      {
        title: "Ok so to be clear, are you good to go?",
        description: "A little motivational ending.",
        type: QuestionType.INPUT,
      },
    ],
  },
};

export default forms;
