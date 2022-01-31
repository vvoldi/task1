export const selectors = {
    notesForm: document.querySelector(`#notesForm`),
    noteName: notesForm.querySelector(`input[data-name="noteName"]`),
    noteContent: notesForm.querySelector(`input[data-name="noteContent"]`),
    noteCategory: notesForm.querySelector(`select[data-name="noteCategory"]`),
    notesTable: document.querySelector(`#notesTable tbody`),
    ArchiveTable: document.querySelector(`#archiveTable tbody`),
};
