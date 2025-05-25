import { useDispatch, useSelector } from "react-redux";
import { openModal, closeModal } from "../slices/modalSlice";
import type { AppDispatch, RootState } from "../store/store";

export const useModalInfo = () => {
  const isOpen = useSelector((state: RootState) => state.modal.isOpen);
  return { isOpen };
};

export const useModalActions = () => {
  const dispatch = useDispatch<AppDispatch>();

  return {
    open: () => dispatch(openModal()),
    close: () => dispatch(closeModal()),
  };
};