import React  from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import Accordion from 'react-bootstrap/Accordion';

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
    },
    title: {
        fontSize: "18px",
        fontWeight: 600,
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
    formcontrolwidth: {
        width: "100%",
        // [theme.breakpoints.down("sm")]: {
        //   padding: "6px",
        // },
    },
}));

const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "5px",
    },
    preview: {
        display: "flex",
        flexDirection: "column",
    },
    image: { maxWidth: "30%", maxHeight: 135, borderRadius: "10px 50px 10px" },
};

const Support = () => {
    const classes = useStyles();
    return (
        <>
            <Box className={classes.component}>
                <Typography className={classes.title}>Contact</Typography>
                <div className="container accodion-container ">
                    <Accordion flush>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Reporting an issue</Accordion.Header>
                            <Accordion.Body>
                                If there is an issue with your order,please email support@inanihub.com and we will review the issue with the seller.
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>Canceling an order</Accordion.Header>
                            <Accordion.Body>
                                We understand that when you have so amny options for items, it is normal to have a change of heart.You can always cancel an order before you pay. However, when a payment has gone through, the order cannot be cancelled.
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="2">
                            <Accordion.Header>About Inani</Accordion.Header>
                            <Accordion.Body>
                                Inani is a peer to peer shopping platform for the resale of fashion and lifestyle items. With inani, everyone is welcome regardless of race, religion or ethnicity. We are a loving community that brings people together to provide value for the buyers and sellers.
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="3">
                            <Accordion.Header>Delivery time</Accordion.Header>
                            <Accordion.Body>
                               We expect items to be delivered within 5 business days from the day a purchase is made.
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="4">
                            <Accordion.Header>Delivery areas</Accordion.Header>
                            <Accordion.Body>
                               Inani has a community across Canada. We have partnered with Canada post to ensure items are delivered to all areas in Canada.
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </div>
            </Box>
        </>
    );
};
export default Support;
