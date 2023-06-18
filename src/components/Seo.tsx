import Head from "next/head";

interface SeoTitle {
  title: string;
}
const Seo = ({ title }: SeoTitle) => {
  return (
    <Head>
      <title>{title}</title>
    </Head>
  );
};

export default Seo;
