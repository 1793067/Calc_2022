import { Table } from 'react-bootstrap'

function Menu(props) {
    return (
            <Table bordered hover responsive striped>
                        <thead>
                            <tr style={{borderTop:"none"}}>
                                <th style={{width:"7%",textAlign:"center", verticalAlign:"middle"}}>№ ст.ст</th>
                                <th style={{width:"60%",textAlign:"center", verticalAlign:"middle"}}>Наименование стандартизированной тарифной ставки</th>
                                <th style={{width:"18%",textAlign:"center", verticalAlign:"middle"}}>Значение</th>
                                <th style={{width:"15%",textAlign:"center", verticalAlign:"middle"}}>Ед. изм</th>
                            </tr>                
                        </thead>
                        <tbody>
                            {props.content.filter(tariff => tariff.name.includes(props.tab))
                                        .map(({name, value, number}) =>
                            <tr>
                                <td  className="p-3" style={{textAlign:"center", verticalAlign:"middle"}}>{number}</td>
                                <td  className="p-3">{name}</td>
                                <td  className="p-3" style={{textAlign:"right", verticalAlign:"middle"}}>
                                    {(value+"").replace(new RegExp("^(\\d{" + ((value+"").length%3 ? (value+"").length%3 : 0) + "})(\\d{3})", "g"), "$1 $2").replace(/(\d{3})+?/gi, "$1 ").trim()}
                                </td>
                                <td className="p-3" style={{textAlign:"center", verticalAlign:"middle"}}>
                                    {props.tab.includes('подстанции') ? 'руб/квт' : props.tab.includes('линии') ? "руб/км" : "руб"}
                                </td>
                            </tr>    
                            )}
                        </tbody>
                            </Table>
    )

}

export default Menu;