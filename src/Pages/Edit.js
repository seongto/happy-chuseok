import React from 'react';
import * as constants from 'constants.js';
import {withRouter} from 'react-router-dom';
import { useState, useEffect } from 'react';
import Helmet from 'react-helmet';
import db from '../Firebase';

const Edit = ({match, history}) => {
  const loadedMsgRef = db.collection('messages');
  const cardId = match.params.id;
  const [nameTo, setNameTo] = useState('');
  const [nameFrom, setNameFrom] = useState('');
  const [msg, setMsg] = useState('');
  
  useEffect(()=>{
    const cardData = loadedMsgRef.doc(cardId).get().then((doc)=>{
      if (doc.exists){
        const inputPw = prompt('비밀번호를 입력하세요.','');
        if (inputPw === doc.data().password){
          setNameTo(doc.data().send_to);
          setNameFrom(doc.data().send_from);
          setMsg(doc.data().message);
        } else {
          alert("비밀번호가 일치하지 않습니다.");
          history.push('/');
        }
      } else {
        history.push('/');
      }
    })
  }, []);
  
  const onChangeNameTo = e => {
    setNameTo(e.target.value);
  };

  const onChangeNameFrom = e => {
    setNameFrom(e.target.value);
  };
  
  const onChangeMsg = e => {
    setMsg(e.target.value);
  };
  
  const updateCard = async () => {
    loadedMsgRef.doc(cardId).update({
      send_to: nameTo, 
      send_from: nameFrom, 
      message: msg,
    }).then(()=>{
      alert('성공적으로 저장되었습니다.');
      history.push(`/preview/${cardId}`, {auth:true});
    });
    
  }
  
  return (
    <>
      <Helmet>
        <script src="/__/firebase/6.6.0/firebase-app.js"></script>
        <script src="/__/firebase/init.js"></script>
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
      <div className="edit-wrapper page-wrapper">
        <h1>
          수정하기 : {cardId} 
        </h1>
        <p>
          내용을 수정한 후 저장하세요. 
        </p>
        <div className="card-inputs send-from">
          <span>보내는 이 : </span>
          <input maxLength="12" value={nameFrom} onChange={onChangeNameFrom}/>
        </div>

        <textarea value={msg} onChange={onChangeMsg} maxLength="500"/>

        <div className="card-inputs send-to">
          <span>받는 분 : </span>
          <input maxLength="12" value={nameTo} onChange={onChangeNameTo} />
        </div>
        <div 
          onClick={updateCard} 
          className="edit-submit-btn"
        >저장하기</div>    
      </div>
    </>
  );
};

export default withRouter(Edit);
