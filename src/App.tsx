import { Outlet, useLocation } from "react-router-dom";
import Layout from "./layouts";
import { useEffect } from "react";

function App() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <div className="App">
      <Layout>
        <Outlet />
      </Layout>
    </div>
  );
}

export default App;
