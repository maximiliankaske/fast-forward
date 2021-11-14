import { WithId, FormSession, OrganizationMember } from "@/types/index";
import { Template } from "@/types/templates";
import React from "react";

interface Props {
  session: WithId<FormSession>;
  template: WithId<Template>;
  member?: WithId<OrganizationMember>;
}

const Answers = ({ session, template, member }: Props) => {
  return (
    <div key={session.id}>
      <p>{member?.email}</p>
      <ul>
        {Object.keys(session.answers).map((key) => {
          const question = template.questions.find((q) => q.id === key);
          return (
            <li key={key}>
              <p className="text-gray-600 dark:text-gray-400">
                {question?.title}
              </p>
              <p className="font-medium">{session.answers[key]}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Answers;
