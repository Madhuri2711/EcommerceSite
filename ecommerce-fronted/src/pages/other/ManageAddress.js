import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import { Avatar, Button } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import AddNewAddress from "./AddNewAddress";
import {
  removeAddress,
  updateAddress,
} from "../../services/profile.service";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { fetchAddresses } from "../../slices/address";
import swal from "sweetalert";

const useStyles = makeStyles((theme) => ({
  saveBtn: {
    width: "150px",
    padding: "12px",
    color: "rgb(255, 255, 255)",
    borderRadius: "3px",
    fontSize: "16px",
    boxShadow: "none",
  },
  component: {
    padding: "30px 40px 30px 40px",
    background: "#fff",
    boxShadow: "0 2px 4px 0 rgb(0 0 0 / 8%)",
    border: "1px #fff",
    height: "auto",
    '@media (max-width: 575.98px)': {
      padding: "30px 20px 30px 20px",
    }
  },
  title: {
    fontSize: "18px",
    fontWeight: "600 !important",
    paddingRight: "24px",
    display: "inline-block",
    paddingBottom: "25px",
  },
  form: {
    display: "flex",
    alignItems: "flex-start",
    margin: "20px 0",
  },
  input: {
    width: "270px",
    fontSize: "14px",
    outline: "none",
    borderRadius: "2px",
    boxShadow: "none",
    marginRight: 10,
  },
  profileWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    margin: "10px",
    backgroundColor: "#fbdead",
    borderRadius: "10px",
    height: "auto",
    padding: "30px 20px 30px 20px",
    '@media (max-width: 575.98px)': {
      display: 'block',
    }
  },
  large: {
    width: "100px !important",
    height: "100px !important",
    marginLeft: "10px",
  },
  formcontrolwidth: {
    width: "100%",
  },
  checkbox: {
    width: "16px",
  },
  addresstitle: {
    fontSize: "14px",
    color: "#f18b27",
    fontWeight: 500,
    padding: "16px 0",
    paddingLeft: "16px !important",
    cursor: "pointer",
    border: "1px solid #F18B27",
    borderRadius: "10px",
  },
  addressdescription: {
    paddingLeft: '40px',
    '@media (max-width: 575.98px)': {
      paddingLeft: '0px',
    }
  },
  addressbox: {
    margin: "10px",
  },
  icon: {
    display: "none",
  },
}));

