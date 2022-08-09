'use babel';

import TogelDanSlot from '../lib/togel-dan-slot';

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

describe('TogelDanSlot', () => {
  let workspaceElement, activationPromise;

  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace);
    activationPromise = atom.packages.activatePackage('togel-dan-slot');
  });

  describe('when the togel-dan-slot:toggle event is triggered', () => {
    it('hides and shows the modal panel', () => {
      // Before the activation event the view is not on the DOM, and no panel
      // has been created
      expect(workspaceElement.querySelector('.togel-dan-slot')).not.toExist();

      // This is an activation event, triggering it will cause the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'togel-dan-slot:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        expect(workspaceElement.querySelector('.togel-dan-slot')).toExist();

        let togelDanSlotElement = workspaceElement.querySelector('.togel-dan-slot');
        expect(togelDanSlotElement).toExist();

        let togelDanSlotPanel = atom.workspace.panelForItem(togelDanSlotElement);
        expect(togelDanSlotPanel.isVisible()).toBe(true);
        atom.commands.dispatch(workspaceElement, 'togel-dan-slot:toggle');
        expect(togelDanSlotPanel.isVisible()).toBe(false);
      });
    });

    it('hides and shows the view', () => {
      // This test shows you an integration test testing at the view level.

      // Attaching the workspaceElement to the DOM is required to allow the
      // `toBeVisible()` matchers to work. Anything testing visibility or focus
      // requires that the workspaceElement is on the DOM. Tests that attach the
      // workspaceElement to the DOM are generally slower than those off DOM.
      jasmine.attachToDOM(workspaceElement);

      expect(workspaceElement.querySelector('.togel-dan-slot')).not.toExist();

      // This is an activation event, triggering it causes the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'togel-dan-slot:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        // Now we can test for view visibility
        let togelDanSlotElement = workspaceElement.querySelector('.togel-dan-slot');
        expect(togelDanSlotElement).toBeVisible();
        atom.commands.dispatch(workspaceElement, 'togel-dan-slot:toggle');
        expect(togelDanSlotElement).not.toBeVisible();
      });
    });
  });
});
