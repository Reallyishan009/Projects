export default class kanbanapi {

    static getItem(columnId){
        const column  = read().find(column => column.id == columnId);
        if(!column){
            return [];
        }
        return column.items;
    }

    static insertItem (columnId ,content){
        const data =read();
        const column  = data.find(column => column.id == columnId);
        const item ={
            id: Math.floor(Math.random*100000),
            content : content
        };
        if(!column){
            throw new Error("Column does not exist");
        }
        column.items.push(item);
        save(data);
        return item;
    }
}

function read() {
    const json = localStorage.getItem("kanban-data");

    if (!json) {
        return [
            {
                id: 1,
                items: []
            },
            {
                id: 2,
                items: []
            },
            {
                id: 3,
                items: []
            }
        ];
    }

    return JSON.parse(json);
}

function save(data){
    localStorage.setItem("kanban-data", JSON.stringify(data));
}