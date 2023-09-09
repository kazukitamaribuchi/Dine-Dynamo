import { InstagramGraphTitle } from "@/components/elements/InstagramGraphTitle";
import { InstagramFollowerGenderGraph } from "@/components/parts/instagram/InstagramFollowerGenderGraph";
import { Card } from "antd";

export const InstagramFollowerGenderGraphArea = () => {
  return (
    <Card>
      <InstagramGraphTitle title={"男女比"} />

      <div style={{ height: "310px" }}>
        <InstagramFollowerGenderGraph />
      </div>
    </Card>
  );
};
