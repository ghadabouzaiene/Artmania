import React from 'react';
import { motion } from 'framer-motion';
import Modal from 'react-bootstrap/Modal'

const Modal_container = ({ setSelectedImg, selectedImg }) => {

  const handleClick = (e) => {
    if (e.target.classList.contains('backdrop')) {
      setSelectedImg(null);
    }
  }
 
  return (
    <motion.div className="backdrop" onClick={handleClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Modal>
      <img src={selectedImg} alt="enlarged pic" 
        initial={{ y: "-100vh" }}
        animate={{ y: 0 }}
      />
      </Modal>
     
     
     
    </motion.div>
  )
}

export default Modal_container;