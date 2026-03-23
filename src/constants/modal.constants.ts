import ConfirmModal from "../components/modals/ConfirmModal";
import SuccessModal from "../components/modals/SuccessModal";

 export const MODAL_NAME = {
  CONFIRM_MODAL: 'CONFIRM_MODAL',
  SUCCESS_MODAL: 'SUCCESS_MODAL',
} as const;

export type MODAL_NAME = typeof MODAL_NAME[keyof typeof MODAL_NAME];


export const MODAL_COMPONENTS = {
  [MODAL_NAME.CONFIRM_MODAL]: ConfirmModal,
  [MODAL_NAME.SUCCESS_MODAL]: SuccessModal,
};