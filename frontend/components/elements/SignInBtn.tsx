import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "antd";

export const SignInBtn = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Button
      style={{ display: "block" }}
      type="text"
      onClick={() => loginWithRedirect()}
    >
      Sign in
    </Button>
  );
};
