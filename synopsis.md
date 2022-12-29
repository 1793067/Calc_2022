1. создаем папку <<название проекта>>
    terminal: cd <<название проекта>>

2. внутри создаем еще две папки 'client' и 'server'
    terminal: /<<название проекта>> mkdir client server

3. создадим репозиторий внутри папки:
    terminal: git init
    3.1 если директория не пустая, необходимо добавить существующие файлы в контроль версий:
        git add --all
    3.2 зафиксируем изменения:
        git commit -m 'initiating of my project'
    3.3 создаем новый репозиторий на Github:
        https://github.com/ -> авторизуемся -> "+" -> создаем репозиторий
    3.4 заливка проекта на удаленный репозиторий:
        git remote add origin https://github.com/1793067/Calc_2022.git
        git branch -M main
        git push -u origin main 
    3.5 обновление файлов удаленного репозитория
        git status
        git add --all
        git commit -m 'update'  
        git push
    3.6 скачивание проекта из удаленного репозитория
        В папке, куда необходимо скачать файлы из репозитория:
        git clone https://github.com/1793067/online-store
    3.7 обновление файлов проекта
        В папке проекта, где необходимо обновить файлы из репозитория:
        git pull
          
        КЛИЕНТСКАЯ ЧАСТЬ:

1. Устанавливаем React в папку проекта client
    terminal: /client npx create-react-app .
    либо в любую другую папку:
    terminal: /<<Наименование папки проекта>> npx create-react-app <<название папки>>
    1.1 для запуска необходимо ввести команду
        terminal: /client  npm start
2. Установка react-bootstrap:
    terminal: /client npm install react-bootstrap bootstrap
    2.1 Импорт стилей в проект:
        В файле client/src/app.js импортируем стили:
        import 'bootstrap/dist/css/bootstrap.min.css'
    2.2 УДАЛЯЕМ ЛИШНИЕ ФАЙЛЫ И СТИЛИ:
        ...
    2.3 Создадим папку с компонентами:
        terminal: /client/src mkdir components; touch components/NaviBar.js

3. Интегрируем РОУТИНГ (маршрутизацию) в проект:
    terminal: /client npm install react-router-dom
    3.1 Каждый маршрут сопоставляется с определенным компонентом  (страницей). Создадим эти компоненты
        terminal: /client/src mkdir pages; touch pages/Home.js; touch pages/Users.js; touch pages/About.js
    3.2 Создадим файл с константами путей к страницам в отдельной папке utils:
        terminal: /client/src mkdir utils; touch utils/consts.js;
    3.3 Создадим файл со всеми маршрутами routes.js
        terminal: /client/src touch routes.js
        3.3.2 В элементе NaviBar будут отрисованы ссылки на маршруты
    3.4 В папке components создадим компонент AppRouter.js в котором будет описана логика роутинга по страницам
        terminal: /client/src/components touch AppRouter.js
    3.5 Содержимое компонента App необходимо обернуть в BrouserRouter
        App.js: ...return(<BrouserRouter><AppRouter /></BrouserRouter>)
    3.6 Создание КОНТЕКСТА
        3.6.2 Создадим директорию, в которой будет храниться значения (Контекст) для начальных условий расчета
        terminal:  /client/src mkdir store; touch store/ConditionStore.js;
        3.6.3 В файле ConditionStore.js создадим и экспортируем объект класса, описывающий начальные условия, также напишем геттеры и сеттеры для него
        3.6.4 В файле index.js:
            3.6.4.1 импортируем createContext из React, ConditionStore из папки store
            3.6.4.2 создадим и экспортируем переменную Context
#                `index.js:` export const Context = createContext(null);
            3.6.4.3 обернем тег <App /> в тег <Context.Provider>
            3.6.4.4 свойству value тега Context.Provider присвоим значение объекта
                3.6.4.4 добавим созданному объекту свойство conditions, равное новому экземпляру импортированного класса ConditionStore
#                    `index.js:` <Context.Provider value={{ conditions: new ConditionsStore() }}>
#                                <App />
#                            </Context.Provider>
        3.6.5 В компоненте Conditions:
            3.6.5.1 импортируем useContext из React, Context из index.js
                3.6.5.1.1 деструктурируем контект
#                    `conditions.js:` const {conditions} = useContext(Context)
            3.6.5.2 в элементе select в свойстве onChange используем контекст (записываем в его свойства результат выбора select):
#                `conditions.js:` onChange={(event) => conditions.setProperty(property.name, event.target.value)}
        3.6.6 ВАЖНО!! При изменении свойств внутри объекта провайдера {{ conditions: new ConditionsStore() }} React не перерендеривает компоненты, так как сам объект не изменяется
        Необходимо сделать поля данного объекта наблюдаемыми. И тогда все компоненты, используемые данный контекст будут перерендериваться.
        (Для некоторых компонентов, можно создать собственный const [state, setState] = useState(useContext(Context)), но в нашем случае независимые компоненты должны управлять поведением друг друга
            3.6.6.1 Устанавливаем необходимые зависимости mobx - стейт менеджер, mobx-react-lite - для связи mobx с функциональными компонентами React:
#                `/client` npm i mobx mobx-react-lite
            3.6.6.2 Импортируем функцию makeAutoObservable, вызываем ее в конструкторе объекта и передаем в нее параметром this
#              `ConditionsStore.js:` import {makeAutoObservable} from 'mobx' в файл ConditionsStore.js
#                                    export default class ConditionsStore {
#                                        constructor() {
#                                            ...some props...
#                                            makeAutoObservable(this)
#                                        }
#                                            ...getters, settters...
#                                    }
            3.6.6.3 Импортируем { observer } from 'mobx-react-lite' и оборачиваем зависящий от контекста компонент в observer
№            `Table.js:` const CalcTable = observer(.....)
    3.7 ВАЖНО! Проброс Props дочерним компонентам и использование useEffect
        Описать на примере реализации страницы Tariff
    3.8 Просмотр PDF файлов в браузере
        client: npm install react-pdf
        3.8.1  