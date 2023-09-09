import { InstagramGraphTitle } from "@/components/elements/InstagramGraphTitle";
import { InstagramFollowerCityTable } from "@/components/parts/instagram/InstagramFollowerCityTable";
import { Card } from "antd";

export const InstagramFollowerCityArea = () => {
  return (
    <Card>
      <InstagramGraphTitle title={"市町村"} />

      <div style={{ height: "320px" }}>
        <InstagramFollowerCityTable />
      </div>
    </Card>
  );
};
