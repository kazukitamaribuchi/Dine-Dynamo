import { Button, Tooltip } from "antd";
import { VscSignOut } from "react-icons/vsc";
import { GoSignOut } from "react-icons/go";

import { Modal } from "antd";
import { useRouter } from "next/router";

export const SignoutIconBtn = () => {
  const { confirm } = Modal;

  const router = useRouter();
  const showConfirm = () => {
    confirm({
      title: "Signout",
      content: "サインアウトします。よろしいですか？",
      onOk() {
        router.push("/api/auth/logout");
      },
    });
  };

  return (
    <Tooltip title="signout">
      <Button
        type="text"
        shape="circle"
        icon={<VscSignOut />}
        onClick={showConfirm}
      ></Button>
    </Tooltip>
  );
};
