import { useTranslation } from "react-i18next";

const LoadingPage = () => {
  const { t } = useTranslation();
  return <div>{`${t("loading")} ....`}</div>;
};

export default LoadingPage;
