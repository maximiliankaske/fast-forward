import { Feedback, FeedbackType, Project } from "@prisma/client";
import { formatDistance } from "date-fns";
import { useSession } from "next-auth/react";
import React, { useCallback, useMemo } from "react";
import LinkContainer from "../common/LinkContainer";
import { Badge, Text } from "@fast-forward/ui";

const defaultGroupByType = {
  ISSUE: {
    count: 0,
    archived: 0,
    starred: 0,
  },
  IDEA: {
    count: 0,
    archived: 0,
    starred: 0,
  },
  OTHER: {
    count: 0,
    archived: 0,
    starred: 0,
  },
};

interface Props {
  project: Project & { feedbacks: Feedback[] };
  // all feedbacks are provided
}

const Card = ({ project }: Props) => {
  const session = useSession();
  const feedbacks =
    project.feedbacks?.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    ) || [];

  // TODO: move to utils folder!
  const groupByType = useMemo(() => {
    return project.feedbacks.reduce<
      Record<FeedbackType, Record<"count" | "archived" | "starred", number>>
    >(
      (prev, curr) => ({
        ...prev,
        [curr.type]: {
          count: prev[curr.type].count + 1,
          // we are not double counting starred and archived feedbacks
          archived:
            prev[curr.type].archived + (curr.archived && !curr.starred ? 1 : 0),
          starred: prev[curr.type].starred + (curr.starred ? 1 : 0),
        },
      }),
      defaultGroupByType
    );
  }, [project.feedbacks]);

  return (
    <LinkContainer key={project.id} href={`/projects/${project.id}`}>
      <LinkContainer.Title className="">
        {project.name}
        {!project?.private && (
          <Badge size="sm" className="ml-2" color="primary">
            public
          </Badge>
        )}
        {project?.teamId !== session.data?.user.teamId && (
          <Badge size="sm" className="ml-2" color="primary">
            team
          </Badge>
        )}
      </LinkContainer.Title>
      <LinkContainer.Description>
        last feedback:{" "}
        <span className="font-medium text-gray-800 dark:text-gray-200">
          {feedbacks.length > 0
            ? formatDistance(new Date(feedbacks[0].createdAt), new Date(), {
                addSuffix: true,
              })
            : "missing"}
        </span>
      </LinkContainer.Description>
      <LinkContainer.Block className="flex space-x-3">
        {Object.keys(groupByType).map((key) => (
          <div key={key}>
            <p className="lowercase text-sm text-gray-600 dark:text-gray-400">
              {`${key}: `}
              <span className="font-medium text-gray-800 dark:text-gray-200">
                {groupByType[key as keyof typeof groupByType].count}
              </span>
            </p>
          </div>
        ))}
      </LinkContainer.Block>
    </LinkContainer>
  );
};

export default Card;
