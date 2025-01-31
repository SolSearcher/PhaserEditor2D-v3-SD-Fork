/// <reference path="../undo/SceneEditorOperation.ts" />

namespace phasereditor2d.scene.ui.editor.properties {

    export class ChangePrefabPropertiesOperation extends undo.SceneEditorOperation {
        private _before: any;
        private _after: any;

        constructor(editor: SceneEditor, before: any, after: any) {
            super(editor);

            this._before = before;
            this._after = after;
        }

        static snapshot(editor: SceneEditor) {

            const data = []

            editor.getScene().getPrefabUserProperties().writeJSON(data);

            return data;
        }

        private load(data: any) {

            const editor = this.getEditor();
            
            editor.getScene().getPrefabUserProperties().readJSON(data);

            editor.setDirty(true);

            editor.getSelectionManager().refreshSelection();

            editor.refreshOutline();

            editor.dispatchSelectionChanged();
        }

        undo(): void {

            this.load(this._before);
        }

        redo(): void {
            
            this.load(this._after);
        }
    }
}