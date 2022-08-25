import API from "./api";

async function onGetTodoList(todoList) {
    try {
        const getResponse = await API.get('/todo');
            todoList = getResponse.data.data;
    }
    catch (error) {
        console.log(error);
    }
};

export default onGetTodoList;