import Modal from '@/common/components/modal';
import React from 'react';
import { useForm } from 'react-hook-form';
import { FamilyModal } from '../../models/family';

type Props = {
  open: boolean;
  handleClose: () => void;
};

const FamilyFactoryModal: React.FC<Props> = ({ open, handleClose }) => {
  const ref = React.createRef<HTMLFormElement>();
  const { register, handleSubmit, setValue } = useForm<FamilyModal>();

  return (
    <Modal
      title='Thêm mới gia đình'
      open={open}
      handleClose={handleClose}
      footer={
        <>
          <button onClick={handleClose}>Hủy</button>
        </>
      }
    >
      Hello
    </Modal>
  );
};

export default FamilyFactoryModal;
