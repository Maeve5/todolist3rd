import React from 'react';
import { useRecoilState } from 'recoil';
import todoListState from '../atom/todoListState';


function Edit () {

    const [todoList, setTodoList] = useRecoilState(todoListState);

    const onGetTodoList();

    const onEdit = () => {

    };

    const onDelete = () => {

    };

    const onSave = () => {

    };

    return (
        <div className='edit'>

            <input type='text' id={} value={} onChange={onEdit} />
            <button onClick={onDelete}>X</button>
            <button onClick={onSave}>Save</button>
        </div>
    );
};

export default Edit;