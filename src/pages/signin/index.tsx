import { Paper, Stack, TextField } from "@mui/material";
import { Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useSignInMutation } from "../../apis/auth/queries";
import { SignInValues } from "../../apis/auth/type";
import logo from "../../assets/logo.png";

import LoadingButton from "../../components/items/buttons/loadingButtons/LoadingButton";
import PasswordField from "../../components/items/inputs/PasswordField/PasswordField";

const validation = Yup.object().shape({
  userName: Yup.string().required("please enter User Name"),
  password: Yup.string().required("please enter password"),
});
const SignInPage = () => {
  const { mutate: signIn } = useSignInMutation();
  const handleSignIn = (
    values: SignInValues,
    { setSubmitting }: FormikHelpers<SignInValues>
  ) => {
    signIn(values, {
      onSettled: () => {
        setSubmitting(false);
      },
    });
  };
  return (
    <Stack
      minHeight={"97vh"}
      overflow={"hidden"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Paper
        sx={{
          width: { md: "40vw" },
        }}
      >
        <Formik
          initialValues={{ userName: "", password: "" }}
          validationSchema={validation}
          onSubmit={handleSignIn}
        >
          {({
            values,
            touched,
            errors,
            isSubmitting,
            handleBlur,
            handleChange,
          }) => (
            <Form>
              <Stack
                justifyContent={"center"}
                alignItems={"center"}
                p={{ xs: 3, sm: 6, md: 9, lg: 12 }}
                gap={4}
              >
                <img
                  src={logo}
                  alt={"asda"}
                  loading="lazy"
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                />
                <TextField
                  fullWidth
                  name="userName"
                  label="User Name"
                  value={values.userName}
                  error={touched.userName && !!errors.userName}
                  helperText={touched.userName && errors.userName}
                  onChange={handleChange}
                  InputLabelProps={{
                    sx: {
                      color: "black",
                    },
                  }}
                />
                <PasswordField
                  name="password"
                  label={"password"}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  error={touched.password && !!errors.password}
                  helperText={touched.password && errors.password}
                  InputLabelProps={{
                    sx: {
                      color: "black",
                    },
                  }}
                  InputProps={{
                    sx: {
                      color: "black",
                      border: "1px solid black",
                    },
                  }}
                />
                <LoadingButton isSubmitting={isSubmitting} buttonText="login" />
              </Stack>
            </Form>
          )}
        </Formik>
      </Paper>
    </Stack>
  );
};

export default SignInPage;
