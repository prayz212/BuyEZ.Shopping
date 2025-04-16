interface TextTransformType {
  key: string;
  transformFn: (value: any) => string;
}

export default TextTransformType;
