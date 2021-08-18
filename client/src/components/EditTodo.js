import React, { Fragment, useState } from 'react';

const EditTodo = ({ todo }) => {
  const [description, setDescription] = useState(todo.description);
  const [modal, setModal] = useState(false);

  //edit description function

  const updateDescription = async (e) => {
    e.preventDefault();
    try {
      const body = { description };
      await fetch(`http://localhost:5000/todos/${todo.todo_id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      window.location = '/';
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <button
        type="button"
        className="btn btn-warning"
        onClick={() => setModal(true)}
      >
        Edit
      </button>
      {modal && (
        <div className=" cont modal-dialog ">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Edit Todo</h4>
              <button
                type="button"
                className="close"
                onClick={() => {
                  setDescription(todo.description);
                  setModal(false);
                }}
              >
                &times;
              </button>
            </div>

            <div className="modal-body">
              <input
                type="text"
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-warning"
                onClick={(e) => {
                  updateDescription(e);
                  setModal(false);
                }}
              >
                Edit
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => {
                  setDescription(todo.description);
                  setModal(false);
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default EditTodo;
