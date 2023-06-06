import React from "react";

const SendMail = () =>{
    const SEND_MAIL = `${BASE_URL}admin/admin-send-mail`;
    const [emailList, setEmailList] = useState([]);

    const sendMail = async (fields) => {

        const Info = {
            maillist: emailList,
            text: fields.subject,
            subject: fields.body
        }

        try {
            const { data } = await axios.post(SEND_MAIL, Info);
        }
        catch (e) {
            console.log(e);
        }
    }
}
export default SendMail