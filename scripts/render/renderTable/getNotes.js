import { API } from "../../API/API.js";
import { controller } from "../../controller/controller.js";
import { renderTable } from "../../render/renderTable/renderTable.js";
import { selectors } from "../selectors/selectors.js";

const getNotes = () => {
    controller(API).then((data) => {
        if (Object.keys(data).length) {
            selectors.notesTable.innerHTML = "";
            Array.isArray(data)
                ? data.forEach((el) => renderTable(el))
                : renderTable(data);
        }
    });
};
getNotes();

export { getNotes };
