import React, { Component } from "react";
import { useHistory } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { BASE_URL } from "../../lib/constant";

export class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
    };
    this.forgot = this.forgot.bind(this);
  }

  async forgot(e) {
    e.preventDefault();
    try {
      const request = {
        email: this.state.userName,
      };
      const res = await axios.post(
        `${BASE_URL}admin/forgot`,
        request
      );
      if (res?.data?.isSuccess) {
        toast.success("Plase Check Your email Send Link");
      }
    } catch (error) {
      toast.error("User Email Not Exit");
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
                <h6 className="font-weight-light">
                  Enter your email to reset your password.
                </h6>
                <Form className="pt-3">
                  <Form.Group className="d-flex search-field">
                    <Form.Control
                      type="email"
                      required
                      placeholder="Enter email.."
                      size="lg"
                      className="h-auto"
                      onChange={(e) =>
                        this.setState({ userName: e?.target?.value })
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
                      Send Reset Link
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

export default ForgotPassword;
