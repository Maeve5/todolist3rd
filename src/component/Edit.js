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


    // 할 일 수정 함수 (on blur = outfocus되면 데이터 api 저장)
    const onChange = useCallback(({ target: { id, value } }) => {

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
    const onDelete = useCallback(async ({ target: { id } }) => {
        try {

            // 해당 할 일 삭제 요청
            const response = await API.delete('/todo/' + id);

            console.log('onDelete=', response);

            // 삭제 요청 성공 시
            if (response.data.message === 'SUCCESS') {
                alert('삭제되었습니다.');
                getData();
            }

        }

        // 삭제 요청 실패 시
        catch (error) {
            alert(error.message);
            console.log(error);
        }
    }, []);

    // 저장 함수
    const onEdit = () => {

        // 수정 요청할 데이터 배열 (반복문 중첩 비효율)
        const editData = todoList.filter(row =>
           !oldTodoList.some(old =>
                old.rowKey === row.rowKey && old.text === row.text
            )
        );

        // 데이터 수정 요청
        editData.forEach(async (row) => {
            try {
                const response = await API.patch('/todo/' + row.rowKey, {
                    text: row.text
                });

                console.log('editData=', response);

                // 수정 요청 성공 시
                if (response.data.message === 'SUCCESS') {
                    alert('저장되었습니다.');
                }
            }

            // 수정 요청 실패 시
            catch (error) {
                alert(error.message);
                console.log(error);
            }
        });
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
                            onChange={onChange}
                            autoComplete='off' />
                        <button
                            id={row.rowKey}
                            onClick={onDelete}
                        >X</button>
                    </div>
                )
            })}
            <button className='save' onClick={onEdit}>Save</button>
        </div>
    );
};

export default React.memo(Edit);