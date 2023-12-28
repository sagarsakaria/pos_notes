odoo.define('point_of_sale.AlertPopUp', function (require) {
    'use strict';

    const AbstractAwaitablePopup = require('point_of_sale.AbstractAwaitablePopup');
    const Registries = require('point_of_sale.Registries');

    class AlertPopUp extends AbstractAwaitablePopup {
        getPayload() {
            return null;
        }
    }
    AlertPopUp.template = 'AlertPopUp';
    AlertPopUp.defaultProps = {
        title: 'Confirm ?',
        body: '',
    };

    Registries.Component.add(AlertPopUp);

    return AlertPopUp;


});