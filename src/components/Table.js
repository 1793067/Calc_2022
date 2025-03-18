import Table from "react-bootstrap/Table";
import { useContext, useState, useRef } from "react";
import { Context } from "../index";
import { observer } from "mobx-react-lite";
import "../styles/Table.css";

import Indexes from "./Indexes";

const numberFormatter = (value) => {
  if (!value) return 0;
  if (typeof value === "string") return value;
  /*let num = value.toFixed(2);
    return num.replace(new RegExp("^(\\d{" + (num.length%3 ? num.length%3 : 0) + "})(\\d{3})", "g"), "$1 $2")
                     .replace(/(\d{3})+?/gi, "$1 ")
                     .trim()*/
  return value.toFixed(2);
};

const units = (name) => {
  let flag = ["линии", "пункты", "ячеек", "средства", "подстанции"].reduce(
    (val, cur, index) => {
      return ~name.indexOf(cur) ? index : val;
    },
    -1
  );

  if (!flag) return "км";
  if (flag === 4) return "кВА";
  return "шт";
};

const CalcTable = observer(() => {
  const { tableProps, conditions } = useContext(Context);
  const { activities } = tableProps;

  const shadowRef = useRef();

  function dragStart(e) {
    // Проверяем, является ли элемент строкой таблицы
    if (e.target.tagName !== "TR") {
      e.preventDefault(); // Предотвращаем перетаскивание, если это не строка
      return;
    }
    shadowRef.current = e.target; // Запись в ref
    shadowRef.current.classList.remove("unselected");
    e.target.classList.add("selected");
  }

  function dragOver(e) {
    if (!shadowRef.current) return;

    // Находим ближайший родительский элемент <tr>
    let targetRow = e.target.closest("tr");

    if (!targetRow) {
      return; // Если не нашли <tr>, ничего не делаем (или обрабатываем как ошибку)
    }

    const children = Array.from(targetRow.parentNode.children) // Получаем детей *родителя* targetRow, а не e.target
      .slice(4)
      .slice(0, activities.length);

    if (children.indexOf(targetRow) > children.indexOf(shadowRef.current)) {
      targetRow.after(shadowRef.current);
    } else {
      targetRow.before(shadowRef.current);
    }

    shadowRef.current.classList.remove("selected");
    shadowRef.current.classList.add("unselected");
  }

  return (
    <div className="ms-4 no-select">
      <Table bordered responsive id="table-to-xls" striped="">
        <thead>
          <tr>
            <th>№</th>
            <th>№ ст.ст</th>
            <th>
              Мероприятия по технологическому присоединению к{" "}
              <u>электрическим сетям</u>
            </th>
            <th>Величина стандартизированной тарифной ставки, руб.</th>
            <th colSpan="2">
              Максимальная мощность ТП,РТП, протяженность трасс ЛЭП, количество
              распределительных пунктов, КРН, приборов учета
            </th>
            <th>Расходы на выполнение мероприятия, руб.</th>
            <th>С учетом индексации</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="numeric">1.</td>
            <td colSpan="7">Организационные мероприятия</td>
          </tr>
          <tr>
            <td></td>
            <td className="numeric">1.1.</td>
            <td colSpan="4">
              Подготовка сетевой организацией технических условий
            </td>
            <td colSpan="2" className="numeric">
              {numberFormatter(conditions.paperTariff.c1_1)}
            </td>
          </tr>
          <tr>
            <td>
              <div class="arrow-8"></div>
            </td>
            <td className="numeric">{conditions.paperTariff.c1_2.number}</td>
            <td colSpan="4">{conditions.paperTariff.c1_2.name}</td>
            <td colSpan="2" className="numeric">
              {numberFormatter(
                conditions.paperTariff.c1_2.value || "Укажите условия"
              )}
            </td>
          </tr>
          <tr>
            <td className="numeric">2.</td>
            <td colSpan="7">
              Мероприятия в соответствии с техническими условиями
            </td>
          </tr>

          {activities.map(({ index, name, value, number, weight, result }) => (
            <tr
              key={index}
              className="draggable"
              draggable="true"
              onDragStart={dragStart}
              onDragOver={dragOver}
            >
              <td></td>
              <td>{number}</td>
              <td>{name}</td>
              <td className="numeric">{numberFormatter(value)}</td>
              <td>
                <input
                  min="0"
                  type="Number"
                  step="0.01"
                  onChange={(e) =>
                    tableProps.setWeight(index, e.target.value, conditions)
                  }
                  placeholder={weight || "введите значение"}
                />
                <span className="invisible-text">{weight}</span>
              </td>
              <td style={{ width: "2vw" }}>{units(name)}</td>
              <td className="numeric">{numberFormatter(result.res)}</td>
              <td className="numeric">
                {numberFormatter(result.res * result.ind)}
                <span
                  className="eraser"
                  onClick={() => {
                    tableProps.deleleActivity(index);
                    tableProps.recalculate(conditions);
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td className="numeric">3.</td>
            <td colSpan="5">
              Расходы на присоединение к вышестоящей сетевой организации (без
              НДС), руб.
            </td>
            <td colSpan="2" className="numeric">
              <input
                style={{ backgroundColor: "inherit" }}
                min="0"
                type="Number"
                step="0.01"
                onChange={(e) =>
                  tableProps.setNeighbourTariff(e.target.value, conditions)
                }
                placeholder="введите значение"
              />
              <span className="invisible-text">
                {tableProps.neighbourTariff}
              </span>
            </td>
          </tr>
          <tr>
            <td colSpan="6">
              Всего плата за технологическое присоединение (без НДС), руб.
            </td>
            <td className="numeric">
              {!conditions.paperTariff.c1_2.value
                ? "Укажите условия"
                : conditions.constructionBenefits === "individual benefit"
                ? numberFormatter(
                    Math.min(
                      Number(conditions.paperTariff.c1_1) +
                        Number(conditions.paperTariff.c1_2.value),
                      Number(tableProps.sumResult.defSum)
                    )
                  )
                : conditions.constructionBenefits === "entity benefit"
                ? numberFormatter(
                    Number(conditions.paperTariff.c1_1) +
                      Number(conditions.paperTariff.c1_2.value)
                  )
                : numberFormatter(
                    Number(conditions.paperTariff.c1_1) +
                      Number(conditions.paperTariff.c1_2.value) +
                      Number(tableProps.sumResult.defSum)
                  )}
            </td>
            <td className="numeric">
              {!conditions.paperTariff.c1_2.value
                ? "Укажите условия"
                : conditions.constructionBenefits === "individual benefit"
                ? numberFormatter(
                    Math.min(
                      Number(conditions.paperTariff.c1_1) +
                        Number(conditions.paperTariff.c1_2.value),
                      Number(tableProps.sumResult.indSum)
                    )
                  )
                : conditions.constructionBenefits === "entity benefit"
                ? numberFormatter(
                    Number(conditions.paperTariff.c1_1) +
                      Number(conditions.paperTariff.c1_2.value)
                  )
                : numberFormatter(
                    Number(conditions.paperTariff.c1_1) +
                      Number(conditions.paperTariff.c1_2.value) +
                      Number(tableProps.sumResult.indSum)
                  )}
            </td>
          </tr>
          {conditions.indexing() !== 1 && <Indexes />}
        </tfoot>
      </Table>
    </div>
  );
});

export default CalcTable;
