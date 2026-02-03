import './grid.css';

export function ColumnGrid({ items = [], Component }) {
  
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
                  />
                );
          
        })}
      </div>    

  );
}