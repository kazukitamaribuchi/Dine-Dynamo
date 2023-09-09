import { GridTableSwitcher } from "@/components/parts/GridTableSwitcher";
import { InstagramMediaList } from "./InstagramMediaList";
import { useState } from "react";
import { InstagramMediaGrid } from "../../templates/instagram/InstagramMediaGrid";
import { Col, Row, Switch } from "antd";
import { IncludeInsightSwitcher } from "@/components/parts/IncludeInsightSwitcher";

export const InstagramMedia = () => {
  // デフォルトの表示スタイルは設定から取得(store保持)
  // 上記に合わせてそれぞれのコンポーネントを呼びだす→取得し表示

  // 例として最初はgridにしてみる
  const [isIncludedInsight, setIsIncludedInsight] = useState(false);
  const [mediaStyle, setMediaStyle] = useState<number>(1);

  const handleIncludeInsightSwitcherClick = (value: boolean) => {
    setIsIncludedInsight(value);
  };
  const handleGridTableSwitcherClick = (value: number) => {
    setMediaStyle(value);
  };

  return (
    <div>
      <Row justify="end" gutter={18}>
        <Col>
          <IncludeInsightSwitcher
            onButtonClick={handleIncludeInsightSwitcherClick}
          />
        </Col>
        <Col>
          <GridTableSwitcher onButtonClick={handleGridTableSwitcherClick} />
        </Col>
      </Row>
      <div>
        <InstagramMediaList mediaStyle={mediaStyle} />
      </div>
    </div>
  );
};
