import { ReactNode } from "react";
import Head from "next/head";

import { Layout } from "antd";
import { CommonHeader } from "../templates/Header";
import { CommonSidebar } from "../templates/Sidebar";

interface Props {
  title?: string;
  description?: string;
  children: ReactNode;
}

const { Header, Sider, Content } = Layout;

export default function BaseDashboardView({
  title,
  description,
  children,
  ...props
}: Props) {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta property="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div>
        <Layout>
          <Header
            style={{
              height: "55px",
              // background: "#1e1e2b",
              background: "#fff",
              padding: 0,
              marginBottom: "5px",
            }}
          >
            <CommonHeader />
          </Header>
          <Layout style={{ minHeight: "calc(100vh - 45px)" }}>
            <CommonSidebar />
            <Layout>
              <Content style={{ margin: "0 16px" }}>
                <div
                  style={{ padding: 24, background: "#fff", minHeight: 360 }}
                >
                  {children}
                </div>
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const configData = await import(`../../siteconfig.json`);
  return {
    props: {
      title: configData.default.title,
      description: configData.default.description,
    },
  };
}
