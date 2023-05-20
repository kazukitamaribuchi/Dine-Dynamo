import { Button } from "antd";

import { SigninBtn } from "../elements/SigninBtn";

import Link from "next/link";
import { UserIcon } from "../elements/UserIcon";
import { SignoutIconBtn } from "../elements/SignoutIconBtn";
import { useState } from "react";

export const SigninoutArea = () => {
  // ログインしている => usericon + signout
  // ログインしていない => signin

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpen = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <UserIcon />
      <SignoutIconBtn />
    </>
  );
};
