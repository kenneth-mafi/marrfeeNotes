
export const filterNotesBy = (notes, filter, searchContent="") => {
    if (!Array.isArray(notes)) return [];
    const allowedFilters = ["updatedAt", "createdAt", "title", "search"]
    if (!allowedFilters.includes(filter)) return [...notes];
    if (filter === "search" && !searchContent.trim()) return [...notes];

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

    if (filter === "search") {
        const query = searchContent.toLocaleLowerCase();
        return noteCopy.filter(note => 
            String(note.body ?? "")
                .toLocaleLowerCase()
                .includes(query)
        );
    };
    
    return noteCopy;
};