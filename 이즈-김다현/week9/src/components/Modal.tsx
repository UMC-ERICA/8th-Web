import { useModalActions, useModalInfo } from "../hooks/useModalStore";

interface ModalProps {
  onConfirm: () => void;
}

const Modal = ({ onConfirm }: ModalProps) => {
  const { isOpen } = useModalInfo();
  const { close } = useModalActions();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50">
        <div className="bg-white p-6 rounded-lg shadow-md w-80">
            <p className="text-lg font-semibold mb-4">정말 삭제하시겠습니까?</p>
            <div className="flex justify-end space-x-4">
                <button onClick={close} className="px-4 py-2 border rounded-md">취소</button>
                <button onClick={() => { onConfirm(); close(); }} className="px-4 py-2 bg-red-500 text-white rounded-md">삭제</button>
            </div>
        </div>
    </div>
  );
};

export default Modal;