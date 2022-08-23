import React from 'react';
import modeState from '../atom/modeState';
import { useRecoilState } from 'recoil';
import List from './List';
import Edit from './Edit';

function Nav() {

    // 모드 선언
    const modeList = ['View', 'Add', 'Edit'];

    // 모드 변경
    const [mode, setMode] = useRecoilState(modeState);

    // 클릭 시 모드 변경
    const onClick = (e) => {
        e.preventDefault();
        setMode(e.target.title);
    }

    return (
        <>
            <nav>
                {modeList.map((row, idx) => {
                    return (<a
                        key={idx}
                        href={'/'+row}
                        title={row}
                        onClick={onClick}
                        className={`navItem ${mode === row && 'active'}`}
                    >{row}</a>)
                })}
            </nav>
            <section>
                {mode === 'Edit' ? <Edit /> : <List />}
            </section>
        </>
    );
};

export default Nav;