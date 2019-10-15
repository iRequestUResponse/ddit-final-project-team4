let nodemailer = require('nodemailer');

//smtp 서버를 사용하기 위한 모듈이다.
let smtpPool = require('nodemailer-smtp-pool');

//nodemailer 의 createTransport는 transporter 객체를 만드는 메소드인데 
//nodemailer-smtp-pool 객체 인스턴스가 이 메소드의 인자로 쓴다.


/**
 * @param to {string} 누구에게 보낼지
 * @param subject {string} 제목
 * @param html {string} 내용
 */
module.exports = function(to, subject, html) {
    let smtpTransport = nodemailer.createTransport(smtpPool( {
        service:'Gmail',
        host:'localhost',
        port:'465',
        tls:{
            rejectUnauthorize:false
        },
    
        //이메일 전송을 위해 필요한 인증정보
    
        //gmail 계정과 암호 
        auth:{
            user:'khsok212@gmail.com',
            pass:'tkfkdgo90!'
        },
        maxConnections: 5,
        maxMessages: 10
    }));

    let mailOpt={
        from:'khsok212@gmail.com',
        to,
        subject,
        html,
    }

    smtpTransport.sendMail(mailOpt, function(err, res) {
        if( err ) {
            console.log(err);
        }else{
            console.log('Message send :', res);
        }
    
        smtpTransport.close();
    })
}