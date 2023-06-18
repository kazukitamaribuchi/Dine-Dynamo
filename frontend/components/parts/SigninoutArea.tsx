import { SignInBtn } from "../elements/SignInBtn";

import { UserIcon } from "../elements/UserIcon";
import { SignOutIconBtn } from "../elements/SignOutIconBtn";
import { useState } from "react";

import { LoadingSpin } from "../elements/LoadingSpin";
import { PopoverUserIcon } from "../elements/PopoverUserIcon";
import { PopoverNotificationIcon } from "../elements/PopoverNotificationIcon";

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
      <div
        style={{
          height: "45px",
          display: "flex",
          alignItems: "center",
          justifyContent: "end",
          justifyItems: "end",
          gap: "20px",
        }}
      >
        <PopoverNotificationIcon />
        <PopoverUserIcon />
      </div>
    );
  } else {
    return (
      <div
        style={{
          height: "45px",
          display: "flex",
          alignItems: "center",
          justifyContent: "end",
          justifyItems: "end",
        }}
      >
        <SignInBtn />
      </div>
    );
  }
};
