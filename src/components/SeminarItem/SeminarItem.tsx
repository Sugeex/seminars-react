import { FC } from "react";
import "./seminarItem.css"

interface SeminarsData {
    id: number;
    title: string;
    description: string;
    date: string;
    time: string;
    photo: string;
}

interface SeminarItemProps {
    seminars: SeminarsData[];
    setModalEditActive: (value: boolean) => void;
    setSelectedSeminar: (value: SeminarsData)=> void;
    setModalActive: (value: boolean) => void;
}

const SeminarItem:FC<SeminarItemProps> = ({seminars, setModalEditActive, setSelectedSeminar, setModalActive}) => {
    return(
    <div className="list">
        {seminars.map((item) => { // Отображение списка семинаров
          return (
            <div className="seminar" key={item.id}>
              <img src={item.photo} alt="SeminarPhoto" />
              <div className="seminar_content">
                <div className="seminar_details">
                  <h2>{item.title}</h2>
                  <p>{item.description}</p>
                  <span>Дата: {item.date}</span>
                  <span>Начало в {item.time}</span>
                </div>
                <div className="seminar_actions">
                  <button
                    onClick={() => {
                      setModalEditActive(true);
                      setSelectedSeminar(item);
                    }}
                  >
                    Изменить
                  </button>
                  <button
                    onClick={() => {
                      setModalActive(true);
                      setSelectedSeminar(item);
                    }}
                  >
                    Удалить
                  </button>
                </div>
              </div>
            </div>
          );
        })}
    </div>)
}

export default SeminarItem;