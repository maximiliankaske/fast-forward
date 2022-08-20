type LoadingState = "loading" | "success" | "error";
type FeedbackType = "issue" | "idea" | "other";
type QuestionType = "type" | "feedback";

export type Messages = {
  types: Record<FeedbackType, string>;
  placeholder: string;
  submit: {
    label: string;
    state: Record<LoadingState, string>;
  };
  questions: Record<QuestionType, string>;
};

const translations: Record<"en" | "de" | "fr", Messages> = {
  en: {
    // title: "What comes to your mind?"
    types: {
      issue: "Issue",
      idea: "Idea",
      other: "Other",
    },
    placeholder: "Tell us about...",
    submit: {
      label: "Submit",
      state: {
        loading: "Loading",
        success: "Thanks for the feedback!",
        error: "Error - Try again",
      },
    },
    questions: {
      type: "What comes to your mind?",
      feedback: "What would you like to share?",
    },
  },
  de: {
    types: {
      issue: "Problem",
      idea: "Idee",
      other: "Sonstiges",
    },
    placeholder: "Es ist mir aufgefallen...",
    submit: {
      label: "Senden",
      state: {
        loading: "Lädt",
        success: "Danke für dein Feedback!",
        error: "Fehler - Nochmal versuchen",
      },
    },
    questions: {
      type: "Was ist dir aufgefallen?",
      feedback: "Was willst du teilen?",
    },
  },
  fr: {
    types: {
      issue: "Problème",
      idea: "Idée",
      other: "Autres",
    },
    placeholder: "J'ai remarqué...",
    submit: {
      label: "Envoyer",
      state: {
        loading: "charge",
        success: "Merci pour ton Feedback!",
        error: "Problème - réessayer",
      },
    },
    questions: {
      type: "Comment pouvons-nous vous aider?",
      feedback: "Que voulez-vous partagez?",
    },
  },
} as const;

export type LanguageCode = keyof typeof translations;

export function formattedMessages(lang?: string) {
  if (lang && Object.keys(translations).includes(lang)) {
    return translations[lang as LanguageCode];
  } else {
    console.log(`Language code not found: ${lang}`);
    return translations["en"];
  }
}

export default translations;
