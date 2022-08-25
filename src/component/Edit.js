import React, { useEffect, useState } from 'react';
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
    const onEdit = ({ target: { id, value } }) => {
        const editList = JSON.parse(JSON.stringify(todoList));
        editList.map((row) => {
            if (Number(id) === row.rowKey) {
                return row.text = value;
            }
            return row;
        });
        setTodoList(editList); // todoList에 저장
    };

    // 아이템 삭제 이벤트 함수
    const onDelete = ({ target: { id } }) => {
        const deleteList = JSON.parse(JSON.stringify(todoList)).filter((row) => {
            return (
                Number(id) !== row.rowKey
            );
        });
        setTodoList(deleteList); // todoList에 저장

        // try {
        //     const deleteResponse = await API.delete('/todo/' + id);
        //     console.log(deleteResponse);
        //     onGetTodoList();
        // }
        // catch (error) {
        //     console.log(error);    
        // }
    };

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

            // for(let i=0; i < editData.length; i++) {
            //     await API.patch('/todo/' + editData[i].rowKey, {
            //         text : editData[i].text
            //     });
            // }

            let check = true;

            // 데이터 수정
            editData.map(async (row) => {
                const response = await API.patch('/todo/' + row.rowKey, {
                    text: row.text
                });
                if (response.data.message !== 'SUCCESS') {
                    check = false;
                }
            })

            if (check === false) {
                alert('실패')
            }
            else {
                alert('저장')
            }

            // 데이터 삭제
            deleteData.map(async (row) => {
                await API.delete('/todo/' + row.rowKey);
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

export default Edit;