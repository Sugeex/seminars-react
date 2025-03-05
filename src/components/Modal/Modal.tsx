import { FC } from "react";
import "./Modal.css";
// Интерфейс для пропсов компонента Modal
interface ModalProps {
  active: boolean;
  setActive: (value: boolean) => void;
  seminar: Iseminar | null;
  onDelete: (id: number) => void;
}
// Интерфейс для описания структуры данных семинара
interface Iseminar {
  id: number;
  title: string;
}

const Modal: FC<ModalProps> = ({ active, setActive, seminar, onDelete }) => {
  // Если данные семинара не переданы, компонент ничего не рендерит
  if (!seminar) return null;
  // Функция для подтверждения удаления семинара
  const handleConfirmDelete = () => {
    onDelete(seminar.id); // Вызов функции удаления с передачей id семинара
    setActive(false); // Закрытие модального окна после удаления
  };
  return (
    <div
      // Условный класс для управления видимостью модального окна
      className={active ? "modal active" : "modal"}
      onClick={() => setActive(false)}
    >
      <div className="modal_content" onClick={(e) => e.stopPropagation()}>
        <h2>Удаление семинара</h2>
        <p>
          Вы действительно хотите удалить <br /> "{seminar.title}"?
        </p>
        <div className="modalDelete_btns">
          <button onClick={() => setActive(false)}>Отмена</button>
          <button id="delete_btn" onClick={handleConfirmDelete}>
            Удалить
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
