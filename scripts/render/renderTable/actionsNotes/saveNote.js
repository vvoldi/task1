import { API } from "../../../API/API.js";
import { selectors } from "../../selectors/selectors.js";
import { controller } from "../../../controller/controller.js";
import { renderTable } from "../../renderTable/renderTable.js";
import { getNotes } from "../../renderTable/getNotes.js";


export const saveNote = async (id) => {

    const tr = selectors.notesTable.querySelector(`tr[id="${id}"]`),
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
    selectors.notesTable.innerHTML = ''
    getNotes(API)
    renderTable(notePUT)
    
}
