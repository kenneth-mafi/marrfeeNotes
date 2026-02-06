
export const filterNotesBy = (notes, filter, searchContent = "", typeFilter = "all") => {
    if (!Array.isArray(notes)) return [];
    const allowedFilters = ["updatedAt", "createdAt", "title", "search"];

    let noteCopy = [...notes];

    if (typeFilter === "code") {
        noteCopy = noteCopy.filter(note => note?.isCode);
    }

    if (typeFilter === "text") {
        noteCopy = noteCopy.filter(note => !note?.isCode);
    }

    if (!allowedFilters.includes(filter)) return noteCopy;
    if (filter === "search" && !searchContent.trim()) return noteCopy;

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
                .includes(query) || 
            String(note.title ?? "")
                .toLowerCase()
                .includes(query)
        );
    };
    
    return noteCopy;
};


const escapeRegExp = (s = "") => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export const getHighlightedParts = (text = "", query = "") => {
  const q = query.trim();
  if (!q) return [String(text)];
  const re = new RegExp(`(${escapeRegExp(q)})`, "gi");
  return String(text).split(re); // keeps matches
};
