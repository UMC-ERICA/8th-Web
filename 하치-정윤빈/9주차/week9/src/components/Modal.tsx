import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../slices/modalSlice';
import { RootState } from '../store/store';

interface ModalProps {
  onConfirm: () => void;
}

const Modal = ({ onConfirm }: ModalProps) => {
  const dispatch = useDispatch();
  const { type, isOpen } = useSelector((state: RootState) => state.modal);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur bg-opacity-10 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">{type}</h2>
        <div className="flex justify-end space-x-4">
          <button
            onClick={() => dispatch(closeModal())}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            취소
          </button>
          <button
            onClick={() => {
              dispatch(closeModal());
              onConfirm();
            }}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal; 