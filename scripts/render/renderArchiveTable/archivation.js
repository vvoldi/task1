import { API } from "../../API/API.js";
import { selectors } from "../selectors/selectors.js";
import { renderArchiveTable } from "./renderArchiveTable.js";
import { saveNote } from "../renderTable/actionsNotes/saveNote.js";
import { controller } from "../../controller/controller.js";

let sumTask = 0,
    sumRandom = 0,
    sumIdea = 0;

const checkArchive = async () => {
    let Archive = {
            Task: [],
            Random: [],
            Idea: [],
        },
        IdeaArr = [],
        RandomArr = [],
        TaskArr = [],
        response = await controller(API);

    response.map((el) => {
        let category = Object.values(el)[2],
            archiveStatus = Object.values(el)[4];

        switch (category) {
            case "Task":
                if (archiveStatus == 1) {
                    TaskArr.push(archiveStatus);
                    sumTask = TaskArr.reduce((a, b) => a + b);
                } else if (archiveStatus == 0) {
                    Archive.Task.push(archiveStatus);
                }
                break;
            case "Random":
                if (archiveStatus == 1) {
                    RandomArr.push(archiveStatus);
                    sumRandom = RandomArr.reduce((a, b) => a + b);
                } else if (archiveStatus == 0) {
                    Archive.Random.push(archiveStatus);
                }
                break;
            case "Idea":
                if (archiveStatus == 1) {
                    IdeaArr.push(archiveStatus);
                    sumIdea = IdeaArr.reduce((a, b) => a + b);
                } else if (archiveStatus == 0) {
                    Archive.Idea.push(archiveStatus);
                }
                break;
        }
    });

    Archive.Task = Archive.Task.length;
    Archive.Idea = Archive.Idea.length;
    Archive.Random = Archive.Random.length;

    return Archive;
};

const sumsRender = (category) => {
    if (category == "Task") {
        return `<td>${sumTask}</td>`;
    } else if (category == "Idea") {
        return `<td>${sumIdea}</td>`;
    } else if (category == "Random") {
        return `<td>${sumRandom}</td>`;
    }
};

const archiveNote = async (obj) => {
    const deleteTR = selectors.notesTable.querySelector(`tr[id="${obj.id}"]`),
        categoryTDvalue = deleteTR.querySelector(`#category`).innerText;

    saveNote(obj.id, 1, categoryTDvalue);

    let archiveObj = await checkArchive();

    for (let key in archiveObj) {
        if (key == categoryTDvalue) {
            archiveObj[key] = archiveObj[key] - 1;
            if (key == "Task") {
                sumTask++;
            } else if (key == "Random") {
                sumRandom++;
            } else if (key == "Idea") {
                sumIdea++;
            }
            deleteTR.remove();
        }
    }
    renderArchiveTable(archiveObj);
};

export { archiveNote, checkArchive, sumsRender };
