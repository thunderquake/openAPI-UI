import FileInput from "@/components/FileInput";
import { bundleFromString, createConfig } from "@redocly/openapi-core";
import { useState } from "react";

const MainPage = () => {
  const [parcedObj, setParcedObj] = useState();

  const parcetoObj = async (yamlString: string) => {
    const config = await createConfig({});
    const result = await bundleFromString({ config, source: yamlString });
    return result.bundle.parsed;
  };
  const onChange = async (yamlString: string) => {
    const objResponse = await parcetoObj(yamlString);
    setParcedObj(objResponse);
  };

  return <FileInput onChange={onChange} />;
};

export default MainPage;
