/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  type ComponentProps,
  type ComponentType,
  createContext,
  Fragment,
  type ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import type { BaseModalType, ModalTypeDefault } from '../components/modals/types';
import { MODAL_COMPONENTS, MODAL_NAME } from '../constants/modal.constants';


type ModalExtendsType = Record<string, ComponentType<any>>;

type ModalState<MODALS extends ModalExtendsType> = {
  [key in keyof MODALS]: {
    show: boolean;
    props?: Omit<ComponentProps<MODALS[key]>, keyof BaseModalType>;
  };
};

const initialState = <MODALS extends ModalExtendsType>(
  modals: MODALS,
): ModalState<MODALS> => Object.keys(modals).reduce(
  (types, type) => ({
    ...types,
    [type]: { show: false, props: undefined },
  }),
  {},
) as ModalState<MODALS>;

export type ModalType<MODALS extends ModalExtendsType> = {
  state: ModalState<MODALS>;
} & ModalTypeDefault<MODALS>;

const modalStateInitial = initialState(MODAL_COMPONENTS);

export const ModalContext = createContext<ModalType<typeof MODAL_COMPONENTS>>({
  showModal: () => undefined,
  hideModal: () => undefined,
  state: modalStateInitial,
});

const { Provider, Consumer: ModalConsumer } = ModalContext;

type Props = {
  children: ReactNode;
};

const ModalProvider = ({ children }: Props) => {
  const [modalsState, setModalsState] = useState<ModalState<typeof MODAL_COMPONENTS>>(modalStateInitial);

  const showModal = useCallback(
    <T extends keyof typeof MODAL_COMPONENTS>(
      type: T,
      props?: Omit<ComponentProps<(typeof MODAL_COMPONENTS)[T]>, keyof BaseModalType>,
    ) => {
      setModalsState((currentState) => ({
        ...currentState,
        [type]: { show: true, props },
      }));
    },
    [],
  );

  const hideModal = useCallback((type: keyof typeof MODAL_COMPONENTS) => {
    setModalsState((currentState) => ({
      ...currentState,
      [type]: { show: false, props: currentState[type].props },
    }));
  }, []);

  const state: ModalType<typeof MODAL_COMPONENTS> = useMemo(
    () => ({
      showModal,
      hideModal,
      state: modalsState,
    }),
    [showModal, hideModal, modalsState],
  );

  const getPropsForModal = useCallback(
    <T extends keyof typeof MODAL_COMPONENTS>(modal: T) => {
      const baseProps: BaseModalType & {
        hideModal: typeof hideModal;
        showModal: typeof showModal;
      } = {
        onClose: () => hideModal(modal),
        hideModal,
        showModal,
      };

      return {
        ...modalsState[modal].props,
        ...baseProps,
      };
    },
    [hideModal, showModal, modalsState],
  );

  const prepareModal = useMemo(
    () => Object.keys(modalsState).map((modal) => {
      const Component = MODAL_COMPONENTS[modal as MODAL_NAME] ?? Fragment;
      const isOpen = modalsState[modal as MODAL_NAME].show;

      return (
        isOpen && (
        <div key={String(modal)}>
          <Component {...(getPropsForModal(modal as MODAL_NAME) as any)} />
        </div>
        )
      );
    }),
    [modalsState, getPropsForModal],
  );

  return (
    <Provider value={state}>
      {prepareModal}
      {children}
    </Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }

  return context;
};

export { ModalConsumer, ModalProvider };
