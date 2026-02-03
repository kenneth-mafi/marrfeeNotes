import './grid.css';

export function ColumnGrid({ items = [], searchContent="", deleted, Component }) {
  let search = ""
  if (!deleted) { search = searchContent; }
  return (

      <div 
        className={`column-grid-container`}
      >
        {items.map((item, index) => {
            if (!Component) return null;
                return (
                  <Component
                    key={item.noteId ?? index}
                    {...item}
                    searchContent={search}
                  />
                );
          
        })}
      </div>    

  );
}