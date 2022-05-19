import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { AppDispatch } from "redux/store";
import { login } from "redux/modules/authModule";
import LoginForm, { LoginFormFileds, LoginFormProps } from ".";

const LoginReduxForm = reduxForm<LoginFormFileds, LoginFormProps>({
  form: "LoginForm",
})(LoginForm);

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    onSubmit: (values: LoginFormFileds) => {
      dispatch(login(values));
    },
  };
};

export default connect(undefined, mapDispatchToProps)(LoginReduxForm);
