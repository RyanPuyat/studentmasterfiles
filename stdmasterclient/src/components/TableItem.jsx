import { FaEdit, FaTrash } from 'react-icons/fa';
import { useContext } from 'react';
import { MODAL_MODE } from './modal/mode';
import StudentContext from './studentData/StudentContext';
import ModalContext from './modal/ModalContext';
import ToolTip from '../tooltip/Tooltip';

const TableItem = ({ data }) => {
  const { deleteData } = useContext(StudentContext);
  const { openModal } = useContext(ModalContext);
  const { id, fname, lname, studentemail, course } = data;

  const handleEdit = () => {
    openModal(MODAL_MODE.EDITMODE, {
      id,
      fname,
      lname,
      studentemail,
      course,
    });
  };

  return (
    <>
      <tr className="hover:bg-base-300 border-1 border-gray-600 ">
        <td className="px-4 py-2">{fname}</td>
        <td className="px-4 py-2">{lname}</td>
        <td className="px-4 py-2">{course}</td>
        <td className="px-4 py-2">{studentemail}</td>

        <td>
          <ToolTip tooltip="UpdateData">
            <button className=" text-3xl cursor-pointer">
              <FaEdit color="skyblue" onClick={handleEdit} />
            </button>
          </ToolTip>
        </td>
        <td>
          <ToolTip tooltip="Delete">
            <button
              className="text-3xl cursor-pointer"
              onClick={() => deleteData(id)}
            >
              <FaTrash color="pink" />
            </button>
          </ToolTip>
        </td>
      </tr>
    </>
  );
};

export default TableItem;
