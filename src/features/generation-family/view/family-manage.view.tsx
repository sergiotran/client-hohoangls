import { PrimaryButton } from '@/common/components/buttons';
import React from 'react';
import FamilyFactoryModal from './inc/family-factory-modal';

const FamilyManageView = () => {
  const [isModalShow, setIsModalShow] = React.useState<boolean>(false);

  const handleShow = () => {
    setIsModalShow(true);
  };
  const handleClose = () => {
    setIsModalShow(false);
  };

  return (
    <div>
      <div className='divive-y divive-y-1 relative flex flex-col gap-2'>
        <div className='flex flex-row gap-2'>
          <PrimaryButton onClick={handleShow}>Thêm mới</PrimaryButton>
        </div>
        <div className='flex flex-col border rounded mt-3 p-3'>hehe</div>
      </div>
      {isModalShow && <FamilyFactoryModal open={isModalShow} handleClose={handleClose} />}
    </div>
  );
};

export default FamilyManageView;
