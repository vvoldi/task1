import { selectors } from "../../selectors/selectors.js";

export const editNote = (id) => {
    const tr = selectors.notesTable.querySelector(`tr[id="${id}"]`),
        nameTD = tr.querySelector(`#name`),
        categoryTD = tr.querySelector(`#category`),
        contentTD = tr.querySelector(`#content`),
        editBTN = tr.querySelector(`.btn__edit`),
        saveBTN = tr.querySelector(`.btn__save`),
        editTDs = tr.querySelectorAll(`.td__edit`);
    [...editTDs].map((td) => td.classList.add(`activeTD`));

    nameTD.contentEditable = "true";
    contentTD.contentEditable = "true";

    categoryTD.innerHTML = `<select data-name="noteCategory">
                                        <option value="Task">Task</option>
                                        <option value="Random">Random</option>
                                        <option value="Idea">Idea</option>
                                </select>`;
    saveBTN.disabled = false;
    editBTN.disabled = true;
};
