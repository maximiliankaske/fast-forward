export type Translation = {
  // title: string;
  type: {
    label: string;
    options: {
      issue: { label: string };
      idea: { label: string };
      other: { label: string };
    };
  };
  comment: { label: string; placeholder: string };
  submit: {
    label: string;
    state: {
      loading: string;
      success: string;
      error: string;
    };
  };
};
