import type { ComponentProps, ComponentType } from "react";

export type BaseModalType = {
  onClose: () => void;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
type ModalExtendsType = Record<string, ComponentType<any>>;

export type ModalTypeDefault<MODALS extends ModalExtendsType> = {
  showModal: <T extends keyof MODALS>(
    type: T,
    props?: Omit<ComponentProps<MODALS[T]>, keyof BaseModalType>,
  ) => void;
  hideModal: (type: keyof MODALS) => void;
};
