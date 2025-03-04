import { FC, useEffect, useState } from "react";
import axios from "axios";
import Modal from "../Modal/Modal";
import "./seminarList.css"

interface SeminarsData{
    id: number;
    title: string;
    description: string;
    date: string;
    time: string;
    photo: string;
}

const SeminarList:FC = () => {
  const [seminars, setSeminars] = useState<SeminarsData[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [modalActive, setModalActive] = useState<boolean>(false);
  const [selectedSeminar, setSelectedSeminar] = useState<SeminarsData | null>(null);


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

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3000/seminars/${id}`);
      setSeminars(seminars.filter((item) => item.id !== id))
    } catch (err) {
      console.error("Ошибка при удалении семинара:", err);
    }
  }

  return (
    <>
      <h1>Семинары</h1>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="list">
          {seminars.map((item) => {
            return (
              <div className="seminar" key={item.id}>
                <h2>{item.title}</h2>
                <div className="seminar_content">
                  <div className="seminar_details">
                    <p>{item.description}</p>
                    <span>Дата: {item.date}</span>
                    <span>Начало в {item.time}</span>
                  </div>
                  <div className="seminar_actions">
                    <button>Изменить</button>
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
      {modalActive && (
        <Modal
          active={modalActive}
          setActive={setModalActive}
          seminar={selectedSeminar}
          onDelete={handleDelete}
        />
      )}
    </>
  );
};

export default SeminarList;
