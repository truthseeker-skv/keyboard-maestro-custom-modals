export {}

declare global {
  interface Window {
    KeyboardMaestro: KeyboardMaestro;

    //
    // Keyboard Maestro calls the following JavaScript functions
    //

    /**
     * To initialize fields or other features
     * @constructor
     */
    KMInit(): void;

    /**
     * To return the desired size or frame of the window as a string
     * @constructor
     */
    KMWindow(): any;

    /**
     * When the window will be shown
     * @constructor
     */
    KMWillShowWindow(): void;

    /**
     * When the window was just shown (v7.1+)
     * @constructor
     */
    KMDidShowWindow(): void;

    /**
     * To return the schemes you wish to handle within the web page (v8+)
     * @constructor
     */
    KMHandleSchemes(): any;

    /**
     * Called when the window is about to be closed (v8.0.3+)
     * @constructor
     */
    KMWillCloseWindow(): void;
  }
}

declare class KeyboardMaestro {

  /**
   * Submit the form and write the Keyboard Maestro Variables
   */
  Submit(buttonName: string): void;

  /**
   * Close the window, do not write the Keyboard Maestro Variables
   */
  Cancel(buttonName: string): void;

  /**
   * resize the window to the specified size or frame as a string with commas (“width,height” or “left,top,width,height”)
   *
   * @example
   * window.KeyboardMaestro.ResizeWindow(width + ',' + height);
   * window.KeyboardMaestro.ResizeWindow('1,2,3,4');
   */
  ResizeWindow(size: string): void;

  /**
   * Returns the value of a variable
   *
   * @param varName
   * @constructor
   */
  GetVariable(varName: string): any;

  /**
   * Sets the value of a variable
   *
   * @param varName
   * @param value
   * @constructor
   */
  SetVariable(varName: string, value: unknown): void;

  /**
   * Returns the value of a dictionary entry
   *
   * @param dictName
   * @param dictKey
   * @constructor
   */
  GetDictionary(dictName: string, dictKey: string): any;

  /**
   * Sets the value of a dictionary entry
   *
   * @example
   * window.KeyboardMaestro.SetDictionary('Dictionary', 'Key', 'value')
   *
   * @param dictName
   * @param dictKey
   * @param value
   * @constructor
   */
  SetDictionary(dictName: string, dictKey: string, value: unknown): void;

  /**
   * Returns the text token expansion
   *
   * @example
   * window.KeyboardMaestro.ProcessTokens('%ShortDate%')
   *
   * @param params
   * @constructor
   */
  ProcessTokens(params: unknown): any;

  /**
   * Returns the result of the calculation
   *
   * @example
   * window.KeyboardMaestro.Calculate('10 + 32')
   *
   * @param params
   * @constructor
   */
  Calculate(params: string): any;

  /**
   * Triggers the specified macro (7.1+)
   *
   * @param macro
   * @param value
   * @constructor
   */
  Trigger(macro: string, value: unknown): any;
}

