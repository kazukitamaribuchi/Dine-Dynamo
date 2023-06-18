const fontSizeMap = {
  1: "20px",
  2: "16px",
  3: "12px",
  4: "8px",
  5: "5px",
};

interface Props {
  content: string;
  level?: keyof typeof fontSizeMap;
}

export const Subtitle = ({ content, level = 5 }: Props) => {
  const fontSize = fontSizeMap[level];
  const color = "#555555";
  return (
    <div style={{ fontSize: fontSize, color: color, padding: 0, margin: 0 }}>
      {content}
    </div>
  );
};
