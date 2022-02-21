import { Button, Grid } from "@mui/material";
import WrapperCheckbox from "atoms/form/WrapperCheckbox";
import WrapperMultipleCheckbox from "atoms/form/WrapperMultipleCheckbox";
import WrapperRadio from "atoms/form/WrapperRadio";
import WrapperSelect from "atoms/form/WrapperSelect";
import WrapperTextField from "atoms/form/WrapperTextField";
import { Field, Form, InjectedFormProps, reduxForm } from "redux-form";
import { required, maxLength, email } from "utils/validator";

const maxLength20 = maxLength(20);

export type SampleFormFileds = {
  firstName: string;
  lastName: string;
  email: string;
  sex: "male" | "female";
  favoriteColor: "red" | "green" | "blue";
  favoriteColor2: string[];
  isCheck: boolean;
};

type SampleFormProps = {
  // onParent: () => void;
};

type InjectedSampleFormProps = InjectedFormProps<
  SampleFormFileds,
  SampleFormProps
> &
  SampleFormProps;

const SampleForm: React.VFC<InjectedSampleFormProps> = ({
  handleSubmit,
  reset,
  // onParent,
}) => {
  return (
    <Form onSubmit={handleSubmit}>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item xs={12}>
          <Field
            name="firstName"
            component={WrapperTextField}
            label={"姓"}
            validate={[required, maxLength20]}
          />
        </Grid>
        <Grid item xs={12}>
          <Field
            name="lastName"
            component={WrapperTextField}
            validate={[required, maxLength20]}
            label={"名"}
          />
        </Grid>
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
            name="sex"
            component={WrapperRadio}
            label={"性別"}
            items={[
              { label: "男性", value: "male" },
              { label: "女性", value: "female" },
            ]}
            validate={[required]}
          />
        </Grid>
        <Grid item xs={12}>
          <Field
            name="favoriteColor"
            component={WrapperSelect}
            label={"好きな色"}
            items={[
              { label: "赤", value: "red" },
              { label: "緑", value: "green" },
              { label: "青", value: "blue" },
            ]}
          />
        </Grid>
        <Grid item xs={12}>
          <Field
            name="favoriteColor2"
            component={WrapperMultipleCheckbox}
            label={"好きな色(checkbox)"}
            items={[
              { label: "赤", value: "red" },
              { label: "緑", value: "green" },
              { label: "青", value: "blue" },
            ]}
          />
        </Grid>
        <Grid item xs={12}>
          <Field
            name="isCheck"
            component={WrapperCheckbox}
            label={"同意"}
            validate={[required]}
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit">登録</Button>
          <Button onClick={() => reset()}>クリア</Button>
        </Grid>
      </Grid>
    </Form>
  );
};

export default reduxForm<SampleFormFileds, SampleFormProps>({
  form: "sampleForm",
})(SampleForm);
