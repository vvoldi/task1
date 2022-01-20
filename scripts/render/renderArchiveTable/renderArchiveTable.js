import { selectors } from "../selectors/selectors.js";

export const renderArchiveTable = (archiveObj) => {
    let arrRender = [],
        arrArchiveObj = [archiveObj],
        amount;

    arrArchiveObj.forEach(obj => {
        for (const category in obj) {
            amount = obj[category];
            arrRender.push( `<tr>
                                <td>${category}</td>
                                <td id="task_active">${amount[0]}</td>
                                <td id="task_archive">${amount[1]}</td>
                            </tr>`)
        }
    });
   selectors.ArchiveTable.innerHTML = arrRender.join('')                        
}   