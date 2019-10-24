const axios = require('axios');
const mailer = require('../js/mailer');

const multer = require('multer');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, process.cwd() + '/uploads/agent');
  },
  filename(req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});

const upload = multer({ storage });

module.exports = function({ app, db }) {
    
    // 공인중개사 회원 로그인
    app.post('/api/agentLogin', async (req, res, next) => {

        let sql = db.readSQL(process.cwd() + '/sql/agent/getAgent.sql');
        let result = (await db.getData(sql, [req.body.id, req.body.pw]))[0];
        
        if(result){
            req.session.user = {
              ...result,
              type: 'agent'
            };
        }
      
        res.send(result);
    });

    // 공인중개사 회원 아이디 찾기
    app.get('/api/agentFindId', async (req, res, next) => { 
        
        let sql = db.readSQL(process.cwd() + '/sql/agent/findAgentId.sql');
        let result = await db.getData(sql, [req.query.name, req.query.phone]);

        res.send(result[0]);
    });

    // 공인중개사 회원 비밀번호 찾기
    app.get('/api/findAgentPass', async (req, res, next) => {

        // db에서 id와 name이 일치하는 값이 있는지 확인
        let sql = db.readSQL(process.cwd() + '/sql/agent/isExistsAgent.sql');
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
            let sql2 = db.readSQL(process.cwd() + '/sql/agent/changeAgentPass.sql');
            db.exec(sql2, [randomPw, req.query.id]);
            
            // 보내기
            mailer(req.query.id, '죽방 비밀번호 찾기 알림 메일입니다.', `${req.query.name}님의 임시 비밀번호는 ${randomPw}입니다`);
            res.send('success');
        } else {
            // 인증이 제대로 안 된 경우
            res.send('');
        }
    });

    // 공인중개사 회원 수정
    app.post('/api/modifyAgent', async (req, res, next) => {
        if (req.session.user.AGENTID === req.body.id) {
            let sql = db.readSQL(process.cwd() + '/sql/agent/modifyAgent.sql');
            let result = await db.exec(sql, [req.body.name, req.body.pass, req.body.phone, req.body.addr, req.body.originname, req.body.path, req.body.id]);

            let sql2 = db.readSQL(process.cwd() + '/sql/agent/getAgent.sql');
            let result2 = (await db.getData(sql2, [req.body.id, req.body.pass]))[0];
            req.session.user = {
                ...result2,
                type: 'agent'
            };

            res.send(result + '');
        } else {
            res.send(-1 + '');
        }
    });

    // 공인중개사 회원에 대한 document_name가져오기
    app.get('/api/agent/documentName', async (req, res, next) => {
        let sql = db.readSQL(process.cwd() + '/sql/agent/getDocumentName.sql');
        let result = (await db.getData(sql, [req.query.id]))[0];

        res.send(result.DOCUMENT_NAME);
    })


    // 공인중개사 회원탈퇴
    app.post('/api/leaveAgent', async (req, res, next) => {
        if (req.session.user.AGENTID === req.body.id){
            let sql = db.readSQL(process.cwd() + '/sql/agent/leaveAgent.sql');
            let result = (await db.exec(sql, [req.body.id]));
            
            res.send(result + '');
        }else {
            res.send(-1 + '');
        }
    });

    // 회원가입
    app.post('/api/joinAgent', async (req, res, next) => { 
        let sql = db.readSQL(process.cwd() + '/sql/agent/insertAgent.sql');
        let result = await db.exec(sql, [req.body.id, req.body.pass, req.body.name, req.body.phone, req.body.addr, req.body.filename]);

        res.send(result + '');
    })

    // 아이디 중복처리
    app.get('/api/checkAgentId', async (req, res, next) => { 
        console.log(req.query.id);
        // 정규식 처리 || 
        if (!req.query.id) {
            res.send('2');
            return;
        }
        let sql = db.readSQL(process.cwd() + '/sql/agent/checkAgentId.sql');
        let result = await db.getData(sql, [req.query.id]);

        res.send(result[0].CNT + '');
    });

    // 파일 업로드
    app.post('/api/file/agent', upload.any(), (req, res, next) => {
        let {
            fieldname,
            originalname,
            filename,
        } = req.files[0];
        
        res.send({
            fieldname,
            originalname,
            filename,
        });
    });

    // X버튼 클릭시 업로드 올라간 파일 삭제
    app.delete('/api/file/agent', require('body-parser').text(), (req, res, next) => {
        let target = JSON.parse(req.body).filename;
        
        // 삭제 눌렀을 때 filename남아있는거 처리
        let result = require('fs').unlinkSync(`${process.cwd()}/uploads/agent/${target}`);
        
        res.status(204).send(result + '');
    });

    // 파일 다운로드
    app.get('/api/file/agent/:filename?', (req, res, next) => {
        if (/.html$/.test(req.params.filename || !req.params.filename)) {
            res.send(`failed to load ${req.params.filename} try again`);
            return;
        }
        res.sendFile(`${process.cwd()}/uploads/agent/${req.params.filename}`);
    });

    // 내놓은 방 리스트
    app.get('/api/getOfferList', async (req, res, next) => {
        let sql = db.readSQL(process.cwd() + '/sql/agent/getOfferHouseList.sql');
        let result = await db.getData(sql);
        res.send(result);
    })

    // 시도 가져오기
    app.get('/api/getAddrSido', async (req, res, next) => {
        let sql = db.readSQL(process.cwd() + '/sql/agent/getAddrSido.sql');
        let result = await db.getData(sql);
        res.send(result);
    })

    // 구군 가져오기
    app.post('/api/getAddrGugun', async (req, res, next) => {
        let sql = db.readSQL(process.cwd() + '/sql/agent/getAddrGugun.sql');
        let result = await db.getData(sql, [req.body.sido]);
        res.send(result);
    })

    app.post('/api/selectHouseSido', async (req, res, next) => {
        let sql = db.readSQL(process.cwd() + '/sql/agent/selectHouseSido.sql');
        let result = await db.getData(sql, [req.body.sido]);
        res.send(result);
    })

    app.post('/api/selectHouseGugun', async (req, res, next) => {
        let sql = db.readSQL(process.cwd() + '/sql/agent/selectHouseGugun.sql');
        let result = await db.getData(sql, [req.body.sido, req.body.gugun]);
        res.send(result);
    })

    // 내놓은방 상세보기
    app.get('/api/getOfferDetails', async (req, res, next) => {
        let sql = db.readSQL(process.cwd() + '/sql/agent/getOffer.sql');
        let result = (await db.getData(sql, [req.query.offerNum]))[0];

        let sql2 = db.readSQL(process.cwd() + '/sql/agent/getOfferPhotoList.sql');
        result = {
            ...result,
            photolist: await db.getData(sql2, [result.OFFERHOUSE_SEQ])
        };

        res.send(result);
    })

    // 내놓은방 견적내기(insert)
    app.post('/api/insertEstimate', async (req, res, next) => {
        let sql = db.readSQL(process.cwd() + '/sql/agent/insertEstimate.sql');
        let result = (await db.exec(sql, [req.body.offerNum, req.session.user.AGENTID, req.body.price]));
        res.send(result + '');
    })
};