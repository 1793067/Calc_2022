import {treeMap, tree} from '../initial_data/dendritic';
import '../styles/navList.css';

//при инициализации компонента List используются стили bootstrap
//затем компонент оборачивается в элемент nav, стили которого
//прописаны в файле стилей navList.css

export default function List() {
  
  function createList(tree) {
    return (
          <ul className="list-group list-group-flush">
            {treeMap(tree, (chunk) => {
            if(typeof tree[chunk] === 'string') return (
              <li
                href="#" 
                className="list-group-item list-group-item-action"
                key={chunk} 
                value={tree[chunk]} 
                onClick={() => alert('lflf')}
                >{chunk}</li>
              )
            return (
              <li 
                className="list-group-item list-group-item-action"
                key={chunk}
              >{chunk}{createList(tree[chunk])}</li>
            )
          })}
          </ul>  
    );
  }
  
  return (
    <div id="cssmenu">
      {createList(tree)}
    </div>
    
  )
}