// floatingWidget.ts
export class FloatingWidget {
    floatingDialog: HTMLDialogElement;
    floatingShadowRoot: ShadowRoot;

    constructor() {
        this.floatingDialog = document.querySelector('#r_rfw_floating_widget_dialog_wrapper') as HTMLDialogElement;
        this.floatingShadowRoot = this.initShadowRoot();
    }

    initShadowRoot(): ShadowRoot {
        const host = document.getElementById('r_rfw_floating_widget_container_wrapper') as HTMLElement;
        const template = document.getElementById('r_rfw_floating_widget_container') as HTMLTemplateElement;
        const shadowRoot = host.attachShadow({mode: 'open'});

        shadowRoot.appendChild(template.content.cloneNode(true));
        template.remove();

        return shadowRoot;
    }

    open() {
        this.floatingDialog?.showModal();
        console.log('opending floating dialog');
    }

    close() {
        this.floatingDialog?.close();
    }

    registerCloseEvent() {
        const closeIcon = this.floatingShadowRoot.querySelector('.r_fpw-close_icon') as HTMLElement;
        closeIcon.addEventListener('click', () => {
            this.close();
        });
    }
}
