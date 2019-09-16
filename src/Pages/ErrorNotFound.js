import React from 'react';
import {withRouter} from 'react-router-dom';
import { useState } from 'react';
import Helmet from 'react-helmet';

const ErrorNotFound = props => {
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
      <div className="error404-wrapper page-wrapper">
        <h1>404 Error Not Found.</h1>
        <p>페이지를 찾을 수가 없네요.</p>
        <div onClick={() => props.history.push('/')}>홈으로 돌아가기</div>
      </div>
    </>
  );
};

export default withRouter(ErrorNotFound);
