import { Label } from "@radix-ui/react-label";
import { ChangeEvent } from "react";
import { Input } from "./ui/input";

const FileInput = ({ onChange }: { onChange: (string: string) => void }) => {
  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const yamlContent = e.target?.result;
        if (typeof yamlContent === "string") {
          onChange(yamlContent);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="flex w-full flex-row items-center gap-2 px-6">
      <Label htmlFor="yaml-file-input">Upload OpenAPI Definition (YAML)</Label>
      <Input
        id="yaml-file-input"
        type="file"
        accept=".yaml,.yml"
        multiple={false}
        onChange={handleFileUpload}
      />
    </div>
  );
};

export default FileInput;
