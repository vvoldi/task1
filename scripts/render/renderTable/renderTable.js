import {filteringContentByDate} from "./actionsNotes/filteringContentByDate.js";
import {deleteNote} from "../../render/renderTable/actionsNotes/deleteNote.js";
import {editNote} from "../../render/renderTable/actionsNotes/editNote.js";
import {saveNote} from "../../render/renderTable/actionsNotes/saveNote.js";
import { selectors } from "../selectors/selectors.js";
import {renderArchiveTable} from "../../render/renderArchiveTable/renderArchiveTable.js";
import { archiveNote, archiveObj } from "./actionsNotes/archiveNote.js";

export const renderTable = async (obj) => {
    let tr = document.createElement(`tr`);
    tr.id = obj.id;
    tr.innerHTML = `<td class="td__edit" id="name">${obj.name}</td>
                    <td>${obj.createdAt}</td>
                    <td class="td__edit" id="category">${obj.category}</td>
                     ${await filteringContentByDate(obj.content)}`;

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
    selectors.notesTable.append(tr);
    
        
    renderArchiveTable(archiveObj)
    

}