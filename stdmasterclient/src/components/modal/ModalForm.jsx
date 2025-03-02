import ModalContext from './ModalContext';
import StudentContext from '../studentData/StudentContext';
import AlertContext from '../alert/AlertContext';
import { useContext, useEffect, useState } from 'react';
import { MODAL_MODE } from './mode';

const ModalForm = () => {
  const { state, closeModal, setFormData } = useContext(ModalContext);
  const { setAlert } = useContext(AlertContext);
  const { addNewData, editData } = useContext(StudentContext);
  const [initialData, setInitialData] = useState(state.formData);

  useEffect(() => {
    if (state.modalMode === MODAL_MODE.EDITMODE) {
      if (JSON.stringify(state.formData) !== JSON.stringify(initialData)) {
        setFormData(state.formData);
        setInitialData(state.formData);
      }
    }
  }, [state.modalMode, state.formData, initialData, setFormData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (state.modalMode === MODAL_MODE.EDITMODE) {
      editData(state.formData.id, state.formData);
      setAlert('Data has been updated');
    } else {
      addNewData(state.formData);
      setAlert('Data has been added');
    }

    setFormData({
      fname: '',
      lname: '',
      course: '',
      studentemail: '',
    });
    closeModal();
  };

  return (
    <div>
      {state.isOpen && (
        <>
          <div
            className="fixed inset-0 bg-transparent bg-opacity-50 z-50"
            onClick={closeModal}
          ></div>
          <div className="modal modal-open fixed inset-0 flex items-center justify-center z-50">
            <div className="modal-box">
              <h2 className="font-bold text-lg">
                {state.modalMode === MODAL_MODE.ADDMODE
                  ? 'Add Item'
                  : 'Edit Item'}
              </h2>
              <form onSubmit={handleSubmit}>
                <label className="block mb-2">
                  First Name <span className="text-red-500 text-xl">*</span> :
                  <input
                    className="input input-bordered w-full mt-1"
                    onChange={handleChange}
                    type="text"
                    name="fname"
                    value={state.formData.fname}
                    required
                  />
                </label>
                <label className="block mb-2">
                  Last Name <span className="text-red-500 text-xl">*</span> :
                  <input
                    className="input input-bordered w-full mt-1"
                    onChange={handleChange}
                    type="text"
                    name="lname"
                    value={state.formData.lname}
                    required
                  />
                </label>
                <label className="block mb-2">
                  Course <span className="text-red-500 text-xl">*</span> :{' '}
                  <input
                    className="input input-bordered w-full mt-1"
                    onChange={handleChange}
                    type="text"
                    name="course"
                    value={state.formData.course}
                    required
                  />
                </label>
                <label className="block mb-2">
                  Email:
                  <input
                    className="input input-bordered w-full mt-1"
                    onChange={handleChange}
                    type="text"
                    name="studentemail"
                    value={state.formData.studentemail}
                  />
                </label>
                <div className="modal-action">
                  <button type="submit" className="btn btn-primary">
                    {state.modalMode === MODAL_MODE.ADDMODE ? 'Add' : 'Update'}
                  </button>
                  <button type="button" className="btn" onClick={closeModal}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ModalForm;
