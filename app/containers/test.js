/**
 * 패스포트 기본 설정 파일
 *
 * 패스포트 설정을 위한 기본 파일로 passport 폴더에 있는 설정 파일들을 사용함
 * serializeUser, deserializeUser 메소드 설정
 *
 * @date 2019-02-27
 * @author Seongjoon Jeong
 */
// config/passport.js

// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;
var bcrypt   = require('bcrypt-nodejs');
var AWS = require('aws-sdk')
var dynamodb = new AWS.DynamoDB();
var tableName = "crew"

// expose this function to our app using module.exports
module.exports = function(passport) {
  // =========================================================================
  // passport session setup ==================================================
  // =========================================================================
  // required for persistent login sessions
  // passport needs ability to serialize and unserialize users out of session

  // used to serialize the user for the session
  passport.serializeUser(function(user, done) {
    done(null, user.id.N);
  });

  // used to deserialize the user
  passport.deserializeUser(function(id, done) {
    dynamodb.getItem({"TableName":tableName,"Key": {"id":{"N":id}}}, function(err,data){
      if (err){
        done(err,data);
      }
      done(err,{"id": data.Item.id.N, "email": data.Item.email.S, "pw": data.Item.pw.S});
    })
  });

  // =========================================================================
  // LOCAL SIGNUP ============================================================
  // =========================================================================
  // we are using named strategies since we have one for login and one for signup
  // by default, if there was no name, it would just be called 'local'

  passport.use('local-signup', new LocalStrategy({
      // by default, local strategy uses username and password, we will override with email
      usernameField : 'email',
      passwordField : 'password',
      passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) {
      // 요청 파라미터 중 name 파라미터 확인
      var paramName = req.body.name || req.query.name;
      var paramPhone = req.body.phone || req.query.phone;

      var params = {
        "TableName":tableName,
        "IndexName":"email-index",
        "KeyConditions":{
          "email":{
            "ComparisonOperator":"EQ",
            "AttributeValueList":[{"S":email}]
          }
        }
      }

      console.log("Scanning for :"+JSON.stringify(params))//.Items["email"].name)

      // find a user whose email is the same as the forms email
      // we are checking to see if the user trying to login already exists
      dynamodb.query(params, function(err,data){
        // if there are any errors, return the error
        if (err){
          return done(err);
        }

        // check to see if theres already a user with that email
        if (data.Items.length > 0) {
          return done(null, false, req.flash('signupMessage', '계정이 이미 있습니다.'));
        } else {

          var params = {
            "TableName":tableName,
            "Item" : {
              "id":{"N":(Math.floor(Math.random() * 4294967296)).toString()},
              "email":{"S":email},
              "pw":{"S":bcrypt.hashSync(password)},
              "name":{"S":paramName},
              "phone":{"S":paramPhone}
            }
          }
          dynamodb.putItem(params, function(err,data){
            if (err){
              return done(null, false, req.flash('signupMessage', "죄송합니다. 다시 시도해보세요 : ("+err+")"));
            }else{
              console.log("관리자 회원 데이터 DB에 추가함.");
              return done(null, params.Item);
            }
          })
        }
      });
    }));

  // =========================================================================
  // LOCAL LOGIN =============================================================
  // =========================================================================
  // we are using named strategies since we have one for login and one for signup
  // by default, if there was no name, it would just be called 'local'

  passport.use('local-login', new LocalStrategy({
      // by default, local strategy uses username and password, we will override with email
      usernameField : 'email',
      passwordField : 'password',
      passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) { // callback with email and password from our form
      var params = {
        "TableName":tableName,
        "IndexName":"email-index",
        "KeyConditions":{
          "email":{
            "ComparisonOperator":"EQ",
            "AttributeValueList":[{"S":email}]
          }
        }
      }
      dynamodb.query(params, function(err,data){
        if (err){
          console.log('DB 쿼리 참조 실패'); //
          return done(err);
        }
        if (data.Items.length == 0){
          console.log('등록된 계정이 없습니다.'); //
          return done(null, false, req.flash('loginMessage', '등록된 계정이 없습니다.')); // req.flash is the way to set flashdata using connect-flash
        }
        dynamodb.getItem({"TableName":tableName,"Key": {"id":data.Items[0]["id"]}}, function(err,data){
          if (err){
            console.log('DB 항목 참조 실패'); //
            return done(err);
          }
          if (!bcrypt.compareSync(password, data.Item.pw.S)){
            console.log('잘못된 비밀번호 입니다.'); //
            return done(null, false, req.flash('loginMessage', '잘못된 비밀번호 입니다.')); // create the loginMessage and save it to session as flashdata
          }else{
            console.log('DB 항목 확인 및 조회 완료.'); //
            console.log(Object.keys(data.Item)); //
            console.log(data.Item.email.S); //
            return done(null, data.Item);
          }
        })
      });
    }));
};
