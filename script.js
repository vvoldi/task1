//API
const API = `https://61e185ff63f8fc0017618ccb.mockapi.io/notes`;

// CONTROLLER
const controller = async (url, method = "GET", obj) => {
    let options = {
        method: method,
    };

    if (obj) {
        options.body = JSON.stringify(obj);
        options.headers = {
            "Content-Type": "application/json",
        };
    }

    let request = await fetch(url, options),
        response = await request.ok ? request.json() : {};
        
    return response;
};
// CONSTS SELECTORS
const notesForm = document.querySelector(`#notesForm`),
    noteName = notesForm.querySelector(`input[data-name="noteName"]`),
    noteContent = notesForm.querySelector(`input[data-name="noteContent"]`),
    noteCategory = notesForm.querySelector(`select[data-name="noteCategory"]`),
    notesTable = document.querySelector(`#notesTable tbody`),
    ArchiveTable = document.querySelector(`#archiveTable tbody`);



// GET NOTES
const getRender = (API) => {
    controller(API)
    .then(data => {
        if (Object.keys(data).length) {
            notesTable.innerHTML = ''
            Array.isArray(data) ? data.forEach((el) => renderTable(el)) : renderTable (data)
        }
    })
        
    
};
getRender(API);

// FORM
notesForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const getDate = () => {
        const date = new Date();

        const options = {
            year: "numeric",
            month: "long",
            day: "numeric",
        };

        return date.toLocaleString("en-US", options);
    };

    if (noteName.value) {
        let noteObj = {
            name: noteName.value,
            createdAt: getDate(),
            category: noteCategory.value,
            content: noteContent.value,
            archive: false
        };

        let obj = await controller(API, "POST", noteObj);

        renderTable(obj);
        notesForm.reset();
        noteName.value = ``;
        
    }
});



// ARCHIVE NOTE
let data = {
    Task: [3,0],
    Random:[1,0],
    Idea:[1,0]
}
const renderArchiveTable = (data) => {
    ArchiveTable.innerHTML = `<tr>
                                                <td>${Object.entries(data)[0][0]}</td>
                                                <td id="task_active">${Object.entries(data)[0][1][0]}</td>
                                                <td id="task_archive">${ Object.entries(data)[0][1][1]}</td>
                                            </tr>
                                            <tr>
                                                <td>${Object.entries(data)[1][0]}</td>
                                                <td id="random_active">${Object.entries(data)[1][1][0]}</td>
                                                <td id="random_archive">${Object.entries(data)[1][1][1]}</td>
                                            </tr>
                                            <tr>
                                                <td>${Object.entries(data)[2][0]}</td>
                                                <td id="idea_active">${Object.entries(data)[2][1][0]}</td>
                                                <td id="idea_archive">${ Object.entries(data)[2][1][1]}</td>
                                            </tr>`;
}

const archiveNote = (obj) => {
    const deleteTR = notesTable.querySelector(`tr[id="${obj.id}"]`),
        categoryTDvalue = deleteTR.querySelector(`#category`).innerText;
            for (let key in data) {
            // data - ручной объект в переменной
                if(key == categoryTDvalue){
                    data[key][0] = data[key][0]-1;
                    data[key][1] = data[key][1]+1;
                    deleteTR.remove()
                }
               
               
            }
            let dataUPD = data
            renderArchiveTable(dataUPD)
            
}


// const checkArchive = async ()=> {

//     let request = fetch(API)
//         .then((response) => response.json())
//         .then((data) => {
//         return data;
//         });

//     let catArr = [],
//     response = await request
//     response.map(el => {
//     catArr.push(Object.values(el)[2])
//     });
//     let res = catArr.reduce((acc, el) => {
//         acc[el] = (acc[el] || 0) + 1;
//         return acc;
//     }, {});
    
//     for (let key in res) {
//         let arr = [0]
//         arr.unshift(res[key])
//         res[key] = arr
//     }
//     return res


//     // возвращает объект типа:
//     // let data = {
//     //     Task: [3,0],
//     //     Random:[1,0],
//     //     Idea:[1,0]
//     // }
// }



