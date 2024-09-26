import {ProductWidget} from "./product-widget";
jQuery(document).ready(($) => {
    (function PRODUCT_WIDGET_DEFAULT() {
        const productWidget = new ProductWidget(document, $);
        productWidget.init();
    })();
});
