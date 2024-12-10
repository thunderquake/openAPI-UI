import RequestCard from "./RequestCard";

interface ApiContentProps {
  selectedSection: string | null;
  description: string | null;
  options:
    | {
        reqType: string;
        name: string;
        operationId: string;
        tags: string[];
        summary: string;
        description: string;
        parameters: {
          name: string;
          description: string;
          in: string;
          schema: { type: string; example: string; format: string };
        }[];
        responses: {
          [key: string]: {
            description: string;
            content: {
              "application/json": {
                schema: {
                  $ref: string;
                };
                examples: {
                  [key: string]: {
                    $ref: string;
                  };
                };
              };
            };
          };
        };
      }[]
    | null;
}

export function ApiContent({
  selectedSection,
  description,
  options,
}: ApiContentProps) {
  if (!selectedSection) {
    return <div>Please select a section from the sidebar.</div>;
  }

  return (
    <div className="gap-4 flex flex-col">
      <div>
        <h3 className="text-2xl font-bold mb-4">{selectedSection}</h3>
        <h4>{description}</h4>
      </div>
      <div className="flex flex-col gap-2">
        {options?.map((option) => (
          <RequestCard option={option} />
        ))}
      </div>
    </div>
  );
}
