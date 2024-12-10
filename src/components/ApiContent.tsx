import RequestCard from "./RequestCard";
export type ApiContentOptions =
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
        schema: {
          type: string;
          example: string;
          format: string;
        };
      }[];
      responses: { examples: []; schema: [] };
    }[]
  | null;

interface ApiContentProps {
  selectedSection: string | null;
  description: string | null;
  options: ApiContentOptions;
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
          <RequestCard key={option.operationId} option={option} />
        ))}
      </div>
    </div>
  );
}
