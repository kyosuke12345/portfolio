import { reduxForm } from "redux-form";
import LoginForm, { LoginFormFileds, LoginFormProps } from ".";

export default reduxForm<LoginFormFileds, LoginFormProps>({
  form: "LoginForm",
})(LoginForm);
