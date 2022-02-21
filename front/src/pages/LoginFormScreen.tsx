import LoginForm, { LoginFormFileds } from "components/login/LoginForm";

const LoginFormScreen: React.VFC = () => {
  return (
    <LoginForm
      onSubmit={(values: LoginFormFileds) =>
        window.alert(JSON.stringify(values))
      }
    />
  );
};

export default LoginFormScreen;
