import { controller } from "../../../controller/controller.js";
import { API } from "../../../API/API.js";
import { selectors } from "../../selectors/selectors.js";
import { getNotes } from "../getNotes.js";
import { checkArchive } from "../../renderArchiveTable/archivation.js";
import { renderArchiveTable } from "../../renderArchiveTable/renderArchiveTable.js";

export const deleteNote = async (obj) => {
    const tr = selectors.notesTable.querySelector(`tr[id="${obj.id}"]`),
        deletednote = await controller(`${API}/${obj.id}`, `DELETE`);

    deletednote && tr.remove();
    getNotes(API);
    checkArchive().then((data) => renderArchiveTable(data));
};
