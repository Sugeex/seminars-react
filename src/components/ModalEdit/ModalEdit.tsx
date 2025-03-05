import axios from "axios";
import { FC, useState } from "react";
import "./modalEdit.css"
// Интерфейс для описания структуры данных семинара
interface SeminarsData {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  photo: string;
}
// Интерфейс для пропсов компонента ModalEdit
interface ModalEditProps {
  seminar: SeminarsData | null;
  activeEdit: boolean;
  setActiveEdit: (value: boolean) => void;
  onEdit: (updatedSeminar: SeminarsData) => void;
}
// Компонент модального окна для редактирования семинара
const ModalEdit: FC<ModalEditProps> = ({
  seminar,
  activeEdit,
  setActiveEdit,
  onEdit,
}) => {
  // Если данные семинара не переданы, компонент ничего не рендерит
  if (!seminar) return null;
// Состояния для управления значениями полей формы
  const [title, setTitle] = useState(seminar.title);
  const [description, setDescription] = useState(seminar.description);
  const [date, setDate] = useState(seminar.date);
  const [time, setTime] = useState(seminar.time);
  const [photo, setPhoto] = useState(seminar.photo);
  
// Функция для обработки редактирования семинара
  const handleEdit = async () => {
    const updatedSeminar = {
      ...seminar,
      title,
      description,
      date,
      time,
      photo,
    };
    try {
      await axios.put(
        `http://localhost:3000/seminars/${seminar.id}`,
        updatedSeminar
      );
      onEdit(updatedSeminar);
      setActiveEdit(false);
    } catch (err) {
      console.error("Ошибка при обновлении семинара", err);
    }
  };

  return (
    <div
      className={activeEdit ? "modal active" : "modal"}
      onClick={() => setActiveEdit(false)}
    >
      <div className="modal_content" onClick={(e) => e.stopPropagation()}>
        <h2>Редактировать семинар</h2>
        <div className="editList">
          <div className="editList_item">
            <span>Название</span>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Название"
            />
          </div>
          <div className="editList_item">
            <span>Описание</span>
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Описание"
            />
          </div>
          <div className="editList_item">
            <span>Дата</span>
            <input
              value={date}
              onChange={(e) => setDate(e.target.value)}
              placeholder="Дата"
            />
          </div>
          <div className="editList_item">
            <span>Время</span>
            <input
              value={time}
              onChange={(e) => setTime(e.target.value)}
              placeholder="Время"
            />
          </div>
          <div className="editList_item">
            <span>Ссылка на фото</span>
            <input
              value={photo}
              onChange={(e) => setPhoto(e.target.value)}
              placeholder="Ссылка на фото"
            />
          </div>
        </div>
        <div className="modal_content_btns">
          <button id="save_btn" onClick={handleEdit}>
            Сохранить
          </button>
          <button onClick={() => setActiveEdit(false)}>Отмена</button>
        </div>
      </div>
    </div>
  );
};

export default ModalEdit;
