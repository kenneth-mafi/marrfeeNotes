export const notesData = [
  {
    id: "n1",
    title: "Morning pages",
    body:
      "Three pages of free writing to clear the mind. Start with the dream I had last night and move into today's priorities.",
    updatedAt: "9:10 AM",
    deleted: false,
  },
  {
    id: "n2",
    title: "Design ideas",
    body:
      "Notebook UI with stitched edges, margin line, and warm paper tones. Use handwritten accents in headers.",
    updatedAt: "Yesterday",
    deleted: false,
  },
  {
    id: "n3",
    title: "Grocery list",
    body:
      "Oats, oat milk, strawberries, ginger, miso, spinach, sourdough, olive oil, dark chocolate.",
    updatedAt: "Sat",
    deleted: false,
  },
  {
    id: "n3",
    title: "Grocery list",
    body:
      "Oats, oat milk, strawberries, ginger, miso, spinach, sourdough, olive oil, dark chocolate.",
    updatedAt: "Sat",
    deleted: false,
  },
  {
    id: "n3",
    title: "Grocery list",
    body:
      "Oats, oat milk, strawberries, ginger, miso, spinach, sourdough, olive oil, dark chocolate.",
    updatedAt: "Sat",
    deleted: false,
  },
  {
    id: "n3",
    title: "Grocery list",
    body:
      "Oats, oat milk, strawberries, ginger, miso, spinach, sourdough, olive oil, dark chocolate.",
    updatedAt: "Sat",
    deleted: false,
  },
  {
    id: "n3",
    title: "Grocery list",
    body:
      "Oats, oat milk, strawberries, ginger, miso, spinach, sourdough, olive oil, dark chocolate.",
    updatedAt: "Sat",
    deleted: false,
  },
  {
    id: "n3",
    title: "Grocery list",
    body:
      "Oats, oat milk, strawberries, ginger, miso, spinach, sourdough, olive oil, dark chocolate.",
    updatedAt: "Sat",
    deleted: false,
  },
  {
    id: "n3",
    title: "Grocery list",
    body:
      "Oats, oat milk, strawberries, ginger, miso, spinach, sourdough, olive oil, dark chocolate.",
    updatedAt: "Sat",
    deleted: false,
  },
  {
    id: "n3",
    title: "Grocery list",
    body:
      "Oats, oat milk, strawberries, ginger, miso, spinach, sourdough, olive oil, dark chocolate.",
    updatedAt: "Sat",
    deleted: false,
  },
  {
    id: "n4",
    title: "Meeting notes",
    body:
      "Discuss MVP timeline. Focus on backend CRUD, then move to sync and offline mode. Capture follow-up action items.",
    updatedAt: "Thu",
    deleted: true,
  },
  {
    id: "n5",
    title: "Book quotes",
    body:
      "Collect lines that feel like sketches: short and revealing. Keep them underlined in the margin.",
    updatedAt: "Mon",
    deleted: true,
  },
];

export const getNoteById = (id) => notesData.find((note) => note.id === id);
