import { FloatingWidget } from "./floating-widget";
import { ProductWidget } from "../product-widget/product-widget";

const FLOATING_WIDGET = (jquery: any) => {
  if (!(window as any).floatingWidgetInitialized) {
    // First time execution logic
    const floatingWidget = new FloatingWidget();
    floatingWidget.registerCloseEvent();

    const productWidget = new ProductWidget(
      floatingWidget.floatingShadowRoot,
      jquery,
    );

    // Store the floating widget in the window for future use
    (window as any).floatingWidgetInstance = floatingWidget;
    (window as any).floatingProductWidgetInstance = productWidget;

    // Set the flag to true after first initialization
    (window as any).floatingWidgetInitialized = true;
  }

  const floatingWidget = (window as any).floatingWidgetInstance;
  floatingWidget.open();

  const floatingProductWidgetInstance = (window as any)
    .floatingProductWidgetInstance;
  floatingProductWidgetInstance.init();
};

document.addEventListener("DOMContentLoaded", function () {
  (window as any).FLOATING_WIDGET_DEFAULT = function () {
    // @ts-ignore
    FLOATING_WIDGET(window.jQuery);
  };
});
// Attach the function to the global scope
