import { loginUserAtom } from "@/store/atoms";
import { Avatar, Button, Card, Popover, Tooltip } from "antd";
import { useAtom } from "jotai";
import { AiOutlineUser } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import { HiUserCircle } from "react-icons/hi";
import { TbUserCircle } from "react-icons/tb";
import { HoverUserIconMenu } from "../parts/HoverUserIconMenu";

interface Props {}

export const PopoverUserIcon = (props: Props) => {
  const [loginUser, setLoginUser] = useAtom(loginUserAtom);

  const content = <HoverUserIconMenu />;

  console.log("loginUser", loginUser);

  return (
    <Popover placement="bottomLeft" content={content} trigger="click">
      <Avatar
        style={{
          backgroundColor: "#00a2ae",
          verticalAlign: "middle",
          cursor: "pointer",
        }}
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
    </Popover>
  );
};