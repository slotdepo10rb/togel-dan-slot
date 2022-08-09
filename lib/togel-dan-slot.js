'use babel';

import TogelDanSlotView from './togel-dan-slot-view';
import { CompositeDisposable } from 'atom';

export default {

  togelDanSlotView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.togelDanSlotView = new TogelDanSlotView(state.togelDanSlotViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.togelDanSlotView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'togel-dan-slot:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.togelDanSlotView.destroy();
  },

  serialize() {
    return {
      togelDanSlotViewState: this.togelDanSlotView.serialize()
    };
  },

  toggle() {
    console.log('TogelDanSlot was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
