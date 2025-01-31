namespace phasereditor2d.pack.ui.dialogs {

    import controls = colibri.ui.controls;

    export class AssetSelectionDialog extends controls.dialogs.ViewerDialog {

        private _selectionCallback: (selection: any[]) => void;
        private _cancelCallback: () => void;
        private _viewerLayout: "tree" | "grid";

        constructor(layout: "tree" | "grid" = "grid") {
            super(new controls.viewers.TreeViewer("phasereditor2d.pack.ui.dialogs.AssetSelectionDialog"), true);

            this._viewerLayout = layout;

            const size = this.getSize();

            this.setSize(size.width, size.height * 1.5);
        }

        setSelectionCallback(callback: (selection: any[]) => void) {

            this._selectionCallback = callback;
        }

        setCancelCallback(callback: () => void) {

            this._cancelCallback = callback;
        }

        async getResultPromise(): Promise<any[]> {

            const promise = new Promise<any[]>((resolve, reject) => {

                this.setSelectionCallback((sel: any[]) => {

                    resolve(sel);
                });

                this.setCancelCallback(() => {

                    reject();
                })
            });

            return promise;
        }

        async getSingleResultPromise(): Promise<any> {

            const sel = await this.getResultPromise();

            return sel[0];
        }

        create(hideParentDialog = true) {

            const viewer = this.getViewer();

            viewer.setLabelProvider(new pack.ui.viewers.AssetPackLabelProvider());

            if (this._viewerLayout === "tree") {

                viewer.setTreeRenderer(new controls.viewers.GridTreeViewerRenderer(viewer));

            } else {

                const renderer = new controls.viewers.GridTreeViewerRenderer(viewer, false, true);
                renderer.setPaintItemShadow(true);
                viewer.setTreeRenderer(renderer);
            }

            viewer.setCellRendererProvider(new pack.ui.viewers.AssetPackCellRendererProvider(this._viewerLayout));
            viewer.setContentProvider(new controls.viewers.ArrayTreeContentProvider());
            viewer.setCellSize(64, true);
            viewer.setInput([]);

            super.create(hideParentDialog);

            this.setTitle("Select Asset");

            this.enableButtonOnlyWhenOneElementIsSelected(

                this.addOpenButton("Select", sel => {

                    if (this._selectionCallback) {

                        this._selectionCallback(sel);
                    }
                }));

            this.addButton("Cancel", () => {

                this.close();

                if (this._cancelCallback) {

                    this._cancelCallback();
                }
            });
        }
    }
}