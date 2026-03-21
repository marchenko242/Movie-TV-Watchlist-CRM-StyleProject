const STORAGE_KEY = "movieRecords";

export function getRecords() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
}

export function saveRecord(newRecord) {
    const records = getRecords();
    records.push(newRecord);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}

export function deleteRecord(id) {
    const records = getRecords();
    const filteredRecords = records.filter(r => r.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredRecords));
}

export function updateRecord(id, updatedData) {
    const records = getRecords();
    const updatedRecords = records.map(r => r.id === id ? { ...r, ...updatedData } : r);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedRecords));
}
