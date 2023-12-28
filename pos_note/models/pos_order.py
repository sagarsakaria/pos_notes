from odoo import api, models

class PosOrder(models.Model):
    _inherit = 'pos.order'

    @api.model
    def _order_fields(self, ui_order):
        #Update the note when push order backend
        fields_return = super(PosOrder, self)._order_fields(ui_order)
        fields_return.update({'note': ui_order.get('order_note', '')})
        return fields_return
