const axios = require('axios');
const mailer = require('../js/mailer');

module.exports = function({ app, db }) {

  // 
  app.post('/api/login', async (req, res, next) => {
      let sql = db.readSQL(process.cwd() + '/sql/user/getUser.sql');
      let result = await db.getData(sql, [req.body.id, req.body.pw]);
      req.session.user = result;
      res.send(result);
  });

  app.post('/api/modifyUser', async (req, res, next) => {
    if (req.session.user[0].USERID === req.body.id) {
      let sql = db.readSQL(process.cwd() + '/sql/user/modifyUser.sql');
      let result = await db.exec(sql, [req.body.name, req.body.pass, req.body.phone, req.body.addr, req.body.id]);
      
      let sql2 = db.readSQL(process.cwd() + '/sql/user/getUser.sql');
      req.session.user = await db.getData(sql2, [req.body.id, req.body.pass]);

      res.send(result + '');
    } else {
      res.send(-1 + '');
    }
  });

  app.post('/api/join', async (req, res, next) => { 
    let sql = db.readSQL(process.cwd() + '/sql/user/insertUser.sql');
    let result = await db.exec(sql, [req.body.id, req.body.pass, req.body.name, req.body.phone, req.body.addr]);

    res.send(result + '');
  })

  // 아이디 중복처리
  app.get('/api/checkId', async (req, res, next) => { 
    console.log(req.query.id);
    // 정규식 처리 || 
    if (!req.query.id) {
      res.send('2');
      return;
    }

    let sql = db.readSQL(process.cwd() + '/sql/user/checkUserId.sql');
    let result = await db.getData(sql, [req.query.id]);
    // console.log(result[0].CNT);

    res.send(result[0].CNT + '');
  });


  // 아이디 찾기
  app.get('/api/findId', async (req, res, next) => { 
    
    let sql = db.readSQL(process.cwd() + '/sql/user/findUserId.sql');
    let result = await db.getData(sql, [req.query.name, req.query.phone]);

    res.send(result[0]);
  });

  // 비밀번호 찾기
  app.get('/api/findPass', async (req, res, next) => {

    // db에서 id와 name이 일치하는 값이 있는지 확인
    let sql = db.readSQL(process.cwd() + '/sql/user/isExistsUser.sql');
    let isExists = (await db.getData(sql, [req.query.id, req.query.name]))[0].CNT;

    // 있으면
    if(isExists === 1){
      // 비밀번호 랜덤으로 얻기
      let arr = "0,1,2,3,4,5,6,7,8,9,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,~,`,!,@,#,$,%,^,&,*,(,),-,+,|,_,=,\,[,],{,},<,>,?,/,.,;".split(",");
      let randomPw = createCode(arr, 10);
      
      //비밀번호 랜덤 함수
      function createCode(objArr, iLength) {
        let arr = objArr;
        let randomStr = "";
        for (let j = 0; j < iLength; j++) {
          randomStr += arr[Math.floor(Math.random() * arr.length)];
        }

        return randomStr;
      }
      
      // 바꾸기
      let sql2 = db.readSQL(process.cwd() + '/sql/user/changePass.sql');
      db.exec(sql2, [randomPw, req.query.id]);
      
      // 보내기
      mailer(req.query.id, '죽방 비밀번호 찾기 알림 메일입니다.', `${req.query.name}님의 임시 비밀번호는 ${randomPw}입니다`);
      res.send('success');
    } else {
      // 인증이 제대로안 된 경우
      res.send('');
    }
  });
};

