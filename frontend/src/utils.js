
export const filterNotesBy = (notes, filter) => {
    if (!Array.isArray(notes)) return [];
    const allowedFilters = ["updatedAt", "createdAt", "title"]
    if (!allowedFilters.includes(filter)) return [...notes];
    
    const noteCopy = [...notes];

    if (filter === "updatedAt" || filter === "createdAt") {
        return noteCopy.sort((a, b) => new Date(b[filter]) - new Date(a[filter]));
    }

    if (filter === "title") {
        return noteCopy.sort((a, b) =>
            String(a.title ?? "").localeCompare(String(b.title ?? ""), undefined, {
                sensitivity: "base",
            })
        );
    }
    
    return noteCopy;
};