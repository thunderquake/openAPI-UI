import { cn } from "@/lib/utils";
import { CollapsibleContent } from "@radix-ui/react-collapsible";
import { ChevronDownIcon } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Collapsible, CollapsibleTrigger } from "./ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "./ui/sidebar";

interface ApiSidebarProps {
  onSelectSection: (section: string) => void;
  sections: string[];
  options:
    | {
        reqType: string;
        name: string;
        operationId: string;
        tags: string[];
      }[]
    | null;
}

export const reqColors = {
  get: "bg-green-600",
  post: "bg-blue-600",
  patch: "bg-yellow-600",
  delete: "bg-red-600",
};

export function ApiSidebar({
  onSelectSection,
  sections,
  options,
}: ApiSidebarProps) {
  return (
    <>
      {sections.map((section) => (
        <Collapsible defaultOpen className="group/collapsible">
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger>
                {section}
                <ChevronDownIcon className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                {options?.map(
                  (option) =>
                    option.tags.includes(section) && (
                      <Button
                        onClick={() => onSelectSection(section)}
                        variant={"ghost"}
                      >
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
                      </Button>
                    )
                )}
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
      ))}
    </>
  );
}
