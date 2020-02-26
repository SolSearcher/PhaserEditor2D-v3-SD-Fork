/// <reference path="./SceneObjectSection.ts" />

namespace phasereditor2d.scene.ui.sceneobjects {

    import controls = colibri.ui.controls;

    export class OriginSection extends SceneObjectSection<IOriginLikeObject> {

        constructor(page: controls.properties.PropertyPage) {
            super(page, "phasereditor2d.scene.ui.sceneobjects.OriginSection", "Origin", false, true);
        }

        protected createForm(parent: HTMLDivElement) {

            const comp = this.createGridElementWithPropertiesXY(parent);

            this.createPropertyXYRow(comp, OriginComponent.origin);
        }

        canEdit(obj: any, n: number): boolean {
            return EditorSupport.getObjectComponent(obj, OriginComponent) !== null;
        }

        canEditNumber(n: number): boolean {
            return n > 0;
        }
    }

}