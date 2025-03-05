import { FC, useEffect, useState } from "react";
import axios from "axios";
import Modal from "../Modal/Modal";
import "./seminarList.css"
import ModalEdit from "../ModalEdit/ModalEdit";

// Интерфейс для описания структуры данных семинара
interface SeminarsData{
    id: number;
    title: string;
    description: string;
    date: string;
    time: string;
    photo: string;
}
// Основной компонент SeminarList, который отображает список семинаров
const SeminarList:FC = () => {
  const [seminars, setSeminars] = useState<SeminarsData[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [modalActive, setModalActive] = useState<boolean>(false);
  const [moadalEditActive, setModalEditActive] = useState<boolean>(false);
  const [selectedSeminar, setSelectedSeminar] = useState<SeminarsData | null>(null);

 // загрузка данных о семинарах при монтировании компонента
  useEffect(() => {
    const fetchData = async () => {
        try{
            const response = await axios.get<SeminarsData[]>("http://localhost:3000/seminars");
            setSeminars(response.data);
        } catch(err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    fetchData();
  }, []);

  // Функция для удаления семинара
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3000/seminars/${id}`);
      setSeminars(seminars.filter((item) => item.id !== id))
    } catch (err) {
      console.error("Ошибка при удалении семинара:", err);
    }
  }

  // Функция для обновления данных семинара
  const handleEdit = async (updatedSeminar: SeminarsData) => {
    setSeminars(
      seminars.map((item) =>
        item.id === updatedSeminar.id ? updatedSeminar : item
      )
    );
  };

  return (
    <>
      {isLoading ? ( // Если данные загружаются, показываем сообщение о загрузке
        <div>Loading...</div>
      ) : (
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
        </div>
      )}
      {/* Модальное окно для подтверждения удаления */}
      {modalActive && (
        <Modal
          active={modalActive}
          setActive={setModalActive}
          seminar={selectedSeminar}
          onDelete={handleDelete}
        />
      )}
      {/* Модальное окно для редактирования семинара */}
      {moadalEditActive && (
        <ModalEdit
          seminar={selectedSeminar}
          activeEdit={moadalEditActive}
          setActiveEdit={setModalEditActive}
          onEdit={handleEdit}
        />
      )}
    </>
  );
};

export default SeminarList;
