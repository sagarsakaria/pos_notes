odoo.define('pos_note.pos_note', function (require) {
    "use strict";
    var { Order, Orderline } = require('point_of_sale.models');
    var core = require('web.core');
    var _t = core._t;
    const ProductScreen = require('point_of_sale.ProductScreen');
    const PosComponent = require('point_of_sale.PosComponent');
    const { useListener } = require("@web/core/utils/hooks");
    const Registries = require('point_of_sale.Registries');



    const PosOrder = (Order) => class PosOrder extends Order {
        get_order_note() {
            return $("#order_note").val();
        }
        export_as_JSON() {
            var self = this;
            var loaded = super.export_as_JSON(self);
            loaded.order_note = self.get_order_note();
            self.order_note = self.get_order_note();
            return loaded;
        }
        export_for_printing() {
            var self = this
            var receipt = super.export_for_printing(self)
            receipt.order_note = self.order_note;
            return receipt
        }
    }
    Registries.Model.extend(Order, PosOrder);

    const PosOrderline = (Orderline) => class PosOrderline extends Orderline {
        initialize(attr, options) {
            this.order_line_note = '';
            super.initialize(attr, options);
        }
        export_for_printing() {
            var dict = super.export_for_printing(this);
            dict.order_line_note = this.order_line_note;
            return dict;
        }
        get_order_line_comment() {
            var self = this;
            return self.order_line_note;
        }
        export_as_JSON() {
            var self = this;
            var loaded = super.export_as_JSON(self);
            loaded.order_line_note = self.get_order_line_comment();
            return loaded;
        }
    }
    Registries.Model.extend(Orderline, PosOrderline);


    class AddOrderlineNoteButton extends PosComponent {
        setup() {
            super.setup();
            useListener('click', this.onClick);
        }
        get currentOrder() {
            return this.env.pos.get_order();
        }
        async onClick() {
            var text_limit = this.env.pos.config.note_keyword_limit;
            var is_text_limit = this.env.pos.config.set_note_keyword_limit;
            if (typeof (this.currentOrder.get_selected_orderline()) == 'object') {
                const { confirmed } = await this.showPopup('TextAreaPopup', {
                    title: this.env._t('Add Note'),
                    value: this.currentOrder.get_selected_orderline().order_line_note,
                });
                $("textarea").css({ "width": "92%", "height": "56%", "resize": "none" });
                if (text_limit && is_text_limit)
                    $("textarea").attr('maxlength', text_limit.toString());
                if (confirmed) {
                    // console.log("this getPayload",this.getPayload())
                    var note = $('textarea').val();
                    $('ul.orderlines li.selected ul div#extra_comments').text(note);
                    this.currentOrder.get_selected_orderline().order_line_note = note;
                }
            }
            else {
                this.showPopup('AlertPopUp', {
                    'title': 'No Selected Order Line',
                    'body': 'Please add/select an orderline'
                })

            }

        }
    }
    AddOrderlineNoteButton.template = 'AddOrderlineNoteButton';

    ProductScreen.addControlButton({
        component: AddOrderlineNoteButton,
        condition: function () {
            console.log("this", this.env.pos)
            return this.env.pos.config.on_product_line;
        },
    });

    Registries.Component.add(AddOrderlineNoteButton);

    return AddOrderlineNoteButton;

});    