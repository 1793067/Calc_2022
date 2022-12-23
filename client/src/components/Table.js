import Table from 'react-bootstrap/Table';

function CalcTable() {
    return (
        <div className="ms-4">
            <Table bordered hover responsive>
                <thead>
                    <tr>
                        <th rowSpan="2">№</th>
                        <th rowSpan="2">№ ст.ст</th>
                        <th rowSpan="2">Мероприятия по технологическому присоединению к <u>электрическим сетям</u></th>
                        <th rowSpan="2">Величина стандартизированной тарифной ставки на покрытие расходов по мероприятию, тыс. руб.</th>
                        <th colSpan="2">Максимальная мощность ТП,РТП, протяженность трасс ЛЭП, количество</th>
                        <th rowSpan="2">Суммарная величина расходов на выполнение мероприятия согласно расчетам ДЭПиР, тыс. руб.</th>
                    </tr>                
                    <tr>
                        <th>кВА/км</th>
                        <th>количество</th>

                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1.</td>
                        <td></td>
                        <td colSpan="4">Организационные мероприятия</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>1.1.</td>
                        <td></td>
                        <td colSpan="4">Подготовка сетевой организацией технических условий</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>1.2.</td>
                        <td></td>
                        <td colSpan="4">Проверка сетевой организацией выполнения заявителем технических условий</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>2.</td>
                        <td></td>
                        <td colSpan="4">Мероприятия в соответствии с техническими условиями</td>
                        <td></td>
                    </tr>
                    
                        {'dfdfdfldkfdlfjkjdlfkjdlfkjdlkfjd'.split('').map((num,i) => (
                        <tr key={i}>
                            <td /><td /><td /><td /><td /><td />
                        </tr>))}
                    
                    <tr>
                        <td>3.</td>
                        <td></td>
                        <td colSpan="4">Расходы на присоединение к вышестоящей сетевой организации (без НДС), тыс. руб.</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td colSpan="6">Всего плата за технологическое присоединение (без НДС), тыс. руб.</td>
                        <td></td>
                    </tr>
                </tbody>
            </Table>
        </div>
        
    );
}

export default CalcTable;