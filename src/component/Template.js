import React from 'react';
import Nav from './Nav';

function Template() {
    return (
        <main>
            <header>To do List</header>
            <Nav />
        </main>
    );
};
// 파일만 봐도 구조 눈에 들어올 수 있게 만들기
// Nav에는 탭만
// Nav 밑에 Section 넣기 (view, add, edit 파일 따로)

export default Template;