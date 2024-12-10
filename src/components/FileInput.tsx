import { ChangeEvent, useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

const FileInput = ({ onChange }: { onChange: (string: string) => void }) => {
  const [yamlString, setYamlString] = useState("");

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const yamlContent = e.target?.result;
        if (typeof yamlContent === "string") {
          setYamlString(yamlContent);
        }
      };
      reader.readAsText(file);
    }
  };

  useEffect(() => {
    onChange(yamlString);
  }, [onChange, yamlString]);
  console.log(yamlString);

  return (
    <div className="grid w-full max-w-sm items-center gap-2">
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
