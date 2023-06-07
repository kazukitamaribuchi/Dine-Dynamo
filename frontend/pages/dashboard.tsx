import type { NextPage } from "next";
import DashboardView from "../components/views/DashboardView";
import axios from "axios";

const Index: NextPage = (props) => {
  return <DashboardView props={props} />;
};

export default Index;

export async function getServerSideProps(context) {
  // TODO URLを動的に
  try {
    const response = await axios.get("http://localhost:8000/api/subscription");
    return {
      props: {
        products: response.data,
      },
    };
  } catch (e) {
    return {
      props: {
        products: [],
      },
    };
  }
}
