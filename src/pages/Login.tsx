import React from "react";
import { Grid, Button } from "@material-ui/core";
import { Container } from "./Login.style";
import { Form, Field } from "react-final-form";
import { TextField } from "final-form-material-ui";
import auth from "../helpers/auth";

const Login = (props: any) => {
  interface Values {
    email: string;
    password: string;
  }

  const submit = async (values: Values) => {
    await auth.login({ email: values["email"], password: values.password });
  };

  return (
    <Form
      onSubmit={submit}
      render={({ handleSubmit }) => {
        return (
          <Container>
            <form onSubmit={handleSubmit} style={{ width: "100%" }}>
              <h1>Real Life XP</h1>
              <Grid container spacing={8}>
                <Grid item xs={12}>
                  <Field
                    name="email"
                    label="E-mail"
                    fullWidth
                    component={TextField}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    name="password"
                    label="Password"
                    type="password"
                    fullWidth
                    component={TextField}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    size="large"
                    variant="outlined"
                    color="primary"
                  >
                    Login
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Container>
        );
      }}
    />
  );
};

export default Login;
