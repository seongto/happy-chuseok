import React from 'react';
import * as constants from 'constants.js';
import {withRouter} from 'react-router-dom';
import { useState, useEffect } from 'react';
import Helmet from 'react-helmet';
import db from '../Firebase';

const Preview = ({match, history}) => {
  const loadedMsgRef = db.collection('messages');
  const cardId = match.params.id;
  const [nameTo, setNameTo] = useState('');
  const [nameFrom, setNameFrom] = useState('');
  const [msg, setMsg] = useState('');
  const [password, setPassword] = useState('');
    
 
  useEffect(()=>{
    const cardData = loadedMsgRef.doc(cardId).get().then((doc)=>{
      if (doc.exists){
        const inputPw = prompt('비밀번호를 입력하세요.','');
        if (inputPw === doc.data().password){
          setNameTo(doc.data().send_to);
          setNameFrom(doc.data().send_from);
          setMsg(doc.data().message);
          setPassword(inputPw);
        } else {
          alert("비밀번호가 일치하지 않습니다.");
          history.push('/');
        }
      } else {
        history.push('/');
      }
    }).then(()=>{window.Kakao.init("ee0f9030a4a4c5ffdc6b79cab446d889");})
  }, []);
  
  const sendKakao = () => {
    window.Kakao.Link.sendDefault({
      objectType: 'feed',
      content : {
        title:`${nameTo}`,
        description:`당신의 행복한 추석연휴를 소망합니다.`,
        imageUrl:"https://firebasestorage.googleapis.com/v0/b/happy-chuseok.appspot.com/o/2019_chuseok_thumnail.png?alt=media&token=148a2fd6-0953-4c53-b643-d9072e633111",
        link : {
          mobileWebUrl:`https://happy-chuseok.web.app/message/${cardId}`,
          webUrl:`https://happy-chuseok.web.app/message/${cardId}`,
        }
      }, 
      buttons : [
        {
          title:"메세지 보러가기",
          link : {
            mobileWebUrl:`https://happy-chuseok.web.app/message/${cardId}`,
            webUrl:`https://happy-chuseok.web.app/message/${cardId}`,
          }
        },
      ]
    });
  }
  
  const sendSelf = () => {
    alert('입력하신 비밀번호 등의 정보가 함께 전송되니 타인에게 전송하지 마세요.')
    window.Kakao.Link.sendDefault({
      objectType: 'feed',
      content : {
        title: `받은 사람 : ${nameTo}`,
        description:`비밀번호 : ${password}`,
        imageUrl:"https://firebasestorage.googleapis.com/v0/b/happy-chuseok.appspot.com/o/2019_chuseok_thumnail.png?alt=media&token=148a2fd6-0953-4c53-b643-d9072e633111",
        link : {
          mobileWebUrl:`https://happy-chuseok.web.app/edit/${cardId}`,
          webUrl:`https://happy-chuseok.web.app/edit/${cardId}`,
        }
      }, 
      buttons : [
        {
          title:"메세지 수정하기",
          link : {
            mobileWebUrl:`https://happy-chuseok.web.app/edit/${cardId}`,
            webUrl:`https://happy-chuseok.web.app/edit/${cardId}`,
          }
        }
      ]
    });
  }

  return (
    <>
      <Helmet>
        <script src="/__/firebase/6.6.0/firebase-app.js"></script>
        <script src="/__/firebase/init.js"></script>
        <script type="text/JavaScript" src="https://developers.kakao.com/sdk/js/kakao.min.js"></script>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no"/>
        <meta name="generator" content="2019 Happy Chuseok"/>
        <meta name="title" content="행복한 추석되세요!"/>
        <meta name="description" content={`${nameTo}, 행복한 추석되세요!`}/>
        <meta name="author" content="Someone who loves you"/>
        <meta property="og:title" content="2019 Happy Chuseok"/>
        <meta property="og:description" content="행복한 추석되세요!"/>
        <meta property="og:type" content="blog"/>
        <meta property="og:image" content="https://firebasestorage.googleapis.com/v0/b/happy-chuseok.appspot.com/o/2019_chuseok_thumnail.png?alt=media&token=148a2fd6-0953-4c53-b643-d9072e633111"/>
        <title>행복한 추석되세요!</title>
      </Helmet>
      <div className="message-wrapper page-wrapper preview-wrapper">
        <img src="https://firebasestorage.googleapis.com/v0/b/happy-chuseok.appspot.com/o/main-image-01.png?alt=media&token=659cc87c-c3dd-4804-80f5-2a31244a03c1" className="main-image" />
        <div className="send-to">
          <h2>{nameTo}</h2>
        </div>
        <p className="message">{msg}</p>
        <p className="sent-by">{nameFrom}</p>
        <ul>
          <li onClick={sendKakao}>상대방에게 카톡으로 보내기</li>
          <li onClick={sendSelf}>내 카톡으로 정보 보내기</li>
          <li onClick={()=> history.push('/') }>새로운 메세지 보내기</li>
        </ul>
      </div>
    </>
  );
};

export default withRouter(Preview);
