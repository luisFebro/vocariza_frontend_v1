import localforage from "localforage";

// LESSON: if not working correctly, check if store has already been declared.
const getObj = (name) => ({ storeName: name });
export const store = {
    offline_lists: getObj("offline_lists"),
    request_api_data: getObj("request_api_data"),
    once_checked: getObj("once_checked"),
    user: getObj("user"), // for profiles, offline profile data. useful to access the last user logged in data related.
    audios: getObj("audios"),
};

export const variablesStore = (storeName = "global_variables") =>
    localforage.createInstance({
        name: `vocariza-${storeName}`,
        storeName: storeName,
    });
