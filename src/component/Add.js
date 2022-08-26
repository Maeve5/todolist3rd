import React, { useRef, useState } from 'react';
import API from '../modules/api';

function Add({ setAddFlag }) {

    // 할 일
    const [todo, setTodo] = useState('');

    // 지정 element 속성 변경
    const input = useRef(null);

    // 입력값 state 변경
    const onChange = (e) => {
        setTodo(e.target.value);
    };

    // 할 일 추가 함수
    const onAdd = async () => {

        // 입력값이 있을 때
        try {

            // 변경 전 flag값 변경
            setAddFlag(false);

            // 데이터 등록 요청
            const response = await API.post('/todo', {
                text: todo,
            });

            console.log('onAdd=', response);

            // 요청 성공 시
            if (response.data.message === 'SUCCESS') {

                // 변경된 목록 조회
                setAddFlag(true);

                // 입력값 초기화
                setTodo('');

                // 자동 포커스
                input.current.focus();
            }
        }
        catch (error) {

            // 입력값이 없을 때
            if (!todo) {
                alert(error.response.data.message);
            }
            else {
                console.log(error);
            }
        }
    };

    return (
        <div className='addItem'>
            <input
                type='text'
                placeholder='할 일을 입력하세요.'
                value={todo}
                onChange={onChange}
                autoFocus
                ref={input} />
            <button onClick={onAdd}>+</button>
        </div>
    );
};

export default React.memo(Add);