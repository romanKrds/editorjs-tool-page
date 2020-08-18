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
 * @property {boolean} preserveBlank - Whether or not to keep blank Pages when saving editor data
 */

/**
 * @typedef {Object} PageToolData
 * @description Tool's input and output data format
 * @property {string} title — Page's content. Can include HTML tags: <b><i>
 * @property {boolean} [isPageTitleCompleted] — flag to show if the tool should be displayed as a link to the created page
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
      title: data.title || this._data.title,
      isPageTitleCompleted: data.isPageTitleCompleted || Boolean(data.title),
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

    this._nodes.input.addEventListener('keydown', this.handleEnterKeeDown.bind(this));

    inputHolder.appendChild(this._nodes.input);

    return inputHolder;
  }

  /**
   * Prepare link preview holder
   * @return {HTMLElement}
   */
  prepareLinkPreview() {
    const contentHolder = this.make('div', this._CSS.contentHolder);

    this._nodes.content = this.make('a', [this._CSS.input, this._CSS.contentEl], {
      href: 'javascript:void(0)',
    });
    this._nodes.content.textContent = this.data.title || 'Untitled page';

    contentHolder.appendChild(this._nodes.content);

    this._nodes.content.addEventListener('click', this.handleLinkClick.bind(this));
    return contentHolder;
  }

  /**
   * "Enter" button keydown event handler. Swap block to display clickable title of the page
   * @public
   */
  handleEnterKeeDown(event) {
    if (event.code === 'Enter' && this._nodes.input.textContent) {
      this.data = {isPageTitleCompleted: true};
    }
  }

  /**
   * link click event handler. Emit event to handle the navigation outside of editorjs
   * @public
   */
  handleLinkClick() {
    const blockAPI = this.api.blocks.getBlockByIndex(this.api.blocks.getCurrentBlockIndex());
    const pageToolClickEvent = new CustomEvent('pageToolClick', {bubbles: true, detail: {serviceKey: blockAPI.holder.id}});

    blockAPI.holder.dispatchEvent(pageToolClickEvent);
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
    if (this.data.isPageTitleCompleted) {
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
    const title = this.data.title || this._nodes.input?.textContent || '';
    const payload = {
      title: title.trim(),
      isPageTitleCompleted: this.data.isPageTitleCompleted,
    };

    Object.keys(payload).forEach(key => {
      if ([undefined, false].includes(payload[key])) {
        delete payload[key];
      }
    })

    return payload;
  }

  /**
   * Tool is removed from the view
   * @public
   */
  removed() {
    if (this._nodes.input) {
      this._nodes.input.removeEventListener('keydown', this.handleEnterKeeDown.bind(this));
    }
    if (this._nodes.content) {
      this._nodes.content.removeEventListener('click', this.handleLinkClick.bind(this));
    }
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
