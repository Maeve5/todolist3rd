import React, { useRef, useState } from 'react';
import API from '../modules/api';
import onGetTodoList from '../modules/onGetTodoList';

function Add() {

    const [todo, setTodo] = useState('');
    const input = useRef(null);

    const onChange = (e) => {
        setTodo(e.target.value);
    };

    // 할 일 추가 함수
    const onAdd = async () => {
        // 입력값이 없을 때
        if (!todo) {
            alert('할 일을 입력하세요.');
        }
        // 입력값이 있을 때
        try {

            // 할 일 등록
            const response = await API.post('/todo', {
                text: todo,
            });
            onGetTodoList();

            // 입력값 초기화
            setTodo('');

            // 자동 포커스
            input.current.focus();
            console.log(response);
        }
        catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <input
                type='text'
                placeholder='할 일을 입력하세요.'
                value={todo}
                onChange={onChange}
                autoFocus
                ref={input} />
            <button onClick={onAdd}>Add</button>
        </div>
    );
};

export default Add;