// RENDER TABLE
const renderTable = async (obj) => {
    let tr = document.createElement(`tr`);
    tr.id = obj.id;
    tr.innerHTML = `<td class="td__edit" id="name">${obj.name}</td>
                    <td>${obj.createdAt}</td>
                    <td class="td__edit" id="category">${obj.category}</td>
                     ${await filterContentByDate(obj.content)}`;

    let actionsTD = document.createElement(`td`);


    let editBTN = document.createElement(`button`);
    editBTN.innerHTML = `Edit`;
    editBTN.className = 'btn btn__edit';
    editBTN.addEventListener(`click`, () =>  editNote(obj.id));

    let saveBTN = document.createElement(`button`);
    saveBTN.innerHTML = `Save`;
    saveBTN.className = 'btn btn__save';
    saveBTN.disabled = true;
    saveBTN.addEventListener(`click`, () =>  saveNote(obj.id));

    let archiveBTN = document.createElement(`button`);
    archiveBTN.innerHTML = `Archive`;
    archiveBTN.className = 'btn btn__archive';
    archiveBTN.addEventListener(`click`, () => archiveNote(obj));

    let deleteBTN = document.createElement(`button`);
    deleteBTN.innerHTML = `Delete`;
    deleteBTN.className = 'btn btn__delete';
    deleteBTN.addEventListener(`click`, () => deleteNote(obj));

    tr.append(actionsTD);
    actionsTD.append(editBTN);
    actionsTD.append(saveBTN);
    actionsTD.append(archiveBTN);
    actionsTD.append(deleteBTN);
    notesTable.append(tr);
    
        
    renderArchiveTable(data)
    

};

// FILTER NOTES CONTENT BY DATES

const filterContentByDate = async (contentValue) => {
    const regexp = /(0[1-9]|[12][\d]|3[01])\W(0[1-9]|1[0-2])\W(2\d{3})/g;
    let contentObjResult = {
        content: "",
        data: "",
    };
    contentObjResult.content = contentValue;
    const result = contentValue.match(regexp);
    if (result) {
        contentObjResult.data = result.join(", ");
    }

    return `<td class="td__edit" id="content">${contentObjResult.content}</td>
            <td>${contentObjResult.data}</td>`;
};


// DELETE NOTE
const deleteNote = async (obj) => {
    const tr = notesTable.querySelector(`tr[id="${obj.id}"]`),
         deletednote = await controller(`${API}/${obj.id}`, `DELETE`);
    deletednote && tr.remove()
    getRender(API)
    
};
// EDIT NOTE

const editNote = (id) => {
    
    const tr = notesTable.querySelector(`tr[id="${id}"]`),
        nameTD = tr.querySelector(`#name`),
        categoryTD = tr.querySelector(`#category`),
        contentTD = tr.querySelector(`#content`),
        editBTN = tr.querySelector(`.btn__edit`),
        saveBTN = tr.querySelector(`.btn__save`),
        editTDs = tr.querySelectorAll(`.td__edit`);
        [...editTDs].map( td => td.classList.add(`activeTD`))



        nameTD.contentEditable = "true";
        contentTD.contentEditable = "true";

        categoryTD.innerHTML = `<select data-name="noteCategory">
                                        <option value="Task">Task</option>
                                        <option value="Random Thought">Random Thought</option>
                                        <option value="Idea">Idea</option>
                                </select>`
        saveBTN.disabled = false;
        editBTN.disabled = true;
}    
//EDIT NOTE
const saveNote = async (id) => {

    const tr = notesTable.querySelector(`tr[id="${id}"]`),
        nameTD = tr.querySelector(`#name`),
        categoryTD = tr.querySelector(`#category`),
        contentTD = tr.querySelector(`#content`),
        editBTN = tr.querySelector(`.btn__edit`),
        saveBTN = tr.querySelector(`.btn__save`),
        selectedCategory = categoryTD.querySelector(`select[data-name="noteCategory"]`),
        editTDs = tr.querySelectorAll(`.td__edit`);
        [...editTDs].map( td => td.classList.remove(`activeTD`))

    let editedNote = {
                name: nameTD.innerText,
                category: selectedCategory.value,
                content: contentTD.innerText
    };
    
    nameTD.contentEditable = "false";
    contentTD.contentEditable = "false";

    saveBTN.disabled = true;
    editBTN.disabled = false;


    let notePUT = await controller(`${API}/${id}`, `PUT`, editedNote);
    notesTable.innerHTML = ''
    getRender(API)
    renderTable(notePUT)
    
}

