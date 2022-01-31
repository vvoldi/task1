import { API } from "../../../API/API.js";
import { selectors } from "../../selectors/selectors.js";
import { controller } from "../../../controller/controller.js";
import { renderTable } from "../../renderTable/renderTable.js";
import { getNotes } from "../../renderTable/getNotes.js";

export const saveNote = async (id, one, cat) => {
    const tr = selectors.notesTable.querySelector(`tr[id="${id}"]`),
        nameTD = tr.querySelector(`#name`),
        categoryTD = tr.querySelector(`#category`),
        contentTD = tr.querySelector(`#content`),
        editBTN = tr.querySelector(`.btn__edit`),
        saveBTN = tr.querySelector(`.btn__save`),
        selectedCategory = categoryTD.querySelector(
            `select[data-name="noteCategory"]`
        ),
        editTDs = tr.querySelectorAll(`.td__edit`);
    [...editTDs].map((td) => td.classList.remove(`activeTD`));

    let editedNote = {
        name: nameTD.innerText,
        category: cat ? cat : selectedCategory.value,
        content: contentTD.innerText,
        archive: one ? one : 0,
    };

    nameTD.contentEditable = "false";
    contentTD.contentEditable = "false";

    saveBTN.disabled = true;
    editBTN.disabled = false;

    let notePUT = await controller(`${API}/${id}`, `PUT`, editedNote);
    getNotes(API);
    if (one == 0) {
        selectors.notesTable.innerHTML = "";
        renderTable(notePUT);
    }
};
