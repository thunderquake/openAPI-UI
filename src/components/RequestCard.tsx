import { cn } from "@/lib/utils";
import { reqColors } from "./ApiSidebar";
import { Badge } from "./ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

interface IOption {
  option: {
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
  };
}

const RequestCard = ({ option }: IOption) => {
  return (
    <Card className="my-2">
      <CardHeader>
        <CardTitle className="text-2xl font-bold mb-4 items-center flex flex-row gap-2">
          {option.name}
          <Badge
            className={cn(
              reqColors?.[
                option.reqType.toLowerCase() as keyof typeof reqColors
              ] ?? "bg-muted"
            )}
          >
            {option.reqType.toUpperCase()}
          </Badge>
        </CardTitle>
        <CardDescription>{option.description}</CardDescription>
      </CardHeader>
      <CardContent>
        {option.parameters && (
          <div>
            <h4>Request</h4>
            <div className="py-6">
              {option.parameters.map((parameter) => (
                <div className="border-b-2 border-muted pb-2">
                  <div className="flex flex-row gap-4">
                    <h1 className="font-bold">{parameter.name}</h1>
                    <p className="text-gray-500">{parameter.schema.type}</p>
                    {parameter.schema.format ? (
                      <p>({parameter.schema.format})</p>
                    ) : (
                      ""
                    )}
                  </div>
                  <p className="py-2">{parameter.description}</p>
                  <p>Example</p>
                  {parameter.schema.example ? (
                    <div className="bg-muted w-fit">
                      <p className="font-mono">{parameter.schema.example}</p>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        <div>
          <h5>Response</h5>
          <div></div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RequestCard;
