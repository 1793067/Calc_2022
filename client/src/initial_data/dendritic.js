import keyWords from './keyWords';
import initial_data from './initial_data';

const tree = {};
initial_data
              .map(({name, value, number}) => {
                let typeName = [];
                
                keyWords.forEach(word => {

//разбирает название ставки по словам, присваивая каждому слову порядковый номер,
//так как в файле keyWords порядок ключевых словх может не соответствовать порядку слов в названии ставок
//воздушные - 1, линии - 2, на железных опорах - 3... и так далее

                  let i = name.indexOf(word);
                  if (i >= 0 && (name[i-1] === undefined || name[i-1] === ' ')) //проверка что имя есть и что "косвенные" не задублировались с "полукосвенными"
                    typeName.push({name:word, index:i})
                });

/*получаем [
    {name: воздушные, index: 1}, 
    {name: линии, index: 2}, 
    {name: на железных опорах, index: 3}
  ...]*/

                typeName = typeName.sort((a,b) => a.index - b.index)
                                     .map(obj => obj.name)

/*
  typeName: [воздушные, линии, на жедлезобетонных опорах...]
*/                
                return { typeName, value: (Number(value.replace(',', '.')).toFixed(2)), number };


/*{
   typeName: [воздушные, линии, на жедлезобетонных опорах...]
  value: 4566.45
  number: 3.2.1.4
}*/
                  
              })
              .forEach(({typeName, value, number}) => {
                toTree(tree, typeName, {value, number});
              });
              
/* заполняет пустой объект tree
{
  воздушные:{линии:{
    на железных опорах:{сечением{...{value, num}}}},
    на железобетонных опорах:{сечением{...{value, num}}}},
    ...
}},
  кабельные:{линии:{
    одножильные:{сечением{...{value, num}}}},
    многожильные:{сечением{...{value, num}}}},
    ...
}},
  ...
}

/*вспомогательная функция*/
function toTree(tree, arr, props) {
  if (arr.length === 0) return;
  let chunk = arr[0];
  if (!tree[chunk]) {
    (arr.length === 1) ? tree[chunk] = props : tree[chunk] = {}
  }
    toTree(tree[chunk], arr.slice(1), props)
};


/*вспомогательная функция*/
function treeMap(obj, fn) {
  let keys = Object.keys(obj);
  return keys.map(key => fn(key))
};

export {treeMap, tree}   