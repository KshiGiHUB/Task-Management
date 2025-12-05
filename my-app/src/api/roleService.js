export const getRole = () => {
    return localStorage.getItem("role") || "user";
};

export const isAdmin = () => {
    return getRole() === "admin";
};

export const canEdit = (task) => {
    if (isAdmin()) return true;
    return false;
};

export const canCreate = () => isAdmin();

export const canComplete = () => isAdmin();
