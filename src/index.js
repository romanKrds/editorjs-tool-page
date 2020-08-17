/**
 * Build styles
 */
require('./index.css').toString();

/**
 * Custom Page Block for the Editor.js.
 * Represents a link to the nested page
 *
 */

/**
 * @typedef {object} PageConfig
 * @property {string} placeholder - placeholder for the empty Page
 * @property {string} wikiPageEndpoint - an endpoint to display page details. It should be without uuid, as later each page tool will be append it's own page uuid
 * @property {boolean} preserveBlank - Whether or not to keep blank Pages when saving editor data
 */

/**
 * @typedef {Object} PageToolData
 * @description Tool's input and output data format
 * @property {number} uuid — Page's uuid.
 * @property {string} title — Page's content. Can include HTML tags: <b><i>
 * @property {boolean} [isCompleted] — flag to show if the tool should be displayed as a link to the created page
 */
class Page {
  /**
   * Icon and title for displaying at the Toolbox
   *
   * @return {{icon: string, title: string}}
   */
  static get toolbox() {
    return {
      icon: require('./toolbox-icon.svg').default,
      title: 'Nested page'
    };
  }

  /**
   * Default placeholder for Page Tool
   *
   * @return {string}
   * @constructor
   */
  static get DEFAULT_PLACEHOLDER() {
    return 'Set a page title and click the "Enter" button to create it';
  }

  /**
   * Render plugin`s main Element and fill it with saved data
   *
   * @param {object} params - constructor params
   * @param {PageToolData} params.data - previously saved data
   * @param {PageConfig} params.config - user config for Tool
   * @param {object} params.api - editor.js api
   */
  constructor({data, config, api}) {
    this.api = api;

    this._nodes = {
      wrapper: null,
      container: null,
      input: null,
      inputHolder: null,
      content: null,
      contentHolder: null,
    };

    this._CSS = {
      baseClass: this.api.styles.block,
      input: this.api.styles.input,

      /**
       * Tool's classes
       */
      container: 'page-tool',
      inputEl: 'page-tool__input',
      inputHolder: 'page-tool__input-holder',
      inputError: 'page-tool__input-holder--error',
      contentEl: 'page-tool__content',
      contentHolder: 'page-tool__content-holder',
      linkText: 'page-tool__anchor',
    };

    /**
     * Tool's data and configurations init
     */
    this._data = {};
    this._endpoint = config.wikiPageEndpoint || '';
    this._placeholder = config.placeholder ? config.placeholder : Page.DEFAULT_PLACEHOLDER;
    this._preserveBlank = config.preserveBlank !== undefined ? config.preserveBlank : false;

    this.data = data;
  }

  /**
   * Stores all Tool's data
   * @param {PageToolData} data
   */
  set data(data) {
    this._data = Object.assign({}, {
      uuid: data.uuid || this._data.uuid,
      title: data.title || this._data.title,
      isCompleted: data.isCompleted || this._data.isCompleted
    });
  }

  /**
   * Return Tool data
   * @return {PageToolData} data
   */
  get data() {
    return this._data;
  }

  /**
   * Prepare input holder
   * @return {HTMLElement} - page title input
   */
  makeInputHolder() {
    const inputHolder = this.make('div', this._CSS.inputHolder);

    this._nodes.input = this.make('div', [this._CSS.input, this._CSS.inputEl], {
      contentEditable: true
    });

    this._nodes.input.dataset.placeholder = this.api.i18n.t(this._placeholder);

    this._nodes.input.addEventListener('keydown', (event) => {
      if (event.code === 'Enter' && this._nodes.input.textContent) {
        this.data = {isCompleted: true};
      }
    });

    inputHolder.appendChild(this._nodes.input);

    return inputHolder;
  }

  /**
   * Prepare link preview holder
   * @return {HTMLElement}
   */
  prepareLinkPreview() {
    const contentHolder = this.make('div', this._CSS.contentHolder);
    const pageURL = this._endpoint && this.data.uuid ? `${this._endpoint}/${this.data.uuid}` : '#';

    this._nodes.content = this.make('a', [this._CSS.input, this._CSS.contentEl], {
      target: '_blank',
      href: pageURL,
    });
    this._nodes.content.textContent = this.data.title || 'Untitled page';

    contentHolder.appendChild(this._nodes.content);

    return contentHolder;
  }

  /**
   * Return Tool's view
   * @returns {HTMLDivElement}
   * @public
   */
  render() {
    this._nodes.wrapper = this.make('div', this._CSS.baseClass);
    this._nodes.container = this.make('div', this._CSS.container);

    /**
     * If Tool already has data, render readonly input with a link
     */
    if (this.data.uuid) {
      this._nodes.contentHolder = this.prepareLinkPreview();
      this._nodes.container.appendChild(this._nodes.contentHolder);
    } else {
      this._nodes.inputHolder = this.makeInputHolder();
      this._nodes.container.appendChild(this._nodes.inputHolder);
    }

    this._nodes.wrapper.appendChild(this._nodes.container);

    return  this._nodes.wrapper;
  }

  /**
   * Validate Page block data:
   * - check for emptiness
   *
   * @param {PageToolData} savedData — data received after saving
   * @returns {boolean} false if saved data is not correct, otherwise true
   * @public
   */
  validate(savedData) {
    if (savedData.title.trim() === '' && !this._preserveBlank) {
      return false;
    }

    return true;
  }

  /**
   * Extract Tool's data from the view
   * @returns {PageToolData} - saved data
   * @public
   */
  save() {
    const payload = {
      uuid: this.data.uuid,
      title: this.data.title || this._nodes.input?.textContent || '',
      isCompleted: !this.data.uuid && this.data.isCompleted,
    };

    Object.keys(payload).forEach(key => {
      if ([undefined, false].includes(payload[key])) {
        delete payload[key];
      }
    })

    return payload;
  }

  /**
   * On paste callback fired from Editor.
   *
   * @param {PasteEvent} event - event with pasted data
   */
  onPaste(event) {
    this.data = {title: event.detail.data.innerHTML};
  }

  /**
   * Sanitizer rules
   */
  static get sanitize() {
    return {
      text: {
        b: true,
      }
    };
  }

  /**
   * Used by Editor paste handling API.
   * Provides configuration to handle P tags.
   *
   * @returns {{tags: string[]}}
   */
  static get pasteConfig() {
    return {
      tags: [ 'P' ]
    };
  }

  /**
   * Helper method for elements creation
   * @param tagName
   * @param classNames
   * @param attributes
   * @return {HTMLElement}
   */
  make(tagName, classNames = null, attributes = {}) {
    let el = document.createElement(tagName);

    if (Array.isArray(classNames)) {
      el.classList.add(...classNames);
    } else if (classNames) {
      el.classList.add(classNames);
    }

    for (let attrName in attributes) {
      el[attrName] = attributes[attrName];
    }

    return el;
  }
}

module.exports = Page;
