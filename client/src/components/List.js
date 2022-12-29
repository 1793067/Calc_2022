import {treeMap, tree} from '../initial_data/dendritic';
import '../styles/navList.css';
import { useContext } from 'react';
import { Context } from '../index';

//при инициализации компонента List используются стили bootstrap
//затем компонент оборачивается в элемент nav, стили которого
//прописаны в файле стилей navList.css

export default function List() {
  const {tableProps} = useContext(Context)
  
  function createList(tree, acc) {
    return (
          <ul className="list-group list-group-flush">
            {treeMap(tree, (chunk) => {
            if(tree[chunk].hasOwnProperty('value')) return (
              <li
                href="#" 
                className="list-group-item list-group-item-action"
                key={chunk} 
                value={chunk} 
                onClick={() => tableProps.setPosition(acc, tree[chunk].value, tree[chunk].number)}
                >{chunk}</li>
              )
            return (
              <li 
                className="list-group-item list-group-item-action"
                key={chunk}
              >{chunk}{createList(tree[chunk], `${acc} ${chunk}`)}</li>
            )
          })}
          </ul>  
    );
  }
  
  return (
    <div id="cssmenu">
      {createList(tree, '')}
    </div>
    
  )
}