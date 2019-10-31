const axios = require('axios');
const mailer = require('../js/mailer');

module.exports = function({ app, db }) {
  // 회원 로그인
  app.post('/api/login', async (req, res, next) => {

    let sql = db.readSQL(process.cwd() + '/sql/user/getUser.sql');
    let result = (await db.getData(sql, [req.body.id, req.body.pw]))[0];
    
    console.log(req.cookies)
    
    if(result){
      req.session.user = {
        ...result,
        type: 'user'
      };
    }
    res.send(result);
  });
  
  // 회원 정보 수정
  app.post('/api/modifyUser', async (req, res, next) => {
    if (req.session.user.USERID === req.body.id) {
      let sql = db.readSQL(process.cwd() + '/sql/user/modifyUser.sql');
      let result = await db.exec(sql, [req.body.name, req.body.pass, req.body.phone, req.body.addr, req.body.id]);
      
      let sql2 = db.readSQL(process.cwd() + '/sql/user/getUser.sql');
      let result2 = (await db.getData(sql2, [req.body.id, req.body.pass]))[0];
      req.session.user = {
        ...result2,
        type: 'user'
      };
      
      res.send(result + '');
    } else {
      res.send(-1 + '');
    }
  });
  
  // 회원가입
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
    
    res.send(result[0].CNT + '');
  });
  
  // 토탈 유저 가져오기
  app.get('/api/getUserTotal', async (req, res, next) => { 
    let sql = db.readSQL(process.cwd() + '/sql/user/getUserTotal.sql');
    let result = await db.getData(sql);
    console.log(result[0].TOTALCNT)

    res.send(result[0].TOTALCNT+ '');
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
  
  // 회원탈퇴
  app.post('/api/leaveUser', async (req, res, next) => {
    if (req.session.user.USERID === req.body.id){
      
      let sql = db.readSQL(process.cwd() + '/sql/user/leaveUser.sql');
      let result = (await db.exec(sql, [req.body.id]));
      
      res.send(result + '');
    }else {
      res.send(-1 + '');
    }
  });


 
  // 우리집 내놓기 등록
  app.post('/api/insertOfferHouse', async (req, res, next) => { 
    
    let result2 = 0;

    if(req.body.fileList.length > 10){
      console.log("10개 제한")
      result2 = 2;
      return;
    }
    // 내용 등록
    let sql = db.readSQL(process.cwd() + '/sql/user/insertOfferHouse.sql');
    let result = await db.exec(sql, [req.session.user.USERID, req.body.addr, req.body.addr2, req.body.area, req.body.pyeong]);
    
    let sql2 = db.readSQL(process.cwd() + '/sql/user/getMaxOfferhouse.sql');
    let MaxCount = (await db.getData(sql2))[0].OFFERNUM;
    
    console.log(MaxCount)
    // 이미지 추가
    

    if (req.body.fileList.length == 0){
      let sql1 = db.readSQL(process.cwd() + '/sql/user/insertOfferImg.sql')
      let result1 = (await db.exec(sql1, [MaxCount, 'noimage.png', 'noimage.png', 1]));
      
      result2 = 0;
      result = 1;
      
    } else{
      for (let i = 0; i < req.body.fileList.length; i++){
        let sql1 = db.readSQL(process.cwd() + '/sql/user/insertOfferImg.sql')
        let result1 = (await db.exec(sql1, [MaxCount, req.body.fileList[i], 'user/' + req.body.fileList[i], i+1]));
        if (result1 == 1) {
          result2++;
        }
      }
    }
    
    if(result2 == req.body.fileList.length && result == 1){
      res.send('1');
    }else if(result2 == 2){
      res.send('2');
    }else{
      res.send('0');
      console.log("저장실패");
    }

  })
  

  // 우리집 내놓기 삭제
  app.get('/api/deleteOfferHouse', async (req, res, next) => {
    console.log("삭제왔어")
    
    let sql = db.readSQL(process.cwd() + '/sql/mypage/deleteOfferHouse.sql');
    let result = (await db.exec(sql, [req.query.offerHouseNo]));

    console.log(result)

    res.send(result + '');
  })
  
};