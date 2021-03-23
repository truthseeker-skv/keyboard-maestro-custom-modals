import { useLayoutEffect, useCallback, useState } from 'react';

export interface IUseKmHooksParams {
  title: string;
  winHeight?: number;
  winWidth?: number;
}

export function useKeyboardMaestroModal({
  title,
  winHeight = 300,
  winWidth = 400,
}: IUseKmHooksParams) {
  const [isModalReady, setIsModalReady] = useState(false);

  useLayoutEffect(() => {
    window.document.addEventListener('keydown', (e) => {
      const isEscPressed = e.key === 'Escape';

      if (isEscPressed) {
        e.preventDefault();
      }

      if (e.metaKey && isEscPressed) {
        handleCloseModal();
      }
    });
  }, []);

  useLayoutEffect(() => {
    window.KMDidShowWindow = () => {
      window.document.title = title;
      window.KeyboardMaestro.ResizeWindow(`${winWidth},${winHeight}`);
      setIsModalReady(true);
    };
  }, []);

  const handleCloseModal = useCallback(() => {
    window.KeyboardMaestro.Cancel('Cancel');
  }, []);

  const handleSubmitModal = useCallback(() => {
    window.KeyboardMaestro.Submit('Ok');
  }, []);

  const handleSetSubmitData = useCallback((data: Record<string, unknown>, name = 'local__SubmitData') => {
    window.KeyboardMaestro.SetVariable(name, JSON.stringify(data));
  }, []);

  return {
    isModalReady,
    close: handleCloseModal,
    setSubmitData: handleSetSubmitData,
    submit: handleSubmitModal,
  };
}

export type IKeyboardMaestroModal = ReturnType<typeof useKeyboardMaestroModal>;
