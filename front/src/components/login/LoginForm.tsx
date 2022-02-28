import { Button, Grid } from "@mui/material";
import WrapperTextField from "atoms/form/WrapperTextField";
import { Field, Form, InjectedFormProps, reduxForm } from "redux-form";
import { required, minLength, maxLength, email } from "utils/validator";

const minLength4 = minLength(4);
const maxLength16 = maxLength(16);

export type LoginFormFileds = {
  email: string;
  password: string;
};

type LoginFormProps = {
  // onParent: () => void;
};

type InjectedLoginFormProps = InjectedFormProps<
  LoginFormFileds,
  LoginFormProps
> &
  LoginFormProps;

const LoginForm: React.VFC<InjectedLoginFormProps> = ({
  handleSubmit,
  // onParent,
}) => {
  return (
    <Form onSubmit={handleSubmit}>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item xs={12}>
          <Field
            name="email"
            component={WrapperTextField}
            validate={[required, email]}
            label={"メールアドレス"}
          />
        </Grid>
        <Grid item xs={12}>
          <Field
            name="password"
            component={WrapperTextField}
            type="password"
            validate={[required, minLength4, maxLength16]}
            label={"パスワード"}
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit">Login</Button>
        </Grid>
      </Grid>
    </Form>
  );
};

export default reduxForm<LoginFormFileds, LoginFormProps>({
  form: "LoginForm",
})(LoginForm);
