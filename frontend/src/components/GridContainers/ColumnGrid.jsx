import './grid.css';

export function ColumnGrid({ items = [], Component }) {
  console.log(items);
  
  return (

      <div 
        className={`column-grid-container`}
      >
        {items.map((item, index) => {
            if (!Component) return null;
                return (
                  <Component
                    key={item.id ?? index}
                    {...item}
                  />
                );
          
        })}
      </div>    

  );
}