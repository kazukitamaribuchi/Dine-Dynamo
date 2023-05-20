import { Button, Tooltip } from "antd";
import { AiOutlineUser } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import { HiUserCircle } from "react-icons/hi";
import { TbUserCircle } from "react-icons/tb";

interface Props {}

export const UserIcon = (props: Props) => {
  return (
    <>
      <Tooltip title="user info">
        <Button type="text" shape="circle" icon={<AiOutlineUser />} />
      </Tooltip>
    </>
  );
};
