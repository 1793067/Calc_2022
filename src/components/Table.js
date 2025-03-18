import Table from 'react-bootstrap/Table';
import { useContext } from 'react';
import { Context } from '../index';
import { observer } from 'mobx-react-lite'
import { InputGroup, Form } from 'react-bootstrap'

const inputStyle = {
    textAlign: "center",
    width:"95%",
    border: "none",
    background: "#1b8bfb",
    outline:"none",
  }

const CalcTable = observer(() => {
    const {tableProps} = useContext(Context);
    const {activities} = tableProps;

    return (
        <div className="ms-4">
            <Table bordered hover responsive>
                <thead>
                    <tr>
                        <th>№</th>
                        <th>№ ст.ст</th>
                        <th>Мероприятия по технологическому присоединению к <u>электрическим сетям</u></th>
                        <th>Величина стандартизированной тарифной ставки, тыс. руб.</th>
                        <th>Максимальная мощность ТП,РТП, протяженность трасс ЛЭП, количество</th>
                        <th>Суммарная величина расходов на выполнение мероприятия согласно расчетам ДЭПиР, тыс. руб.</th>
                    </tr>                
                </thead>
                <tbody>
                    <tr>
                        <td>1.</td>
                        <td colSpan="4">Организационные мероприятия</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td style={{textAlign:"right", verticalAlign:"middle"}}>1.1.</td>
                        <td colSpan="3">Подготовка сетевой организацией технических условий</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td style={{textAlign:"right", verticalAlign:"middle"}}>1.2.1.</td>
                        <td colSpan="3">Выдача уведомления о возможности присоединения к электрическим сетям</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td style={{textAlign:"right", verticalAlign:"middle"}}>1.2.2.</td>
                        <td colSpan="3">Проверка выполнения Заявителем технических условий</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>2.</td>
                        <td colSpan="4">Мероприятия в соответствии с техническими условиями</td>
                        <td></td>
                    </tr>
                    
                    {activities.map(({name, value, number}) => 
                        <tr key={value}>
                            <td></td>
                            <td style={{textAlign:"right", verticalAlign:"middle"}}>{number}</td>
                            <td>{name}</td>
                            <td style={{textAlign:"right", verticalAlign:"middle"}}>
                                {(value+"").replace(new RegExp("^(\\d{" + ((value+"").length%3 ? (value+"").length%3 : 0) + "})(\\d{3})", "g"), "$1 $2").replace(/(\d{3})+?/gi, "$1 ").trim()}
                            </td>
                            <td style={{verticalAlign:"middle"}}>
                                <input onChange={() => console.log('df')} style={inputStyle} />
                            </td>
                            <td></td>
                        </tr>
                        )}

                    
                    <tr>
                        <td>3.</td>
                        <td colSpan="4">Расходы на присоединение к вышестоящей сетевой организации (без НДС), тыс. руб.</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td colSpan="5">Всего плата за технологическое присоединение (без НДС), тыс. руб.</td>
                        <td></td>
                    </tr>
                </tbody>
            </Table>
        </div>
        
    );
})

export default CalcTable;