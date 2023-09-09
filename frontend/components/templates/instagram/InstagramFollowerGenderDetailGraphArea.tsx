import { InstagramGraphTitle } from "@/components/elements/InstagramGraphTitle";
import { InstagramFollowerGenderDetailGraph } from "@/components/parts/instagram/InstagramFollowerGenderDetailGraph";
import { Card } from "antd";

export const InstagramFollowerGenderDetailGraphArea = () => {
  return (
    <Card>
      <InstagramGraphTitle title={"男女比詳細"} />

      <div style={{ height: "320px" }}>
        <InstagramFollowerGenderDetailGraph />
      </div>
    </Card>
  );
};
