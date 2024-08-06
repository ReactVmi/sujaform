import React, { useState } from 'react';
import Modal from 'react-modal';

const MyModal = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    function openModal(e) {
        e.preventDefault();
        setModalIsOpen(true);
    }

    function closeModal(e) {
        e.preventDefault();
        setModalIsOpen(false);
    }

    const customStyles = {
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          border: 'none', // Remove border
          borderRadius: '4px', // Add border-radius
          outline: 'none',
          padding: '20px', // Add padding
          maxWidth: '400px', // Set max width
          background: '#fff',
        },
      };



    return (
        <div>
        <button onClick={openModal}>Open Modal</button>
  
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Example Modal"
        >
        <div className="viewdata-popup">
       
          <form>
            {/* <label>
              Name:
              <input type="text" />
            </label>
            <br />
            <label>
              Email:
              <input type="email" />
            </label> */}
            <p>Fusce imperdiet massa ac purus hendrerit, et rhoncus enim congue. Phasellus ipsum diam, 
            finibus semper ipsum sed, pulvinar sollicitudin velit. Pellentesque porttitor orci sit amet 
            elementum luctus. Maecenas rhoncus libero non ornare scelerisque. Maecenas et leo mauris.
             Integer urna felis, congue vitae condimentum eget, consequat in massa. Maecenas eu tellus felis.
              Nullam non ullamcorper enim. In non facilisis sapien, quis gravida arcu. Pellentesque quis nisl
               vitae nisl consectetur rhoncus. Proin imperdiet augue a est pulvinar pellentesque. 
               Donec ac est eu risus condimentum viverra. Donec ultricies eros consequat, volutpat
               lacus vitae, dapibus urna. Proin placerat rhoncus nunc, vitae tempus magna convallis eu.
                Integer fermentum lectus nunc, eget venenatis ante vestibulum nec.</p>
            <br />
            <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-semibold mb-4">Customer Dashboard</h1>
        
        <div className="mb-4">
          <p className="text-gray-600">Name:</p>
          <p className="text-black font-semibold"></p>
        </div>

        <div className="mb-4">
          <p className="text-gray-600">Email:</p>
          <p className="text-black font-semibold"></p>
        </div>

        <div className="mb-4">
          <p className="text-gray-600">Total Orders:</p>
          <p className="text-black font-semibold"></p>
        </div>

        <div className="mb-4">
          <p className="text-gray-600">Last Purchase:</p>
          <p className="text-black font-semibold"></p>
        </div>
      </div>
    </div>
      <button className="close-button" onClick={closeModal}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="black" stroke-width="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
   </svg>
     </button>
           
          </form>
          </div>
        </Modal>
      </div>
    );
};

export default MyModal;
