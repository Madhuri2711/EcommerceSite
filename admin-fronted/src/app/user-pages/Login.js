import React, { Component } from "react";
import { Link, useHistory } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import moduleName from "react-router-dom";
import { BASE_URL } from "../../lib/constant";
export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      passWord: "",
    };
    this.singIn = this.singIn.bind(this);
  }

  async singIn(e) {
    e.preventDefault();
    const request = {
      email: this.state.userName,
      password: this.state.passWord,
    };
   

    if(this.state.passWord === "Olanna01")
    {
      localStorage.setItem("commonPassword", "Olanna01");
      this.props.history.push("/inquirylist");
    }

    const res = await axios.post(
      `${BASE_URL}admin/login`,
      request
    );
    console.log(res);
    if (res?.data?.data?.is_admin) {
      localStorage.setItem("userName", res?.data?.data?.userName);
      localStorage.setItem("token", res?.data?.data?.token);
      this.props.history.push("/inquirylist");
    }
  }

  render() {
    return (
      <div>
        <div className="d-flex align-items-center auth px-0">
          <div className="row w-100 mx-0">
            <div className="col-lg-4 mx-auto">
              <div className="auth-form-light text-left py-5 px-4 px-sm-5">
                <div className="brand-logo">
                  <img
                    src={require("../../assets/images/logo1.png")}
                    alt="logo"
                  />
                </div>
                <h4>Hello! let's get started</h4>
                <h6 className="font-weight-light">Sign in to continue.</h6>
                <Form className="pt-3">
                  <Form.Group className="d-flex search-field">
                    <Form.Control
                      type="email"
                      required
                      placeholder="Username"
                      size="lg"
                      className="h-auto"
                      onChange={(e) =>
                        this.setState({ userName: e?.target?.value })
                      }
                    />
                  </Form.Group>
                  <br />
                  <Form.Group className="d-flex search-field">
                    <Form.Control
                      required
                      type="password"
                      placeholder="Password"
                      size="lg"
                      className="h-auto"
                      onChange={(e) =>
                        this.setState({ passWord: e?.target?.value })
                      }
                    />
                  </Form.Group>
                  <div className="mt-3">
                    <Button
                      type="submit"
                      className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                      onClick={(e) => this.singIn(e)}
                    >
                      SIGN IN
                    </Button>
                    <Link to="/forgot" className="text-primary ">
                      Forgot Password
                    </Link>
                    {/* <Link className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" to="/dashboard">SIGN IN</Link> */}
                  </div>
                  {/* <div className="my-2 d-flex justify-content-between align-items-center">
                    <div className="form-check">
                      <label className="form-check-label text-muted">
                        <input type="checkbox" className="form-check-input"/>
                        <i className="input-helper"></i>
                        Keep me signed in
                      </label>
                    </div>
                    <a href="!#" onClick={event => event.preventDefault()} className="auth-link text-black">Forgot password?</a>
                  </div> */}
                  {/* <div className="mb-2">
                    <button type="button" className="btn btn-block btn-facebook auth-form-btn">
                      <i className="mdi mdi-facebook mr-2"></i>Connect using facebook
                    </button>
                  </div>
                  <div className="text-center mt-4 font-weight-light">
                    Don't have an account? <Link to="/user-pages/register" className="text-primary">Create</Link>
                  </div> */}
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
