import React, { useState } from 'react';

const EditForm = ({ boletin, onSave, onCancel }) => {
  const [editedBoletin, setEditedBoletin] = useState({ ...boletin });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedBoletin((prevBoletin) => ({
      ...prevBoletin,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onSave(editedBoletin);
  };

  return (
    <div>
      <h3>Editar Boletín</h3>
      <label>Nro de Boletin:</label>
      <input
        type="text"
        name="nro_boletin"
        value={editedBoletin.nro_boletin}
        onChange={handleInputChange}
      />
      {/* Otros campos del formulario */}
      <button onClick={handleSave}>Guardar</button>
      <button onClick={onCancel}>Cancelar</button>
    </div>
  );
};

export default EditForm;
