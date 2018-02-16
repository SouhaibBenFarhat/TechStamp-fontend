import { ToastOptions } from 'ng2-toastr';

export class ToastCustomOptions extends ToastOptions {
    animate = 'flyRight';
    newestOnTop = false;
    showCloseButton = true;
    positionClass = 'toast-top-center';
}
