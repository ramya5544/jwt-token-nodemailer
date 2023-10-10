import nodemailer from 'nodemailer'
const mail=()=>{

let mailTransporter=nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:"ramyavishvhin1995@gmail.com",
        pass:"kulv llhw rrmx rnr"
    }
})
let details={
    from:"ramyavishvhin1995@gmail.com",
    to:"ramyavishvhin1995@gmail.com",
    subject:"login msg",
    text:"login successfully"
}

mailTransporter.sendMail(details,(err)=>{
    if(err){
        console.log("mail not send");
    }else{
        console.log("mail sent successfully");
    }
})

}
export default mail;