import { selectors } from "../selectors/selectors.js";
import { controller } from "../../controller/controller.js";
import { renderTable } from "../../render/renderTable/renderTable.js";
import { API } from "../../API/API.js";
import { checkArchive } from "../renderArchiveTable/archivation.js";
import { renderArchiveTable } from "../renderArchiveTable/renderArchiveTable.js";

selectors.notesForm.addEventListener("submit", async (e) => {
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

    if (selectors.noteName.value) {
        let noteObj = {
            name: selectors.noteName.value,
            createdAt: getDate(),
            category: selectors.noteCategory.value,
            content: selectors.noteContent.value,
            archive: 0,
        };

        let obj = await controller(API, "POST", noteObj);

        renderTable(obj);
        selectors.notesForm.reset();
        selectors.noteName.value = ``;
        checkArchive().then((data) => renderArchiveTable(data));
    }
});
