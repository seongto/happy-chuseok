import React from 'react';
import * as constants from 'constants.js';
import {Route, withRouter} from 'react-router-dom';
import { useState, useEffect } from 'react';
import Helmet from 'react-helmet';
import db from '../Firebase';

const Message = ({match, history}) => {
  const loadedMsgRef = db.collection('messages');
  const cardId = match.params.id;
  const [nameTo, setNameTo] = useState('');
  const [nameFrom, setNameFrom] = useState('');
  const [msg, setMsg] = useState('');
  
  useEffect(()=>{
    const cardData = loadedMsgRef.doc(cardId).get().then((doc)=>{
      if (doc.exists){
        setNameTo(doc.data().send_to);
        setNameFrom(doc.data().send_from);
        setMsg(doc.data().message);
      } else {
        history.push('/');
      }
    })
  }, []);
  
  return (
    <>
      <Helmet>
        <script src="/__/firebase/6.6.0/firebase-app.js"></script>
        <script src="/__/firebase/init.js"></script>
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
      <div className="message-wrapper page-wrapper">
        <img src="https://firebasestorage.googleapis.com/v0/b/happy-chuseok.appspot.com/o/main-image-01.png?alt=media&token=659cc87c-c3dd-4804-80f5-2a31244a03c1" className="main-image" />
        <div className="send-to">
          <h2>{nameTo}</h2>
        </div>
        <p className="message">{msg}</p>  
        <p className="sent-by">{nameFrom}</p>
        <p className="make-new">함께 추석 메세지를 만들어요 :)</p>
        <div 
          onClick={() => history.push('/')} 
          className="go-home-btn"
        >카드 만들기</div>
      </div>
    </>
  );
};

export default withRouter(Message);
