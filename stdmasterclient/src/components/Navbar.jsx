import { FaGraduationCap } from 'react-icons/fa';
import { MODAL_MODE } from './modal/mode';
import ToolTip from '../tooltip/Tooltip';
import { useContext } from 'react';
import ModalContext from './modal/ModalContext';
import { FaPlus } from 'react-icons/fa';

const Navbar = () => {
  const { openModal } = useContext(ModalContext);
  return (
    <div className="navbar bg-base-300 shadow-sm ">
      <div className="container mx-auto flex flex-col md:flex-row justify-between text-center p-4">
        <div className="btn btn-ghost text-xl flex items-center my-2">
          <FaGraduationCap className="text-6xl mr-1" />
          Student Masterfile
        </div>
        <div>
          <ToolTip tooltip="Add Data">
            <button
              className="btn btn-primary text-3xl cursor-pointer"
              onClick={() => openModal(MODAL_MODE.ADDMODE)}
            >
              <FaPlus />
            </button>
          </ToolTip>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
