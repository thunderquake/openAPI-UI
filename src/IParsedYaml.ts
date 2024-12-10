interface IPath {
  url: string;
  method: string;
  summary: string;
  description: string;
  operationId: string;
  tags: string[];
  parameters: {
    $ref: string;
  }[];
  requestBody?: {
    required: boolean;
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
}

export interface IParsedYaml {
  openapi: string;
  info: {
    title: string;
    description: string;
    version: string;
    termsOfService: string;
    contact: {
      email: string;
      url: string;
    };
    license: {
      name: string;
      url: string;
    };
  };
  servers: {
    url: string;
  }[];
  paths: {
    [key: string]: {
      [key: string]: IPath;
    };
  };
  components: {
    schemas: {
      [key: string]: {
        description: string;
        type: string;
        enum: string[];
        example: string;
        format: string;
        properties: {
          [key: string]: {
            $ref: string;
          };
        };
        required: string[];
      };
    };
  };
  items: {
    [key: string]: {
      $ref: string;
    };
  };
  securitySchemes: {
    [key: string]: {
      type: string;
      scheme: string;
    };
  };
  examples: {
    [key: string]: {
      summary: string;
      value:
        | {
            [key: string]: string | string[];
          }
        | {
            [key: string]: string | string[];
          }[];
    };
  };
  tags: {
    name: string;
    description: string;
  }[];
  security: {
    [key: string]: string[];
  }[];
}
