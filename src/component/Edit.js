import React, { useCallback, useEffect, useState } from 'react';
import API from '../modules/api';
import onGetTodoList from '../modules/onGetTodoList';

function Edit() {

    // 수정할 todoList
    const [todoList, setTodoList] = useState([]);

    // 비교군 todoList
    const [oldTodoList, setOldTodoList] = useState([]);

    // 할 일 목록 조회
    const getData = async () => {
        try {

            // 데이터 가져오기
            const getTodoList = await onGetTodoList();

            // todoList값 변경
            setTodoList(getTodoList);

            // oldTodoList값 변경
            setOldTodoList(getTodoList);
        }

        catch (error) {
            console.log(error);
        }
    };

    // 목록 조회
    useEffect(() => {
        getData()
    }, []);

    // 할 일 수정 함수
    const onEdit = useCallback(({ target: { id, value } }) => {

        const editList = JSON.parse(JSON.stringify(todoList));
        
        // 수정 후 목록 
        editList.map((row) => {
            if (Number(id) === row.rowKey) {
                return row.text = value;
            }
            return row;
        });

        // todoList 변경 (화면 출력)
        setTodoList(editList);
    }, [todoList]);

    // 할 일 삭제 함수
    const onDelete = useCallback(({ target: { id } }) => {

        const deleteList = JSON.parse(JSON.stringify(todoList))
        
        // 삭제 후 목록
        deleteList.filter((row) => {
            return (
                Number(id) !== row.rowKey
            );
        });

        // todoList 변경 (화면 출력)
        setTodoList(deleteList);
    }, [todoList]);

    // 저장 함수
    const onSave = async () => {

        // 수정 요청할 데이터 배열
        const editData = todoList.filter(row =>
            !oldTodoList.some(old =>
                old.rowKey === row.rowKey && old.text === row.text
            )
        );

        // 삭제 요청할 데이터 배열
        const deleteData = oldTodoList.filter(old =>
            !todoList.some(row =>
                old.rowKey === row.rowKey
            )
        );

        try {

            let check = true;

            // 데이터 수정 요청
            editData.map(async (row) => {
                const response = await API.patch('/todo/' + row.rowKey, {
                    text: row.text
                });

                console.log('editData=', response);

                
                if (response.data.message !== 'SUCCESS') {
                    check = false;
                }
            })

            check === false ? alert('실패') : alert('저장')

            // 데이터 삭제 요청
            deleteData.map(async (row) => {
                const response = await API.delete('/todo/' + row.rowKey);

                console.log('deleteData=', response);
            });
        }
        
        catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='editItems'>
            {todoList.map((row) => {
                return (
                    <div key={row.rowKey} className='editItem'>
                        <input
                            type='text'
                            placeholder='할 일을 입력하세요.'
                            id={row.rowKey}
                            value={row.text}
                            onChange={onEdit}
                            autoComplete='off' />
                        <button
                            id={row.rowKey}
                            onClick={onDelete}
                        >X</button>
                    </div>
                )
            })}
            <button className='save' onClick={onSave}>Save</button>
        </div>
    );
};

export default React.memo(Edit);