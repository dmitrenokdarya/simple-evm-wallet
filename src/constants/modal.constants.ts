import ConfirmModal from '../components/modals/ConfirmModal';
import { EditAvatarModal } from '../components/modals/CustomizeWalletModals/EditAvatarModal';
import { EditLabelModal } from '../components/modals/CustomizeWalletModals/EditLabelModal';
import SuccessModal from '../components/modals/SuccessModal';
import UnlockVaultModal from '../components/modals/UnlockVaultModal';

export const MODAL_NAME = {
  CONFIRM_MODAL: 'CONFIRM_MODAL',
  SUCCESS_MODAL: 'SUCCESS_MODAL',
  EDIT_AVATAR_MODAL: 'EDIT_AVATAR_MODAL',
  EDIT_LABEL_MODAL: 'EDIT_LABEL_MODAL',
  UNLOCK_VAULT_MODAL: 'UNLOCK_VAULT_MODAL',
} as const;

export type MODAL_NAME = (typeof MODAL_NAME)[keyof typeof MODAL_NAME];

export const MODAL_COMPONENTS = {
  [MODAL_NAME.CONFIRM_MODAL]: ConfirmModal,
  [MODAL_NAME.SUCCESS_MODAL]: SuccessModal,
  [MODAL_NAME.EDIT_AVATAR_MODAL]: EditAvatarModal,
  [MODAL_NAME.EDIT_LABEL_MODAL]: EditLabelModal,
  [MODAL_NAME.UNLOCK_VAULT_MODAL]: UnlockVaultModal,
};
