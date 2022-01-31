import { sumsRender } from "./archivation.js";
import { selectors } from "../selectors/selectors.js";

export const renderArchiveTable = (archiveObj) => {
    let arrRender = [],
        arrArchiveObj = [archiveObj],
        amount;
    arrArchiveObj.forEach((obj) => {
        for (const category in obj) {
            amount = obj[category];
            arrRender.push(`<tr>
                                        <td>${category}</td>
                                        <td>${amount}</td>
                                        ${sumsRender(category)}
                                    </tr>`);
        }
    });
    selectors.ArchiveTable.innerHTML = arrRender.join("");
};
