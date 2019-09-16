import React from 'react';
import * as constants from 'constants.js';
import {Route, withRouter} from 'react-router-dom';
import { useState } from 'react';
import Helmet from 'react-helmet';
import db from '../Firebase';

const Home = ({history}) => {
  const [nameTo, setNameTo] = useState('');
  const [nameFrom, setNameFrom] = useState('');
  const [msg, setMsg] = useState('');
  const [password, setPassword] = useState('');

  console.log(history);
  const onChangeNameTo = e => {
    setNameTo(e.target.value);
  };

  const onChangeNameFrom = e => {
    setNameFrom(e.target.value);
  };
  
  const onChangeMsg = e => {
    setMsg(e.target.value);
  };
  
  const onChangePassword = e => {
    setPassword(e.target.value);
  };
  
  const makeCard = async () => {
    let temp = makeId(10);
    const cardId = await newMsgRef.doc(temp).get().then((doc)=>{
      if (doc.exists){
        return false;
      } else {
        return temp;
      }
    });
    
    if (cardId !== false){
      newMsgRef.doc(cardId).set({
        send_to: nameTo, 
        send_from: nameFrom, 
        message: msg,
        password: password,
      }).then(()=>{
        console.log('success');
        history.push(`/preview/${cardId}`)
      })
    } else {
      console.log('failed');
    }
  };
  
  const newMsgRef = db.collection('messages');
  
  const makeId = (n) => {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for( var i=0; i < n; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
  }
  
  return (
    <>
      <Helmet>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no"/>
        <meta name="generator" content="2019 Happy Chuseok"/>
        <meta name="title" content="행복한 추석되세요!"/>
        <meta name="description" content="손쉽게 추석 메세지를 작성하고 보내보세요."/>
        <meta name="author" content="Someone who loves you"/>
        <meta property="og:title" content="2019 Happy Chuseok"/>
        <meta property="og:description" content="행복한 추석되세요!"/>
        <meta property="og:type" content="blog"/>
        <meta property="og:image" content="https://firebasestorage.googleapis.com/v0/b/happy-chuseok.appspot.com/o/2019_chuseok_thumnail.png?alt=media&token=148a2fd6-0953-4c53-b643-d9072e633111"/>
        <title>행복한 추석되세요!</title>
      </Helmet>
      <div className="home-wrapper page-wrapper">
        <img src="https://firebasestorage.googleapis.com/v0/b/happy-chuseok.appspot.com/o/main-image-01.png?alt=media&token=659cc87c-c3dd-4804-80f5-2a31244a03c1" className="main-image" />
        <h1>
          2019년<br/>
          추석 메세지를<br/>
          보내드려요.
        </h1>
        <h3>
          웹을 통해 손쉽게 추석 메세지를 작성하고 보내보세요. 작성한 메세지 카드는 웹서버에 저장되며 링크주소 또는 카톡 공유를 통해 바로 전달할 수 있어요. 
        </h3>
        <div className="card-inputs send-from">
          <span>보내는 이 : </span>
          <input maxLength="12" value={nameFrom} onChange={onChangeNameFrom} placeholder="당신의 이름"/>
        </div>

        <textarea value={msg} onChange={onChangeMsg} maxLength="500" placeholder="보내고 싶은 말을 자유롭게 쓰세요. (최대 500자)"/>

        <div className="card-inputs send-to">
          <span>받는 분 : </span>
          <input maxLength="12" value={nameTo} onChange={onChangeNameTo} placeholder="예) 아버지에게"/>
        </div>
        <div className="card-inputs password">
          <span>비밀번호 : </span>
          <input maxLength="8" value={password} onChange={onChangePassword} placeholder="추후 수정을 위한 암호"/>
        </div>
        <div 
          onClick={makeCard} 
          className="home-submit-btn"
        >메세지 카드 만들기</div>
        <p>모든 메세지는 2019년 9월 20일,<br/>서버에서 삭제됩니다.</p>
      </div>
    </>
  );
};

  



export default withRouter(Home);
