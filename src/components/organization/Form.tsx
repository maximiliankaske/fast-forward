import React, { FormHTMLAttributes } from "react";
import Button from "../ui/Button";
import Input from "../ui/Input";

interface Props extends FormHTMLAttributes<HTMLFormElement> {
  defaultValue?: string;
}

const Form = ({ defaultValue, ...props }: Props) => {
  return (
    <form className="grid gap-4 md:grid-cols-3" {...props}>
      <div className="md:col-span-2">
        <Input
          label="Name"
          name="organization"
          placeholder="Acme"
          pattern={"^[A-Za-z0-9_-]*$"}
          defaultValue={defaultValue}
          required
        />
      </div>
      <div className="flex items-end md:col-span-1">
        <Button size="lg" type="submit">
          Submit
        </Button>
      </div>
    </form>
  );
};

export default Form;
