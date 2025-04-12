import { useEffect } from "react";

const Page = ({ title, children }) => {
  useEffect(() => {
    document.title = `${title} || EduSphere`;
  }, [title]);

  return <>{children}</>;
};

export default Page;
