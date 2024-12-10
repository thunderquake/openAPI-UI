import { ApiContent, ApiContentOptions } from "@/components/ApiContent";
import { ApiSidebar } from "@/components/ApiSidebar";
import FileInput from "@/components/FileInput";
import {
  Sidebar,
  SidebarContent,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { IParsedYaml } from "@/IParsedYaml";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { bundleFromString, createConfig } from "@redocly/openapi-core";
import { useState } from "react";

const MainPage = () => {
  const [parsedObj, setparsedObj] = useState<IParsedYaml | null>(null);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);

  const parsetoObj = async (yamlString: string) => {
    const config = await createConfig({});
    const result = await bundleFromString({ config, source: yamlString });
    return result.bundle.parsed;
  };
  const onChange = async (yamlString: string) => {
    const objResponse = await parsetoObj(yamlString);
    setparsedObj(objResponse);
  };

  const options =
    parsedObj &&
    Object.values(parsedObj?.paths).map((path) =>
      Object.entries(path).map(([key, config]) => {
        const parameters = config?.parameters
          ? config.parameters.map((parameter) => {
              // TODO: Separate this into the helper
              const path = parameter.$ref.replace("#", "").split("/").slice(1);

              let obj = parsedObj;
              // @ts-expect-error We need to define obj type but it changes on every iteration
              path.forEach((key) => (obj = obj[key as keyof typeof obj]));

              return obj;
            })
          : null;

        const responses = {
          examples: [],
          schema: [],
        };

        return {
          reqType: key,
          name: config.summary,
          operationId: config.operationId,
          tags: config.tags,
          summary: config.summary,
          description: config.description,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          parameters: parameters as any,
          responses,
        };
      })
    );

  return (
    <SidebarProvider>
      <div className="flex h-screen overflow-hidden">
        <Sidebar className="w-64 border-r">
          <SidebarContent>
            <ScrollArea className="h-[calc(100vh-5rem)]">
              <ApiSidebar
                sections={parsedObj?.tags.map((tag) => tag.name) ?? []}
                onSelectSection={setSelectedSection}
                options={options?.flat() ?? null}
              />
            </ScrollArea>
          </SidebarContent>
        </Sidebar>
        <div className="flex-1 overflow-auto">
          <header className="flex items-center border-b px-4 py-2">
            <SidebarTrigger />
            <FileInput onChange={onChange} />
          </header>
          <main className="p-4">
            <ApiContent
              selectedSection={selectedSection}
              description={
                parsedObj?.tags.find((tag) => tag.name === selectedSection)
                  ?.description ?? null
              }
              options={
                (options
                  ?.flat()
                  .filter((option) =>
                    option.tags.includes(selectedSection ?? "")
                  ) as ApiContentOptions) ?? null
              }
            />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default MainPage;
