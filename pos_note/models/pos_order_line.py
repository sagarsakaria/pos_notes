from odoo import api, fields, models

class PosOrderLine(models.Model):
    _inherit = 'pos.order.line'
    order_line_note = fields.Text('Extra Comments')

    @api.model
    def _order_line_fields(self, line, session_id=None):
        # Update the order_line_note field when push the order in backend
        fields_return = super(PosOrderLine, self)._order_line_fields(
            line, session_id=None)
        fields_return[2].update(
            {'order_line_note': line[2].get('order_line_note', '')})
        return fields_return