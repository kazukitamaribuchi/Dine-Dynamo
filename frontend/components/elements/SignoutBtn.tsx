import { Button } from "antd";
import { Modal } from "antd";
import { useRouter } from "next/router";

export const SignoutBtn = () => {
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
    <Button type="text" onClick={showConfirm}>
      Signout
    </Button>
  );
};
