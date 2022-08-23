import API from "./api";

async function onGetTodoList(todoList) {
    try {
        const response = await API.get('/todo');
        todoList = response.data;
        console.log(response.data);
        console.log(todoList);
    }
    catch (error) {
        console.log(error);
    }
};

export default onGetTodoList;