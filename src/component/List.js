import React, { useCallback, useEffect, useState } from 'react';
import modeState from '../atom/modeState';
import { useRecoilValue } from 'recoil';
import API from '../modules/api';
import Add from './Add';
import onGetTodoList from '../modules/onGetTodoList';

function List() {

    // 모드 변경 (View, Add)
    const mode = useRecoilValue(modeState);

    // 할 일 목록
    const [todoList, setTodoList] = useState([]);

    // 목록 조회 함수 실행 flag
    const [addFlag, setAddFlag] = useState(true);

    // 완료된 할 일 체크
    const isCheck = useCallback (async ({ target: { id, checked } }) => {
        try {

            // 변경 전 flag값 변경
            setAddFlag(false);

            // 체크 변경 수정 요청
            const response = await API.patch('/todo/' + id, {
                isCheck: checked ? 'Y' : 'N',
            });

            console.log('isCheck=',response);

            // 요청 성공 시
            if (response.data.message === 'SUCCESS') {

                // 변경된 목록 조회
                setAddFlag(true);
            }
        }

        catch (error) {
            console.log(error);
        }
    }, []);

    // 할 일 목록 조회
    const getData = async () => {
        try {

            // 데이터 가져오기
            const getTodoList = await onGetTodoList();

            // todoList 변경
            setTodoList(getTodoList);
        }

        catch (error) {
            console.log(error);
        }
    };

    // 할 일 추가할 때마다 목록 조회
    useEffect(() => {

        // addFlag === true일 때 getData 함수 실행
        if (addFlag) { 
            getData();
        }

    }, [addFlag]);

    return (
        <div className='listItems'>
            {todoList.map((row) => {
                return (
                    <div key={row.rowKey} className='listItem'>
                        {mode === 'View' && <input
                            type='checkbox'
                            id={row.rowKey}
                            checked={row.isCheck === 'Y' ? true : false}
                            onChange={isCheck} />}
                        <div style={{
                            display: 'inline-block',
                            textDecoration: row.isCheck === 'Y' && mode === 'View'
                                ? 'line-through'
                                : 'none',
                            color: row.isCheck === 'Y' && mode === 'View'
                                ? 'gray'
                                : 'black'
                        }}>{row.text}</div>
                    </div>
                )
            })}
            {mode === 'Add' && <Add setAddFlag={setAddFlag} />}
        </div>
    );
};

export default React.memo(List);