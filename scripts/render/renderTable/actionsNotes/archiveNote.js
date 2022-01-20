import { API } from "../../../API/API.js";
import { selectors } from "../../selectors/selectors.js";
import { renderArchiveTable } from "../../renderArchiveTable/renderArchiveTable.js";

const checkArchive = async () => {
    let request = fetch(API)
        .then((response) => response.json())
        .then((data) => {
            return data;
        });

    let catArr = [],
        response = await request;
    response.map((el) => {
        catArr.push(Object.values(el)[2]);
    });
    let res = catArr.reduce((acc, el) => {
        acc[el] = (acc[el] || 0) + 1;
        return acc;
    }, {});

    for (let key in res) {
        let arr = [0];
        arr.unshift(res[key]);
        res[key] = arr;
    }
    return res;
};

const archiveNote = async (obj) => {
    const deleteTR = selectors.notesTable.querySelector(`tr[id="${obj.id}"]`),
        categoryTDvalue = deleteTR.querySelector(`#category`).innerText;
    checkArchive()
        .then((Obj) => {
            let archiveObj = JSON.parse(JSON.stringify(Obj));
            return archiveObj;
        })
        .then((archiveObj) => {
            for (let key in archiveObj) {
                if (key == categoryTDvalue) {
                    archiveObj[key][0] = archiveObj[key][0] - 1;
                    archiveObj[key][1] = archiveObj[key][1] + 1;
                    deleteTR.remove();
                }

                let archiveObjUPD = archiveObj;
                renderArchiveTable(archiveObjUPD);
            }
        });
};

export { archiveNote, checkArchive };
