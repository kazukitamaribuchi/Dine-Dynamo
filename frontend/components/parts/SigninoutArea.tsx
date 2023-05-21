import { SigninBtn } from "../elements/SigninBtn";

import { UserIcon } from "../elements/UserIcon";
import { SignoutIconBtn } from "../elements/SignoutIconBtn";
import { useState } from "react";

import { LoadingSpin } from "../elements/LoadingSpin";

interface Props {
  isChecking: boolean;
  isLogin: boolean;
}

export const SigninoutArea = (props: Props) => {
  // ログインしている => usericon + signout
  // ログインしていない => signin

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpen = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  if (props.isChecking) {
    return (
      <>
        <LoadingSpin />
      </>
    );
  }

  if (props.isLogin) {
    return (
      <>
        <UserIcon />
        <SignoutIconBtn />
      </>
    );
  } else {
    return (
      <>
        <SigninBtn />
      </>
    );
  }
};