const ManageAddress = ({ cartScreen }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [filteredaddress, setFilteredAddress] = useState({});
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(0);
  const [defaultAddress, setDefaultAddress] = useState(false);
  const dispatch = useDispatch();
  const { address } = useSelector((state) => state.address);
  const [type, setType] = useState("");

  useEffect(() => {
    dispatch(fetchAddresses());
  }, [dispatch, open]);

  const addressCard = () => {
    setOpen(true);
  };

  const deleteAddress = async (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to see your address.!",
      icon: "warning",
      buttons: {
        cancel: "Cancel",
        catch: "Delete",
      },
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        const response = await removeAddress(id);
        console.log(response);
        if (response?.status === 200) {
          dispatch(fetchAddresses());
          swal("Your address has been deleted.!", {
            icon: "success",
          });
        }
      } else {
        swal("Your address has been safe.!");
      }
    });
  };

  const editData = (addrid) => {
    setOpen(true);
    const filteredAddress = address?.filter((item) => item?._id === addrid)[0];
    setFilteredAddress(filteredAddress);
  };

  const getAddressValue = (event, address) => {
    setChecked((current) => !current);
    if (event?.target?.checked) {
      setDefaultAddress(event?.target?.checked);
      setSelectedAddress(address);
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const updatedAddress = {
        ...selectedAddress,
        is_default: defaultAddress,
      };
      const response = await updateAddress(
        selectedAddress?._id,
        updatedAddress
      );
      if (response?.isSuccess) {
        setLoading(false);
        setOpen(false);
        toast.success(response?.message);
        dispatch(fetchAddresses());
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <Box className={classes.component}>
      <Typography className={classes.title}>Manage Address</Typography>
      {open ? (
        ""
      ) : (
        <Box onClick={addressCard} className={classes.addressbox}>
          <Typography className={classes.addresstitle}>
            <AddIcon /> ADD A NEW ADDRESS
          </Typography>
        </Box>
      )}

      {open ? (
        <AddNewAddress
          setOpen={setOpen}
          loadAllAddresses={address}
          address={filteredaddress}
          setFilteredAddress={setFilteredAddress}
          type={type}
        />
      ) : (
        ""
      )}
      {!open && address &&
        address?.length > 0 &&
        address?.map((address, index) => {
          return (
            <Box className={classes.profileWrapper} key={address?._id}>
              <Avatar
                alt="Avatar"
                src={
                  // !user?.image
                  "https://cdn3.iconfinder.com/data/icons/avatars-round-flat/33/man5-512.png"
                  // : `${IMG_URL}${user?.image}`
                }
                className={classes.large}
              />
              <Box className={classes.addressdescription}>
                <Typography className={classes.smallText}>
                  {address?.first_name + " " + address?.last_name}
                </Typography>
                <Typography
                  className={classes.boldText}
                >{`Address:  ${address?.address}`}</Typography>
                <Typography className={classes.boldText}>
                  {`Phone:  ${address?.phone_number}`}
                </Typography>
                <Box className="ml-0 mt-1 d-flex justify-content-between">
                  <Button
                    color="error"
                    size="small"
                    onClick={() => {
                      deleteAddress(address?._id);
                    }}
                    sx={{ mr: 1 }}
                  >
                    <DeleteForeverIcon />
                    Delete
                  </Button>
                  {/* <Link
                  className="mt-2"
                  to={`/my-account/address/${address?._id}`}
                > */}
                  <Button
                    size="small"
                    onClick={() => {
                      editData(address?._id);
                      setType("EDIT_ADDRESS");
                    }}
                  >
                    <EditIcon />
                    Edit
                  </Button>
                  {/* {cartScreen && (
                    <div
                      className="d-flex ml-2 justify-content-between mt-1"
                      key={address?._id}
                    >
                      <Formik
                        enableReinitialize
                        initialValues={{ is_default: "" }}
                        // onSubmit={(values) => {
                        //   handleSubmit(values);
                        // }}
                      >
                        {({
                          values,
                          touched,
                          errors,
                          handleChange,
                          handleBlur,
                          handleReset,
                          resetForm,
                        }) => (
                          <Form>
                            <input
                              type="checkbox"
                              className="category-checkbox mt-3"
                              name={address?.is_default}
                              id={index}
                              value={checked}
                              onChange={(event) =>
                                getAddressValue(event, address)
                              }
                            />
                            <label className="defaultlabel ml-1 mb-3">
                              Is Default
                            </label>
                          </Form>
                        )}
                      </Formik>
                    </div>
                  )} */}
                </Box>
              </Box>
            </Box>
          );
        })}

      {cartScreen && (
        <div className="d-flex justify-content-end">
          <button
            className="btn btn-lg btn-block theme-btn mt-2"
            type="submit"
            style={{ width: "100px" }}
            onClick={() => handleSubmit()}
          >
            {loading && (
              <span className="spinner-border spinner-border-sm mb-1"></span>
            )}
            {loading ? "" : "Save"}
          </button>
        </div>
      )}
    </Box>
  );
};

export default ManageAddress;

/*     const address = {
      address: filteredAddress.address,
      city: filteredAddress.city,
      country: filteredAddress.country,
      country_code: filteredAddress.country_code,
      first_name: filteredAddress.first_name,
      is_default: filteredAddress.is_default,
      last_name: filteredAddress.last_name,
      phone_number: filteredAddress.phone_number,
      postal_code: filteredAddress.postal_code,
      state: filteredAddress.state,
      state_code: filteredAddress.state_code,
    };


*/
