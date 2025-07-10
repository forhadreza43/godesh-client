// components/ui/Modal.jsx
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import Button from "../Button/Button";

const Modal = ({
  isOpen,
  onClose,
  title = "Confirm Action",
  description = "",
  confirmText = "Confirm",
  cancelText = "Cancel",
  showActions = true,
  onConfirm,
  children,
}) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="bg-opacity-30 fixed inset-0 bg-primary/40" />
        </Transition.Child>

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-100"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-xl bg-white p-6 shadow-xl transition-all">
              <Dialog.Title className="mb-2 text-lg font-semibold">
                {title}
              </Dialog.Title>
              {description && (
                <Dialog.Description className="mb-4 text-sm text-gray-600">
                  {description}
                </Dialog.Description>
              )}
              <div>{children}</div>

              {showActions && (
                <div className="mt-6 flex justify-between">
                  <Button
                                      className=""
                                      variant="outline"
                    onClick={onClose}
                  >
                    {cancelText}
                  </Button>
                  <Button
                    className=""
                    onClick={onConfirm}
                  >
                    {confirmText}
                  </Button>
                </div>
              )}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
