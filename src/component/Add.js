import React, { useRef, useState } from 'react';
import API from '../modules/api';
import onGetTodoList from '../modules/onGetTodoList';

function Add () {

    const [todo, setTodo] = useState('');
    const input = useRef(null);

    const onChange = (e) => {
        setTodo(e.target.value);
    };

    const onAdd = async () => {
        try {
            const response = await API.post('/todo', {
                text:todo,
            });
            onGetTodoList();
            setTodo('');
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