import { loginUserAtom } from "@/store/atoms";
import { Avatar, Button, Card, Popover, Tooltip } from "antd";
import { useAtom } from "jotai";
import { AiOutlineUser } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import { HiUserCircle } from "react-icons/hi";
import { TbUserCircle } from "react-icons/tb";

interface Props {}

export const UserIcon = (props: Props) => {
  const [loginUser, setLoginUser] = useAtom(loginUserAtom);

  console.log("loginUser", loginUser);

  return (
    <Avatar
      style={{ backgroundColor: "#00a2ae", verticalAlign: "middle" }}
      size="default"
      gap={1}
    >
      {loginUser && <>{loginUser.username[0]}</>}
      {!loginUser && (
        <>
          <AiOutlineUser />
        </>
      )}
    </Avatar>
  );
};
