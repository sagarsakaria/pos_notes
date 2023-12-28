odoo.define('point_of_sale.TextAreaPopup', function (require) {
    'use strict';

    const AbstractAwaitablePopup = require('point_of_sale.AbstractAwaitablePopup');
    const Registries = require('point_of_sale.Registries');

    class TextAreaPopup extends AbstractAwaitablePopup {
        getPayload() {
            return this.value;
        }
        onMounted() {
            $('textarea').focus();
            $("textarea").css({ "width": "92%", "height": "56%", "resize": "none" });
            var text_limit = this.env.pos.config.note_keyword_limit;
            var is_text_limit = this.env.pos.config.set_note_keyword_limit;
            if (text_limit && is_text_limit) {
                $("textarea").attr('maxlength', text_limit.toString());
            }
        }
    }
    TextAreaPopup.template = 'TextAreaPopup';
    TextAreaPopup.defaultProps = {
        title: 'Confirm ?',
        value: ''
    };

    Registries.Component.add(TextAreaPopup);


    return TextAreaPopup;
});