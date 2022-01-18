import { selectors } from "../selectors/selectors.js";

export const renderArchiveTable = (archiveObj) => {
    selectors.ArchiveTable.innerHTML = `<tr>
                                <td>${Object.entries(archiveObj)[0][0]}</td>
                                <td id="task_active">${Object.entries(archiveObj)[0][1][0]}</td>
                                <td id="task_archive">${ Object.entries(archiveObj)[0][1][1]}</td>
                            </tr>
                            <tr>
                                <td>${Object.entries(archiveObj)[1][0]}</td>
                                <td id="random_active">${Object.entries(archiveObj)[1][1][0]}</td>
                                <td id="random_archive">${Object.entries(archiveObj)[1][1][1]}</td>
                            </tr>
                            <tr>
                                <td>${Object.entries(archiveObj)[2][0]}</td>
                                <td id="idea_active">${Object.entries(archiveObj)[2][1][0]}</td>
                                <td id="idea_archive">${ Object.entries(archiveObj)[2][1][1]}</td>
                            </tr>`;
}