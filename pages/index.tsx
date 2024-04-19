import { useEffect } from "react";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { loginState } from "@/recoil/selectors/loginState";
import Home from "@/components/Home";
import type { NextPageWithLayout } from "@/pages/_app";
import MainLayout from "@/components/layout/MainLayout";

const HomePage: NextPageWithLayout = () => {
  const isLogin = useRecoilValue(loginState);
  const router = useRouter();

  useEffect(() => {
    if (!isLogin) {
      router.push("/login");
    }
  }, []);

  return <Home />;
};

HomePage.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};

export default HomePage;
