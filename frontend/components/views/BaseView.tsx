import { ReactNode } from "react";
import Head from "next/head";

interface Props {
  title?: string;
  description?: string;
  children: ReactNode;
}

export default function BaseView({
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
      <div>{children}</div>
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
