import { SignInBtn } from "../elements/SignInBtn";

import { UserIcon } from "../elements/UserIcon";
import { SignOutIconBtn } from "../elements/SignOutIconBtn";
import { useState } from "react";

import { LoadingSpin } from "../elements/LoadingSpin";

interface Props {
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

  if (props.isLogin) {
    return (
      <>
        <UserIcon />
        <SignOutIconBtn />
      </>
    );
  } else {
    return (
      <>
        <SignInBtn />
      </>
    );
  }
};
