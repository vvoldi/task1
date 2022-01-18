export const filteringContentByDate = async (contentValue) => {
    const regexp = /(0[1-9]|[12][\d]|3[01])\W(0[1-9]|1[0-2])\W(2\d{3})/g;
    let contentObjResult = {
        content: "",
        data: "",
    };
    contentObjResult.content = contentValue;
    const result = contentValue.match(regexp);
    if (result) {
        contentObjResult.data = result.join(", ");
    }

    return `<td class="td__edit" id="content">${contentObjResult.content}</td>
            <td>${contentObjResult.data}</td>`;
};
