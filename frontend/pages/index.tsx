import Home from "@/components/Home";
import type { NextPageWithLayout } from "@/pages/_app";
import MainLayout from "@/components/layout/MainLayout";

const HomePage: NextPageWithLayout = () => {
  return <Home />;
};

HomePage.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};

export default HomePage;
