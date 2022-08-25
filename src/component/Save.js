import React, { useCallback, useEffect, useState } from 'react';
import API from '../modules/api';

function Edit() {

    // 수정할 todoList
    const [todoList, setTodoList] = useState([]);
    // 비교군 todoList
    const [oldTodoList, setOldTodoList] = useState([]);

    // todoList 값 가져오기
    const onGetTodoList = async () => {
        try {
            const getResponse = await API.get('/todo');
            setTodoList(getResponse.data.data);
            setOldTodoList(getResponse.data.data);
        }
        catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        onGetTodoList()
    }, []);

    // 입력값 수정 이벤트 함수
    const onEdit = useCallback (({ target: { id, value } }) => {
        const editList = JSON.parse(JSON.stringify(todoList));
        editList.map((row) => {
            if (Number(id) === row.rowKey) {
                return row.text = value;
            }
            return row;
        });
        setTodoList(editList); // todoList에 저장
    }, [todoList]);

    // 아이템 삭제 이벤트 함수
    const onDelete = useCallback (({ target: { id } }) => {
        const deleteList = JSON.parse(JSON.stringify(todoList)).filter((row) => {
            return (
                Number(id) !== row.rowKey
            );
        });
        setTodoList(deleteList); // todoList에 저장
    }, [todoList]);

    // 저장 버튼
    const onSave = async () => {

        // 수정할 데이터 배열
        const editData = todoList.filter(row =>
            !oldTodoList.some(old =>
                old.rowKey === row.rowKey && old.text === row.text
            )
        );

        // 삭제할 데이터 배열
        const deleteData = oldTodoList.filter(old =>
            !todoList.some(row =>
                old.rowKey === row.rowKey
            )
        );

        try {

            let check = true;

            // 데이터 수정
            editData.map(async (row) => {
                const editdata = await API.patch('/todo/' + row.rowKey, {
                    text: row.text
                });
                console.log('editdata=',editdata);
                // editdata.data.message !== 'SUCCESS' && check = false
                if (editdata.data.message !== 'SUCCESS') {
                    check = false;
                }
            })

            check === false ? alert('실패') : alert('저장')

            // 데이터 삭제
            deleteData.map(async (row) => {
                const deletedata = await API.delete('/todo/' + row.rowKey);
                console.log('deletedata=',deletedata);
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