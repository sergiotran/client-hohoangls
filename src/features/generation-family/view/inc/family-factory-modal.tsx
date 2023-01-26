import Modal from '@/common/components/modal';
import React from 'react';
import { FieldValues, UseFormSetValue, useForm } from 'react-hook-form';
import { FamilyModal } from '../../models/family';
import { PrimaryButton, SecondaryButton } from '@/common/components/buttons';
import MultipleSelect from '@/common/components/multiple-select';

type Props = {
  open: boolean;
  handleClose: () => void;
};

const MOCK_DATA = [
  {id: 1, name: 'Trần Văn Đức'},
  {id: 2, name: 'Trần Văn Tưởng'},
  {id: 3, name: 'Trần Văn Long'},
  {id: 4, name: 'Trần Văn Tuân'},
];

const FamilyFactoryModal: React.FC<Props> = ({ open, handleClose }) => {
  const ref = React.createRef<HTMLInputElement>();
  const { register, handleSubmit, setValue } = useForm<FamilyModal>();

  const handleSave = () => {
    if (ref.current) {
      ref.current.click();
    }
  };

  const handleValidateData = (data: FamilyModal): string[] => {
    return [];
  };

  const handleSubmitForm = (data: FamilyModal) => {
    const errorStrs = handleValidateData(data);

    if(errorStrs.length > 0) {
      return;
    }

    console.log(data);
  };

  return (
    <Modal
      title='Thêm mới gia đình'
      open={open}
      handleClose={handleClose}
      footer={
        <div className='flex flex-row gap-3'>
          <PrimaryButton onClick={handleSave}>Lưu</PrimaryButton>
          <SecondaryButton onClick={handleClose}>Hủy</SecondaryButton>
        </div>
      }
    >
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <MultipleSelect
          data={MOCK_DATA}
          inputProps={register('husband')}
          label='Chồng'
          searchField='name'
          valueField='id'
          setValue={setValue as unknown as UseFormSetValue<FieldValues>}
          multiple={false}
        />
        <MultipleSelect
          data={MOCK_DATA}
          inputProps={register('wife')}
          label='Vợ'
          searchField='name'
          valueField='id'
          setValue={setValue as unknown as UseFormSetValue<FieldValues>}
          multiple={false}
        />
        <MultipleSelect
          data={MOCK_DATA}
          inputProps={register('children')}
          label='Con cái'
          searchField='name'
          valueField='id'
          setValue={setValue as unknown as UseFormSetValue<FieldValues>}
          multiple={true}
        />
        <input type='submit' className='hidden' ref={ref} />
      </form>
    </Modal>
  );
};

export default FamilyFactoryModal;
