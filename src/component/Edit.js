import React, { useEffect, useState } from 'react';
import API from '../modules/api';


function Edit () {

    const [todoList, setTodoList] = useState([]);
    const [todo, setTodo] = useState('');

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

    const onEdit = ({target : {value}}) => {

    };

    const onDelete = () => {

    };

    const onSave = () => {

    };

    return (
        <div className='edit'>
            {todoList.map((row) => {
                return (
                    <div key={row.rowKey}>
                        <input
                            type='text'
                            id={row.rowKey}
                            value={setTodo(row.text)}
                            onChange={onEdit} />
                        <button onClick={onDelete}>X</button>
                    </div>
                )
            })}
            <button onClick={onSave}>Save</button>
        </div>
    );
};

export default Edit;