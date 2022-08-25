import API from "./api";

async function onGetTodoList() {
    try {
        const response = await API.get('/todo');
        console.log('ongettodolist=',response);
        return response.data.data;
    }
    catch (error) {
        console.log(error);
    }
};

export default onGetTodoList;