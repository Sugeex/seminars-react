import { FC } from "react";
import "./Modal.css";

interface ModalProps {
  active: boolean;
  setActive: (value: boolean) => void;
  seminar: Iseminar | null;
  onDelete: (id: number) => void;
}

interface Iseminar {
  id: number;
  title: string;
}

const Modal: FC<ModalProps> = ({ active, setActive, seminar, onDelete }) => {
  if (!seminar) return null;

  const handleConfirmDelete = () => {
    onDelete(seminar.id);
    setActive(false);
  };
  return (
    <div
      className={active ? "modal active" : "modal"}
      onClick={() => setActive(false)}
    >
      <div className="modal_content" onClick={(e) => e.stopPropagation()}>
        <h2>Удаление семинара</h2>
        <p>
          Вы действительно хотите удалить <br /> "{seminar.title}"?
        </p>
        <div>
          <button onClick={() => setActive(false)}>Отмена</button>
          <button onClick={handleConfirmDelete}>Удалить</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
