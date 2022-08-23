import React, { useEffect } from 'react';
import modeState from '../atom/modeState';
import { useRecoilState, useRecoilValue } from 'recoil';
import API from '../modules/api';
import todoListState from '../atom/todoListState';
import Add from './Add';

function List() {

    // 모드값 가져오기 (View, Add)
    const mode = useRecoilValue(modeState);
    // todoList
    const [todoList, setTodoList] = useRecoilState(todoListState);

    // 완료된 할 일 체크
    const isCheck = async ({ target: { id, checked } }) => {
        try {
            const checkResponse = await API.patch('/todo/' + id, {
                isCheck: checked ? 'Y' : 'N',
            });
            onGetTodoList();
            console.log(checkResponse);
        }
        catch (error) {
            console.log(error);
        }
    };

    // useCallback 이렇게 써도 되나? 돌아가긴 하는데
    // const isCheck = useCallback( async ({ target: { id, checked } }) => {
    //    // console.log(checked);
    //     try {
    //         const checkResponse = await API.patch('/todo/' + id, {
    //             isCheck: checked ? 'Y' : 'N',
    //         });
    //         onGetTodoList();
    //         console.log(checkResponse);
    //     }
    //     catch (error) {
    //         console.log(error);
    //     }
    // }, [todoList]);

    // todoList 조회
    const onGetTodoList = async () => {
        try {
            const getResponse = await API.get('/todo');
            setTodoList(getResponse.data.data);
            console.log(getResponse);
        }
        catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        onGetTodoList()
    }, []);


    return (
        <div className='listItems'>
            {todoList.map((row) => {
                return (
                    <div key={row.rowKey}>
                        {mode === 'View' && <input
                            type='checkbox'
                            id={row.rowKey}
                            checked={row.isCheck === 'Y' ? true : false }
                            onChange={isCheck} />}
                        <div style={{
                            display: 'inline-block',
                            textDecoration: row.isCheck === 'Y'
                                ? 'line-through'
                                : 'none',
                            color: row.isCheck === 'Y'
                                ? 'gray'
                                : 'black'
                        }}>{row.text}</div>
                    </div>
                )
            })}
            {mode === 'Add' && <Add />}
        </div>
    );
};

export default List;