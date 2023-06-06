import React, { Component } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { BASE_URL } from "../../lib/constant";

export class forgotPasswordChange extends Component {
  constructor(props) {
    super(props);
    this.state = {
      passWord: "",
      token: "",
    };
  }

  forgot = async (e) => {
    e.preventDefault();
    const request = {
      password: this.state.passWord,
    };
    console.log("request.password", request.password)
    if (request.password) {
      const res = await axios.post(
        BASE_URL
          `${BASE_URL}admin/forgot-password-change?token=DcUUxomDvVxcG3Vgkk75jM4L19ptfGPO`,
        request
      );
      if (res?.data?.isSuccess) {
        toast.success("Your Pasword Successfully Update");
        this.props.history.push("/login");
      }
    } else {
      toast.error("please Fill Password");
    }

  };
  componentDidMount() {
    const search = this.props.location.search;
    let token = new URLSearchParams(search).get("token");
    console.log("token", token);
    this.setState({
      token: token,
    });
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
                <h6 className="font-weight-light">
                  Enter your new password below.
                </h6>
                <Form className="pt-3">
                  <Form.Group className="d-flex search-field">
                    <Form.Control
                      type="password"
                      required
                      placeholder="Enter Pasword"
                      size="lg"
                      className="h-auto"
                      onChange={(e) =>
                        this.setState({ passWord: e?.target?.value })
                      }
                    />
                  </Form.Group>
                  <br />

                  <div className="mt-3">
                    <Button
                      type="submit"
                      className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                      onClick={(e) => this.forgot(e)}
                    >
                      Update Password
                    </Button>
                    {/* <Link className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" to="/dashboard">SIGN IN</Link> */}
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default forgotPasswordChange;

// ?token=${this.state.token}
