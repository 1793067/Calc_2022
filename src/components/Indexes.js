import React from 'react';
import { useContext } from 'react';
import { Context } from '../index';
import { observer } from 'mobx-react-lite';

const P = () => <><b>P</b><sub>50%</sub></>;
const i = (year) => <><i><b>i</b></i><sub>{year}</sub></>

const Indexes = observer(() => {
    const {tableProps, conditions} = useContext(Context);
    const {indexes} = conditions;
    const indexNames = Object.keys(indexes);

    function checkboxHandler() {
        conditions.changePeriod(); 
        tableProps.recalculate(conditions);
    }

    const Expression = { 
        "2 года" : () => <span>{P()} + {P()} * {i(2026)}</span>,
        "3 года" : () =>
            <span className="indexes-span">
                <input id="periodI" type="checkbox" checked={conditions.periodI} name="period" onChange={checkboxHandler}/>
                <span>
                    <span>{P()} * {i(2026)} + {P()} * {i(2026)} * {i(2027)} * {i(2028)} <span>II половина 2025 года</span></span>
                    <span>{P()} * {i(2026)} * {i(2027)} + {P()} * {i(2026)} * {i(2027)} * {i(2028)} <span>I половина 2025 года</span></span> 
                </span>
            </span>,
        "4 года" : () => <span>{P()} * {i(2026)} * {i(2027)} + {P()} * {i(2026)} * {i(2027)} * {i(2028)} * {i(2029)}</span>
    };

    const indexPeriods = {
        "менее двух лет" : [],
        "2 года" : ["2026"],
        "3 года" : ["2026", "2027", "2028"],
        "4 года" : ["2026", "2027", "2028", "2029"]
    }

    return (
        <>
            <tr className="indexes-tr">
                <td colSpan="7"><label>Индексация на период выполнения мероприятий</label>
                {
                    Expression[conditions.selectedProps['срок выполнения мероприятий по ТУ']]()
                }
                </td>
            </tr>

            {indexNames
            .filter(indexName => indexPeriods[conditions.selectedProps['срок выполнения мероприятий по ТУ']].indexOf(indexName) !== -1)
            .map(indexName =>
                <tr key={indexName} className="indexes-tr">
                    <td className="indexes-td"><i>i</i><sub>{indexName}</sub></td>
                    <td className="indexes-td">
                        <input min="0" type="Number" step="0.01" onChange={(e) => {
                            conditions.setIndex(indexName, e.target.value);
                            tableProps.recalculate(conditions)}} 
                            value={indexes[indexName]}/>
                    </td>
                    <td colSpan="6"></td>
                </tr>           
            )}
        </>
    )
    
})

export default Indexes;
