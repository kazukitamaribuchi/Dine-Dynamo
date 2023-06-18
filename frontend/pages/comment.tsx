import type { NextPage } from "next";
import CommentView from "@/components/views/CommentView";

const Index: NextPage = (props) => {
  return <CommentView props={props} />;
};

export default Index;
