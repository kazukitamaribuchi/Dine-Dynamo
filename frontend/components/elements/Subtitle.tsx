const fontSizeMap = {
  5: "20px",
  4: "17px",
  3: "14px",
  2: "11px",
  1: "9px",
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
